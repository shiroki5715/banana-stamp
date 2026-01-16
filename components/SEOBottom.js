import Link from 'next/link';
import styles from './FaqSection.module.css'; // Re-use FAQ styles for consistency or create new ones

export default function SEOBottom() {
    return (
        <section style={{ padding: '4rem 0', background: '#f9f9f9', borderTop: '1px solid #eee' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>
                        LINEスタンプ作成を、もっと自由に、もっと簡単に。
                    </h2>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#555' }}>
                        「バナナスタンプ」は、クリエイターの皆さまがLINEスタンプ制作にかける時間を大幅に短縮するために開発された無料ツールです。
                        これまでPhotoshopや各種アプリで行っていた「画像の分割」「リサイズ」「フォーマット変換」「ファイル名変更」といった一連の作業を、
                        たった一度のドラッグ＆ドロップで完結させることができます。
                    </p>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#555' }}>
                        特に、iPadのProcreateやCLIP STUDIO PAINTなどで「1枚のキャンバスにまとめて描く」スタイルの方に最適化されています。
                        面倒な事務作業はツールに任せて、あなたはもっとクリエイティブな「描く」時間に集中してください。
                    </p>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', marginTop: '2.5rem', color: '#333' }}>
                        初心者の方へのサポートも充実
                    </h3>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#555' }}>
                        初めてLINEスタンプを作る方のために、詳しいガイド記事もご用意しました。
                        審査に通るための画像規定や、ツールの具体的な活用方法について解説しています。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                        <Link href="/guide/requirements" style={{
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'transform 0.2s',
                            border: '1px solid #eee'
                        }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#0070f3' }}>画像要件ガイド →</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>LINE公式規定に基づくサイズや余白のルール解説。</p>
                        </Link>

                        <Link href="/guide/howto" style={{
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'transform 0.2s',
                            border: '1px solid #eee'
                        }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#0070f3' }}>詳しい使い方・FAQ →</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>ステップごとの解説と、困ったときのQ&A。</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
