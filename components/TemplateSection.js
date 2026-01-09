"use client";

import styles from "./TemplateSection.module.css";

export default function TemplateSection() {
    // Template data with grid layout information
    const templates = [
        { count: 8, rows: 2, cols: 4, size: "1480 x 640px" },
        { count: 16, rows: 4, cols: 4, size: "1480 x 1280px" },
        { count: 24, rows: 6, cols: 4, size: "1480 x 1920px" },
        { count: 32, rows: 8, cols: 4, size: "1480 x 2560px" },
        { count: 40, rows: 10, cols: 4, size: "1480 x 3200px" },
    ];

    // Generate and download a template PNG
    const handleDownload = (template) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Parse size string
        const [width, height] = template.size.replace('px', '').split(' x ').map(Number);
        canvas.width = width;
        canvas.height = height;

        // White background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Calculate cell dimensions
        const cellWidth = width / template.cols;
        const cellHeight = height / template.rows;

        // Draw grid lines
        ctx.strokeStyle = '#DDDDDD';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);

        // Vertical lines
        for (let i = 1; i < template.cols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellWidth, 0);
            ctx.lineTo(i * cellWidth, height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let i = 1; i < template.rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * cellHeight);
            ctx.lineTo(width, i * cellHeight);
            ctx.stroke();
        }

        // Draw cell numbers
        ctx.setLineDash([]);
        ctx.font = 'bold 48px sans-serif';
        ctx.fillStyle = '#BBBBBB';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let row = 0; row < template.rows; row++) {
            for (let col = 0; col < template.cols; col++) {
                const num = row * template.cols + col + 1;
                if (num <= template.count) {
                    const x = col * cellWidth + cellWidth / 2;
                    const y = row * cellHeight + cellHeight / 2;
                    ctx.fillText(String(num).padStart(2, '0'), x, y);
                }
            }
        }

        // Border
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 4;
        ctx.setLineDash([]);
        ctx.strokeRect(2, 2, width - 4, height - 4);

        // Download
        const link = document.createElement('a');
        link.download = `template_${template.count}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <section id="templates" className={styles.section}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.header}>
                        <h2 className={styles.heading}>テンプレートサイズガイド</h2>
                        <p className={styles.desc}>
                            スタンプ個数ごとの推奨キャンバスサイズです。<br />
                            プレビューを参考にして、お好みの画像編集アプリで原稿を作成してください。<br />
                            <small>※ダウンロードされるファイルは実寸サイズ（透過PNG）です。</small>
                        </p>
                    </div>

                    <div className={styles.list}>
                        {templates.map((t) => (
                            <div key={t.count} className={styles.item}>
                                {/* Grid Preview */}
                                <div className={styles.preview}>
                                    <div
                                        className={styles.gridPreview}
                                        style={{
                                            gridTemplateColumns: `repeat(${t.cols}, 1fr)`,
                                            gridTemplateRows: `repeat(${Math.min(t.rows, 4)}, 1fr)`,
                                        }}
                                    >
                                        {[...Array(Math.min(t.count, 16))].map((_, i) => (
                                            <div key={i} className={styles.cell}>
                                                <span>{String(i + 1).padStart(2, '0')}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {t.rows > 4 && (
                                        <div className={styles.moreIndicator}>
                                            +他 {t.count - 16} 枚
                                        </div>
                                    )}
                                </div>

                                <div className={styles.info}>
                                    <span className={styles.count}>{t.count}個用</span>
                                    <span className={styles.size}>{t.size}</span>
                                    <span className={styles.layout}>{t.rows}行 × {t.cols}列</span>
                                </div>

                                <button
                                    className={styles.dlBtn}
                                    onClick={() => handleDownload(t)}
                                    title="テンプレートPNGをダウンロード"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    ダウンロード
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
