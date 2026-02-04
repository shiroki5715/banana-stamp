import styles from './WorkflowGuide.module.css';

export default function WorkflowGuide() {
    const steps = [
        {
            num: "STEP 1",
            title: "設定を選ぶ",
            desc: "作りたいスタンプの個数（8個〜40個）を選びます。",
            icon: "⚙️"
        },
        {
            num: "STEP 2",
            title: "画像を置く",
            desc: "原稿となる大きな画像を、ポンッと置くだけ。",
            icon: "📁"
        },
        {
            num: "STEP 3",
            title: "ダウンロード",
            desc: "自動で完成！ZIPファイルを保存してLINEへ申請。",
            icon: "🎁"
        }
    ];

    return (
        <section id="howto" className={styles.guideSection}>
            <div className={styles.container}>
                <div className={styles.guideHeader}>
                    ✨ 3ステップで完了！
                </div>

                <div className={styles.steps}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.iconWrapper}>
                                {step.icon}
                            </div>
                            <div className={styles.stepContent}>
                                <span className={styles.stepNum}>{step.num}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
