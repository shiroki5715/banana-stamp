import Link from 'next/link';
import styles from './SEOBottom.module.css';

export default function SEOBottom() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className={styles.heading}>
                        LINEスタンプ作成を、もっと自由に、もっと簡単に
                    </h2>
                    <p className={styles.text}>
                        「バナナスタンプ」は、クリエイターの皆さまがLINEスタンプ制作にかける時間を大幅に短縮するために開発された無料ツールです。
                        これまでPhotoshopや各種アプリで行っていた「画像の分割」「リサイズ」「フォーマット変換」「ファイル名変更」といった一連の作業を、
                        たった一度のドラッグ＆ドロップで完結させることができます。
                    </p>
                    <p className={styles.text}>
                        特に、iPadのProcreateやCLIP STUDIO PAINTなどで「1枚のキャンバスにまとめて描く」スタイルの方に最適化されています。
                        面倒な事務作業はツールに任せて、あなたはもっとクリエイティブな「描く」時間に集中してください。
                    </p>

                    <h3 className={styles.subHeading}>
                        初心者の方へのサポートも充実
                    </h3>
                    <p className={styles.text}>
                        初めてLINEスタンプを作る方のために、詳しいガイド記事もご用意しました。
                        審査に通るための画像規定や、ツールの具体的な活用方法について解説しています。
                    </p>

                    <div className={styles.linkGrid}>
                        <Link href="/guide/requirements" className={styles.linkCard}>
                            <h4 className={styles.cardTitle}>画像要件ガイド →</h4>
                            <p className={styles.cardDesc}>LINE公式規定に基づくサイズや余白のルール解説</p>
                        </Link>

                        <Link href="/guide/howto" className={styles.linkCard}>
                            <h4 className={styles.cardTitle}>詳しい使い方・FAQ →</h4>
                            <p className={styles.cardDesc}>ステップごとの解説と、困ったときのQ&A</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
