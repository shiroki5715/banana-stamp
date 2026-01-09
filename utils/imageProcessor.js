/**
 * LINE Sticker Image Processor
 * Requirements:
 * - Sticker: Max W370 x H320
 * - Margin: ~10px transparent
 * - Dimensions: Even numbers only
 * - Format: PNG
 */

// Constants
const STICKER_MAX_W = 370;
const STICKER_MAX_H = 320;
const MARGIN = 10;
const MAIN_W = 240;
const MAIN_H = 240;
const TAB_W = 96;
const TAB_H = 74;

// Generic resize helper
const resizeToFit = (img, targetW, targetH) => {
    let w = img.width;
    let h = img.height;
    const ratio = w / h;

    if (w > targetW || h > targetH) {
        if (w > targetW) {
            w = targetW;
            h = w / ratio;
        }
        if (h > targetH) {
            h = targetH;
            w = h * ratio;
        }
    }
    return { w, h };
};

// Helper for smooth transitions (smoothstep)
const smoothstep = (min, max, value) => {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
};

// Helper to calculate Euclidean distance between colors
const colorDistance = (r1, g1, b1, r2, g2, b2) => {
    return Math.sqrt(
        Math.pow(r1 - r2, 2) +
        Math.pow(g1 - g2, 2) +
        Math.pow(b1 - b2, 2)
    );
};

// Helper to remove background based on Chroma Key
const removeBackground = (ctx, width, height, mode) => {
    if (!mode || mode === 'none') return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip already transparent pixels
        if (a === 0) continue;

        let alpha = a;

        if (mode === 'white') {
            // White Mode: Distance based + Soft Edge
            // Target: (255, 255, 255)
            const dist = colorDistance(r, g, b, 255, 255, 255);

            // Soft threshold:
            // < 30: Transparent (Very close to white)
            // 30 - 90: Transition
            // > 90: Opaque
            // The "smoothstep" returns 0..1 (0=min, 1=max). 
            // Since we want Distance 0 -> Alpha 0, Distance Max -> Alpha 1:
            const opacityFactor = smoothstep(30, 90, dist);
            alpha = Math.min(alpha, opacityFactor * 255);

        } else if (mode === 'magenta') {
            // Magenta Mode: (255, 0, 255)
            // 1. Alpha Calculation
            // Using distance for basic shape
            const dist = colorDistance(r, g, b, 255, 0, 255);

            // Magenta is usually a digital pure color, so thresholds can be tighter
            // < 60: Transparent
            // 60 - 100: Transition
            const opacityFactor = smoothstep(60, 100, dist);
            alpha = Math.min(alpha, opacityFactor * 255);

            // 2. Despill / Fringing Correction
            // If pixel is visible, neutralized purple fringing
            // Magenta has high R and B, low G.
            // If R and B > G, we clamping them towards G to remove the purple cast on edges.
            if (alpha > 0) {
                // Simple despill: If R and B are significantly higher than G, suppress them.
                // Limit R and B to not exceed (G + Threshold).
                const limit = g + 20;
                if (r > limit && b > limit) {
                    // Only desaturate if it really looks magenta-ish
                    data[i] = limit;     // R
                    data[i + 2] = limit; // B
                }
            }

        } else if (mode === 'green') {
            // Green Screen Logic: G is dominant
            // "Green-ness" metric: G - max(R, B)
            const maxRB = Math.max(r, b);
            const greenness = g - maxRB;

            // Thresholds for Greenness:
            // > 40: It is green -> Transparent
            // 10 - 40: Transition
            // < 10: Not green -> Opaque
            // Note: We want high greenness -> low alpha.
            // smoothstep(10, 40, greenness) -> 0 (low green) to 1 (high green)
            // So alpha should be (1 - value)

            // Also need to check absolute Green value to avoid removing dark muddy noise
            if (g > 50) {
                const isGreen = smoothstep(10, 50, greenness);
                alpha = Math.min(alpha, (1 - isGreen) * 255);
            }

            // Despill (Green Fringing Correction)
            // If still visible, clamp Green to average of R and B
            if (alpha > 0) {
                const limit = (r + b) / 2;
                if (g > limit) {
                    data[i + 1] = limit; // Clamp Green
                }
            }

        } else if (mode === 'blue') {
            // Blue Screen Logic: B is dominant
            const maxRG = Math.max(r, g);
            const blueness = b - maxRG;

            if (b > 50) {
                const isBlue = smoothstep(10, 50, blueness);
                alpha = Math.min(alpha, (1 - isBlue) * 255);
            }

            // Despill
            if (alpha > 0) {
                const limit = (r + g) / 2;
                if (b > limit) {
                    data[i + 2] = limit; // Clamp Blue
                }
            }
        }

        data[i + 3] = alpha;
    }
    ctx.putImageData(imageData, 0, 0);
};

// Helper to remove background based on Chroma Key - REMOVED removeWatermark

export const processSticker = (imageSource, bgMode = 'none') => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // Step 1: Create a temp canvas for the original image
            let tempCanvas = document.createElement("canvas");
            let tempCtx = tempCanvas.getContext("2d");
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCtx.drawImage(img, 0, 0);

            if (bgMode && bgMode !== 'none') {
                removeBackground(tempCtx, img.width, img.height, bgMode);
            }

            // Clean up source Blob URL if it was created specifically for this op
            // Note: In splitImage, we create objectURLs for slices.
            // If imageSource is a Blob URL we own, we should revoke it.
            // But processSticker might be called with a persistent ID or Base64.
            // For now, we rely on the caller (splitImage) to revoke its own creations.

            // Step 2: Resize Logic
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Sticker Logic: Fit within (MAX_W - 2*MARGIN) x (MAX_H - 2*MARGIN)
            const targetW = STICKER_MAX_W - MARGIN * 2;
            const targetH = STICKER_MAX_H - MARGIN * 2;

            // We use tempCanvas here, which has the BG removed (or not)
            let { w, h } = resizeToFit(tempCanvas, targetW, targetH);

            // Ensure even numbers
            w = Math.round(w);
            h = Math.round(h);
            if (w % 2 !== 0) w--;
            if (h % 2 !== 0) h--;

            // Canvas size = Image size + Margin * 2
            let finalW = w + MARGIN * 2;
            let finalH = h + MARGIN * 2;

            if (finalW % 2 !== 0) finalW++;
            if (finalH % 2 !== 0) finalH++;

            canvas.width = finalW;
            canvas.height = finalH;

            ctx.clearRect(0, 0, finalW, finalH);
            const x = (finalW - w) / 2;
            const y = (finalH - h) / 2;
            ctx.drawImage(tempCanvas, x, y, w, h);

            canvas.toBlob((blob) => {
                resolve({
                    blob,
                    url: URL.createObjectURL(blob),
                    width: finalW,
                    height: finalH
                });
            }, "image/png");
        };
        img.onerror = reject;
        img.src = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);
    });
};

export const processMainOrTab = (imageSource, type = 'main') => {
    return new Promise((resolve, reject) => {
        const targetW = type === 'main' ? MAIN_W : TAB_W;
        const targetH = type === 'main' ? MAIN_H : TAB_H;

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext("2d");

            let { w, h } = resizeToFit(img, targetW, targetH);

            // Center in the box
            const x = (targetW - w) / 2;
            const y = (targetH - h) / 2;

            ctx.clearRect(0, 0, targetW, targetH);
            ctx.drawImage(img, x, y, w, h);

            canvas.toBlob((blob) => {
                resolve({ blob });
            }, "image/png");
        };
        img.onerror = reject;
        img.src = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);
    });
};

export const splitImage = (file, rows, cols, bgMode = 'none') => {
    return new Promise((resolve, reject) => {
        const fileUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = async () => {
            const tempFullCanvas = document.createElement("canvas");
            const tempFullCtx = tempFullCanvas.getContext("2d");
            tempFullCanvas.width = img.width;
            tempFullCanvas.height = img.height;
            tempFullCtx.drawImage(img, 0, 0);

            // Calculate chunk size (floor to avoid fraction issues)
            const chunkW = Math.floor(img.width / cols);
            const chunkH = Math.floor(img.height / rows);
            const promises = [];

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const canvas = document.createElement("canvas");

                    // Logic to handle remaining pixels in the last row/col
                    // to avoid gaps or missing edges due to rounding
                    const x = c * chunkW;
                    const y = r * chunkH;

                    // If last column, take whatever width remains
                    const currentW = (c === cols - 1) ? (img.width - x) : chunkW;
                    // If last row, take whatever height remains
                    const currentH = (r === rows - 1) ? (img.height - y) : chunkH;

                    canvas.width = currentW;
                    canvas.height = currentH;
                    const ctx = canvas.getContext("2d");

                    // Draw slice from the full image canvas
                    ctx.drawImage(
                        tempFullCanvas,
                        x, y, currentW, currentH, // Source
                        0, 0, currentW, currentH  // Destination
                    );

                    // Convert slice to blobUrl temporarilly to pass to processSticker
                    const sliceUrl = canvas.toDataURL(); // Base64, so no revoke needed

                    // Process this slice (resize/margin/chromakey)
                    try {
                        // Wait for each sticker to process so we don't overwhelm memory? 
                        // Actually Promise.all is fine for reasonable counts (max 40).
                        const p = processSticker(sliceUrl, bgMode);
                        promises.push(p);
                    } catch (e) {
                        console.error("Slice error", e);
                    }
                }
            }

            try {
                const results = await Promise.all(promises);
                resolve(results);
            } catch (e) {
                reject(e);
            } finally {
                // Cleanup source URL
                URL.revokeObjectURL(fileUrl);
            }
        };
        img.onerror = (e) => {
            URL.revokeObjectURL(fileUrl);
            reject(e);
        };
        img.src = fileUrl;
    });
};

/**
 * Heuristic to detect grid layout from image dimensions.
 * Based on common LINE sticker counts (8, 16, 24, 32, 40).
 * Assumes stickers are roughly square or slightly rectangular (370x320).
 * 
 * Returns { rows, cols, count }
 */
export const suggestGrid = (width, height) => {
    const ratio = width / height;

    // Common layouts (Cols x Rows)
    // 8:  4x2 (Ratio ~2.0) or 2x4 (~0.5)
    // 16: 4x4 (~1.0)
    // 24: 4x6 (~0.66)
    // 32: 4x8 (~0.5)
    // 40: 4x10 (~0.4) or 5x8 (~0.625)

    // Define candidates
    const candidates = [
        { cols: 4, rows: 2, count: 8, ratio: 4 / 2 },    // 2.0
        { cols: 2, rows: 4, count: 8, ratio: 2 / 4 },    // 0.5
        { cols: 4, rows: 4, count: 16, ratio: 4 / 4 },   // 1.0
        { cols: 4, rows: 6, count: 24, ratio: 4 / 6 },   // 0.66
        { cols: 4, rows: 8, count: 32, ratio: 4 / 8 },   // 0.5
        { cols: 4, rows: 10, count: 40, ratio: 4 / 10 }, // 0.4
        { cols: 5, rows: 8, count: 40, ratio: 5 / 8 },   // 0.625
    ];

    // Find closest match
    let bestMatch = candidates[0];
    let minDiff = Math.abs(ratio - candidates[0].ratio);

    for (let i = 1; i < candidates.length; i++) {
        const diff = Math.abs(ratio - candidates[i].ratio);
        if (diff < minDiff) {
            minDiff = diff;
            bestMatch = candidates[i];
        }
    }

    return bestMatch;
};

export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
};
