"use client";

import styles from './brutalist.module.css';

export default function BrutalistDemo() {
    const articles = [
        {
            id: 1,
            tag: "Design",
            tagColor: "tagYellow",
            title: "No More Gradients",
            desc: "2026年、グラデーションは死んだ。ソリッドカラーが帰ってきた。Flatを超えたRawへ。"
        },
        {
            id: 2,
            tag: "Code",
            tagColor: "tagBlue",
            title: "CSS Is All You Need",
            desc: "React? Vue? いいえ、border: 3px solid #000 だけで十分です。"
        },
        {
            id: 3,
            tag: "Hot",
            tagColor: "tagRed",
            title: "Kill The Blur",
            desc: "backdrop-filterを捨てろ。ぼかしは逃げだ。すべてをクリアに、ソリッドに。"
        },
        {
            id: 4,
            tag: "Trend",
            tagColor: "tagGreen",
            title: "Offset Shadows",
            desc: "影はぼかさない。5pxずらして黒く落とす。それがBrutalの掟。"
        },
        {
            id: 5,
            tag: "Font",
            tagColor: "tagYellow",
            title: "UPPERCASE EVERYTHING",
            desc: "小文字は弱さの象徴。全部大文字にしろ。叫べ。"
        },
        {
            id: 6,
            tag: "UX",
            tagColor: "tagBlue",
            title: "Hover Must Shake",
            desc: "ホバーしたら「ガタッ」と動け。ユーザーに「触った」と感じさせろ。"
        },
    ];

    return (
        <div className={styles.container}>
            {/* Hero */}
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    NEO<br />
                    <span className={styles.highlight}>BRUTAL</span><br />
                    ISM
                </h1>
                <p className={styles.subtitle}>
                    洗練を捨てろ。ブラーを殺せ。<br />
                    2026年、デザインは「荒々しさ」に回帰する。
                </p>
            </section>

            {/* Grid */}
            <section className={styles.gridSection}>
                <h2 className={styles.sectionTitle}>MANIFESTO</h2>
                <div className={styles.grid}>
                    {articles.map((article) => (
                        <article key={article.id} className={styles.card}>
                            <span className={`${styles.cardTag} ${styles[article.tagColor]}`}>
                                {article.tag}
                            </span>
                            <h3 className={styles.cardTitle}>{article.title}</h3>
                            <p className={styles.cardDesc}>{article.desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>READY TO GO BRUTAL?</h2>
                <button className={styles.ctaButton}>START NOW →</button>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <span>© 2026 BRUTAL DESIGN MANIFESTO</span>
                <span>SKILL: neo_brutalism_designer</span>
            </footer>
        </div>
    );
}
