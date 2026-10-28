'use client';

import styles from './page.module.css';

export default function ShowcasePage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    <span className={styles.gradient}>Design Skill</span> Showcase
                </h1>
                <p className={styles.heroSubtitle}>
                    aesthetic_refiner スキルによるモダンUIデモ
                </p>
            </section>

            {/* Bento Grid Section */}
            <section className={styles.bentoSection}>
                <h2 className={styles.sectionTitle}>Bento Grid Layout</h2>
                <div className={styles.bentoGrid}>
                    {/* Large Feature Card */}
                    <div className={`${styles.bentoCard} ${styles.bentoLarge}`}>
                        <div className={styles.cardIcon}>🎨</div>
                        <h3>Glassmorphism</h3>
                        <p>すりガラス効果で奥行きを表現。backdrop-filterとブラーを組み合わせた透明感のあるデザイン。</p>
                    </div>

                    {/* Small Card */}
                    <div className={`${styles.bentoCard} ${styles.bentoSmall}`}>
                        <div className={styles.cardIcon}>✨</div>
                        <h3>Micro-interactions</h3>
                        <p>ホバーで反応するカード</p>
                    </div>

                    {/* Small Card */}
                    <div className={`${styles.bentoCard} ${styles.bentoSmall}`}>
                        <div className={styles.cardIcon}>🌈</div>
                        <h3>Mesh Gradients</h3>
                        <p>淡いグラデーションの空気感</p>
                    </div>

                    {/* Medium Card */}
                    <div className={`${styles.bentoCard} ${styles.bentoMedium}`}>
                        <div className={styles.cardIcon}>📐</div>
                        <h3>Rhythm & Space</h3>
                        <p>余白をアクティブな要素として扱い、視覚的なリズムを生み出す。</p>
                    </div>

                    {/* Medium Card */}
                    <div className={`${styles.bentoCard} ${styles.bentoMedium}`}>
                        <div className={styles.cardIcon}>🎯</div>
                        <h3>Focus Visible</h3>
                        <p>キーボード操作時のフォーカス状態も美しく。</p>
                    </div>
                </div>
            </section>

            {/* Button Showcase */}
            <section className={styles.buttonSection}>
                <h2 className={styles.sectionTitle}>Button Styles</h2>
                <div className={styles.buttonGrid}>
                    <button className="btn-primary">Primary Button</button>
                    <button className="btn-secondary">Secondary Button</button>
                    <button className={styles.glassButton}>Glass Button</button>
                </div>
            </section>

            {/* Stats Section - Bento Style */}
            <section className={styles.statsSection}>
                <h2 className={styles.sectionTitle}>Stats Cards</h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>370×320</span>
                        <span className={styles.statLabel}>スタンプサイズ</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>8-40</span>
                        <span className={styles.statLabel}>作成可能枚数</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>PNG</span>
                        <span className={styles.statLabel}>出力形式</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>ZIP</span>
                        <span className={styles.statLabel}>一括ダウンロード</span>
                    </div>
                </div>
            </section>

            {/* Accessibility Note */}
            <section className={styles.a11ySection}>
                <div className={styles.a11yCard}>
                    <h3>♿ アクセシビリティ対応</h3>
                    <ul>
                        <li>WCAG AA基準のコントラスト比</li>
                        <li><code>prefers-reduced-motion</code> 対応</li>
                        <li><code>:focus-visible</code> スタイル設定</li>
                        <li><code>backdrop-filter</code> フォールバック</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
