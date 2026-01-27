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

    return (
        <section id="templates" className={styles.section}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.header}>
                        <h2 className={styles.heading}>推奨キャンバスサイズ</h2>
                        <p className={styles.desc}>
                            スタンプ個数ごとの推奨サイズです。<br />
                            お好みの画像編集アプリで原稿を作成してください
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
