import styles from './WorkflowGuide.module.css';

export default function WorkflowGuide() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* STEP 1 */}
                <div className={styles.stepBlock}>
                    <span className={styles.stepLabel}>STEP 1</span>
                    <div className={styles.iconWrapper}>
                        {/* 4列 x 2行 のグリッド表現 */}
                        <div className={styles.gridIconLandscape}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.gridCell} />
                            ))}
                        </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>スタンプ画像一覧</p>
                </div>

                {/* Arrow */}
                <div className={styles.arrow}>▶</div>

                {/* STEP 2 */}
                <div className={styles.stepBlock}>
                    <span className={styles.stepLabel}>STEP 2</span>
                    <div className={styles.iconWrapper}>
                        <div className={styles.bananaIcon}>🍌</div>
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>画像をドロップ</p>
                </div>

                {/* Arrow */}
                <div className={styles.arrow}>▶</div>

                {/* STEP 3 */}
                <div className={styles.stepBlock}>
                    <span className={styles.stepLabel}>STEP 3</span>
                    <div className={styles.iconWrapper}>
                        <div className={styles.phoneIcon}>
                            <div className={styles.chatBubble}></div>
                            <div className={`${styles.chatBubble} ${styles.right}`}></div>
                            <div className={styles.chatBubble}></div>
                            <div className={styles.zipIcon}>ZIP</div>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>完成＆DL！</p>
                </div>
            </div>
        </section>
    );
}
