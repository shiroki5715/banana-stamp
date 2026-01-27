"use client";

import styles from "./HeroSection.module.css";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.grid}`}>
                {/* Left: Copy & Actions */}
                <div className={styles.content}>
                    <div className={styles.badgeGroup}>
                        <span className={styles.badge}>
                            <span className={styles.dot}></span> ブラウザ完結・インストール不要
                        </span>
                        <span className={styles.badgeLine}>LINEスタンプ専用</span>
                    </div>

                    <h1 className={styles.title}>
                        1枚の画像を、<br />
                        <span className={styles.heroText}>一瞬でスタンプに</span>
                    </h1>

                    <p className={styles.subtitle}>
                        面倒な分割・リサイズ・フォーマット変換を全自動で<br />
                        個数を選んでアップロードするだけ
                        <br />
                        <span className={styles.techSpec}>main.png / tab.png も自動生成</span>
                    </p>

                    <div className={styles.ctaGroup}>
                        <a href="#tool" onClick={scrollTo('tool')} className="btn-primary">
                            今すぐ作る
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#howto" onClick={scrollTo('howto')} className="btn-secondary">
                            使い方を見る
                        </a>
                    </div>

                    <div className={styles.trust}>
                        <span className={styles.check}>✓ 登録不要</span>
                        <span className={styles.check}>✓ 完全無料</span>
                        <span className={styles.check}>✓ プライバシー保護</span>
                    </div>
                </div>

                {/* Right: Premium Visual */}
                <div className={styles.visual}>
                    <div className={styles.cardContainer}>
                        {/* Background elements */}
                        <div className={styles.blobYellow}></div>
                        <div className={styles.blobGreen}></div>

                        {/* Glass Card */}
                        <div className={`${styles.glassCard} glass-card`}>
                            <div className={styles.windowControls}>
                                <span></span><span></span><span></span>
                            </div>

                            <div className={styles.simulation}>
                                {/* Left: Original File */}
                                <div className={styles.simItem}>
                                    <div className={styles.fileIcon}>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span className={styles.fileLabel}>Original</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className={styles.arrowContainer}>
                                    <div className={styles.arrowLine}></div>
                                    <div className={styles.arrowHead}></div>
                                </div>

                                {/* Right: Result Grid */}
                                <div className={styles.simItem}>
                                    <div className={styles.gridPreview}>
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className={styles.stickerItem} style={{ animationDelay: `${i * 0.1}s` }}></div>
                                        ))}
                                    </div>
                                    <div className={styles.zipBadge}>
                                        <span>ZIP</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
