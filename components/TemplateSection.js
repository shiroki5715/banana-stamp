"use client";

import styles from "./TemplateSection.module.css";

export default function TemplateSection() {
    // Mock data for templates
    const templates = [
        { count: 8, size: "1480 x 640px" },
        { count: 16, size: "1480 x 1280px" },
        { count: 24, size: "1480 x 1920px" },
        { count: 32, size: "1480 x 2560px" },
        { count: 40, size: "1480 x 3200px" },
    ];

    return (
        <section id="templates" className={styles.section}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.header}>
                        <h2 className={styles.heading}>テンプレート配布</h2>
                        <p className={styles.desc}>
                            迷ったらこれを使ってください。推奨サイズのガイド付きテンプレート画像です。<br />
                            （現在はPNGのみ配布中）
                        </p>
                    </div>

                    <div className={styles.list}>
                        {templates.map((t) => (
                            <div key={t.count} className={styles.item}>
                                <div className={styles.info}>
                                    <span className={styles.count}>{t.count}個用</span>
                                    <span className={styles.size}>{t.size}</span>
                                </div>
                                {/* 
                  Note: Actual file downloads would need real files in public folder.
                  For now, we'll anchor to # for demo purposes or create a dummy functionality
                  if the user asks, but usually we just put the UI first.
                */}
                                <button className={styles.dlBtn} onClick={() => alert('テンプレート機能は準備中です。\n指定サイズで画像を作成してください。')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                    DL
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
