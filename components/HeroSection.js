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
                        <span className={styles.highlight}>一瞬でスタンプに。</span>
                    </h1>

                    <p className={styles.subtitle}>
                        面倒な分割・リサイズ・フォーマット変換を全自動で。<br />
                        個数を選んでアップロードするだけ。
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
                            <div className={styles.cardHeader}>
                                <div className={styles.windowControls}>
                                    <span></span><span></span><span></span>
                                </div>
                                <div className={styles.cardTitle}>Preview</div>
                            </div>

                            <div className={styles.simulation}>
                                <div className={styles.before}>
                                    <div className={styles.label}>Before</div>
                                    <div className={styles.placeholderImg}>Original Image</div>
                                </div>

                                <div className={styles.arrow}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>

                                <div className={styles.after}>
                                    <div className={styles.label}>After</div>
                                    <div className={styles.gridPreview}>
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className={styles.stickerItem} style={{ animationDelay: `${i * 0.1}s` }}></div>
                                        ))}
                                    </div>
                                    <div className={styles.zipBadge}>ZIP出力</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
