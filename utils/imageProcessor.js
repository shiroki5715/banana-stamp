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

// Helper to remove background based on Chroma Key
const removeBackground = (ctx, width, height, mode) => {
    if (!mode || mode === 'none') return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Target Colors (RGB)
    let targetR = 255, targetG = 255, targetB = 255; // Default White
    let threshold = 60; // Euclidian distance threshold

    if (mode === 'green') {
        targetR = 0; targetG = 255; targetB = 0;
        threshold = 100; // Green screen needs decent tolerance
    } else if (mode === 'blue') {
        targetR = 0; targetG = 0; targetB = 255;
        threshold = 100;
    } else if (mode === 'magenta') {
        targetR = 255; targetG = 0; targetB = 255;
        threshold = 100;
    } else if (mode === 'white') {
        // For white, we keep the previous simple high-threshold logic or use distance
        // High-threshold (RGB > 240) is often safer for "paper scan" than pure white distance
        // Let's use a specialized check for white to match previous behavior which worked well for scans

        const whiteThresh = 240;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] > whiteThresh && data[i + 1] > whiteThresh && data[i + 2] > whiteThresh) {
                data[i + 3] = 0;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        return;
    }

    // Chroma Key Logic for Colors
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        let isMatch = false;

        if (mode === 'green') {
            // Green Screen Logic: G is dominant
            // G must be significantly higher than R and B
            // Also enforce a minimum brightness for G to avoid black matching
            if (g > 70 && g > r + 40 && g > b + 40) {
                isMatch = true;
            }
        } else if (mode === 'blue') {
            // Blue Screen Logic
            if (b > 70 && b > r + 40 && b > g + 40) {
                isMatch = true;
            }
        } else if (mode === 'magenta') {
            // Magenta: R and B are high, G is low
            if (r > 150 && b > 150 && g < 100 && Math.abs(r - b) < 60) {
                isMatch = true;
            }
        }

        // Use Euclidian as fallback or for custom colors if we added them later
        // But for now, the dominant channel logic is much better for screens
        if (isMatch) {
            data[i + 3] = 0; // Transparent
        } else {
            // DESPILL / SPILL SUPPRESSION
            // If the pixel is not removed, check if it has a color cast from the background
            // and neutralize it. This fixes the "Green Fringe" issue.

            if (mode === 'green') {
                // Check if Green is still the dominant channel, even if not enough to trigger removal
                // Simple despill: Limit Green to the average of Red and Blue
                const limit = (r + b) / 2;
                if (g > limit) {
                    data[i + 1] = limit; // Clamp Green
                    // Optional: Restore luminance if needed, but usually clamping is enough for edges
                }
            } else if (mode === 'blue') {
                // Check if Blue is dominant
                const limit = (r + g) / 2;
                if (b > limit) {
                    data[i + 2] = limit; // Clamp Blue
                }
            }
            // Magenta despill is trickier, skipping for now as it's less common
        }
    }
    ctx.putImageData(imageData, 0, 0);
};

// Helper to patch bottom-right watermark
const removeWatermark = (ctx, width, height) => {
    // Approx size of Gemini flare in bottom right is small.
    // Let's assume a safe box of 80x80px from the corner.
    const patchW = 80;
    const patchH = 80;

    // Sample color from just outside the patch area (left of it)
    // x: width - patchW - 5
    // y: height - patchH / 2
    const sampleX = Math.max(0, width - patchW - 10);
    const sampleY = Math.max(0, height - 30); // Sample near bottom

    const p = ctx.getImageData(sampleX, sampleY, 1, 1).data;
    const color = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;

    // Fill the corner
    ctx.fillStyle = color;
    // We cover a bit more to be safe
    ctx.fillRect(width - patchW, height - patchH, patchW, patchH);
};

export const processSticker = (imageSource, bgMode = 'none') => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // Step 1: Create a temp canvas for the original image
            // We want to remove background BEFORE resize if requested, 
            // or we could do it on the resized version. 
            // Doing it on the original high-res chunk is usually sharper, 
            // but might be slower for huge images. 
            // Given the chunks aren't massive, let's try processing the source first if needed.

            // However, imageSource is already a slice (DataURL).

            let tempCanvas = document.createElement("canvas");
            let tempCtx = tempCanvas.getContext("2d");
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCtx.drawImage(img, 0, 0);

            if (bgMode && bgMode !== 'none') {
                removeBackground(tempCtx, img.width, img.height, bgMode);
            }

            // Step 2: Resize Logic
            // Use the processed tempCanvas as source for resizing

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

export const splitImage = (file, rows, cols, bgMode = 'none', removeWatermarkFlag = false) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = async () => {
            const tempFullCanvas = document.createElement("canvas");
            const tempFullCtx = tempFullCanvas.getContext("2d");
            tempFullCanvas.width = img.width;
            tempFullCanvas.height = img.height;
            tempFullCtx.drawImage(img, 0, 0);

            // Remove Watermark FIRST (on the full image) if requested
            if (removeWatermarkFlag) {
                removeWatermark(tempFullCtx, img.width, img.height);
            }

            const chunkW = img.width / cols;
            const chunkH = img.height / rows;
            const promises = [];

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const canvas = document.createElement("canvas");
                    canvas.width = chunkW;
                    canvas.height = chunkH;
                    const ctx = canvas.getContext("2d");

                    // Draw slice from the potentially modified full image canvas
                    ctx.drawImage(
                        img,
                        c * chunkW, r * chunkH, chunkW, chunkH, // Source
                        0, 0, chunkW, chunkH // Destination
                    );

                    // Convert slice to blobUrl temporarilly to pass to processSticker
                    const sliceUrl = canvas.toDataURL();

                    // Process this slice (resize/margin/chromakey)
                    // Note: bgMode is handled inside processSticker
                    promises.push(processSticker(sliceUrl, bgMode));
                }
            }

            try {
                const results = await Promise.all(promises);
                resolve(results);
            } catch (e) {
                reject(e);
            }
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
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
