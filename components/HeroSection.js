"use client";

import styles from './HeroSection.module.css';
import Image from 'next/image';

export default function HeroSection() {
    const scrollToTool = () => {
        const element = document.getElementById('tool');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.grid}`}>
                {/* Left: Content */}
                <div className={styles.heroStart}>
                    <div className={styles.brandBadge}>
                        <span>🚀</span>
                        LINEスタンプ作成ツール
                    </div>

                    <h1 className={styles.title}>
                        面倒な作業は、<br />
                        <span className={styles.highlight}>ぜ〜んぶおまかせ！</span>
                    </h1>

                    <p className={styles.subtitle}>
                        1枚の画像をポンッと置くだけ。<br />
                        分割もリサイズも、一瞬で完了。<br />
                        クリエイターのための最強時短ツールです。
                    </p>

                    <div className={styles.actions}>
                        <button onClick={scrollToTool} className="btn-primary">
                            今すぐバナナする！🍌
                        </button>
                        <a href="#howto" className="btn-secondary">
                            使い方はこちら
                        </a>
                    </div>

                    <div className={styles.specs}>
                        <div className={styles.specItem}>登録不要</div>
                        <div className={styles.specItem}>完全無料</div>
                        <div className={styles.specItem}>ブラウザ完結</div>
                    </div>
                </div>

                {/* Right: Visual (Sticker Mockup) */}
                <div className={styles.visual}>
                    <div className={styles.stickerSheet}>
                        {/* Simple visual representation using CSS Grid/Flex for sticker preview */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            <div style={{ aspectRatio: '1/1', background: '#FFF9C4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🍌</div>
                            <div style={{ aspectRatio: '1/1', background: '#E3F2FD', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>💨</div>
                            <div style={{ aspectRatio: '1/1', background: '#FFEBEE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>💖</div>
                            <div style={{ aspectRatio: '1/1', background: '#E8F5E9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👍</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
