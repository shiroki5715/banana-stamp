"use client";

import styles from "./TemplateSection.module.css";
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function TemplateSection() {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    // Template data with grid layout information
    const templates = [
        { count: 8, rows: 2, cols: 4, size: "1480 x 640px" },
        { count: 16, rows: 4, cols: 4, size: "1480 x 1280px" },
        { count: 24, rows: 6, cols: 4, size: "1480 x 1920px" },
        { count: 32, rows: 8, cols: 4, size: "1480 x 2560px" },
        { count: 40, rows: 10, cols: 4, size: "1480 x 3200px" },
    ];

    return (
        <section id="templates" ref={ref} className={`${styles.section} fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.header}>
                        <span className={styles.label}>GRID SPECS</span>
                        <h2 className={styles.heading}>推奨サイズ一覧</h2>
                        <p className={styles.desc}>
                            きれいに分割するための推奨キャンバスサイズ
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
                                </div>

                                <div className={styles.info}>
                                    <span className={styles.count}>{t.count} UNITS</span>
                                    <span className={styles.size}>{t.size}</span>
                                    <span className={styles.layout}>{t.rows}R x {t.cols}C</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
