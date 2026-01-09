"use client";

import styles from "./HowToStep.module.css";

export default function HowToStep() {
    const steps = [
        {
            num: "01",
            title: "個数を選ぶ",
            desc: "作りたいスタンプの個数を選択。8個・16個・24個...と作成したい数に合わせるだけで、キャンバス分割設定が完了します。",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )
        },
        {
            num: "02",
            title: "画像をドロップ",
            desc: "1枚の原稿画像をドロップするだけ。AIが自動で位置を調整することはなく、あなたの作った原稿を忠実に指定サイズに切り出します。",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            )
        },
        {
            num: "03",
            title: "ZIPで保存",
            desc: "プレビューを確認したらボタンひとつでダウンロード。main.png, tab.png も自動生成され、そのままLINE Creators Marketにアップできます。",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            )
        }
    ];

    return (
        <section id="howto" className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>HOW TO USE</span>
                    <h2 className={styles.heading}>3ステップで完了。<br />迷う時間はゼロ。</h2>
                </div>

                <div className={styles.grid}>
                    {steps.map((step, i) => (
                        <div key={i} className={`${styles.card} glass-card`}>
                            <div className={styles.iconBox}>
                                {step.icon}
                            </div>
                            <div className={styles.stepNum}>{step.num}</div>
                            <h3 className={styles.cardTitle}>{step.title}</h3>
                            <p className={styles.cardDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
