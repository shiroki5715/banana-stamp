import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css'; // Re-use main styles for layout simplicity

export default function HowTo() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>バナナスタンプの使い方</h1>

            <section className={styles.hero} style={{ marginBottom: '4rem' }}>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                    手描きのイラストや写真を、一枚の画像にまとめてアップロードするだけ。<br />
                    LINEスタンプの規定サイズに合わせて、自動で切り抜き・リサイズを行います。
                </p>
            </section>

            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>1. 原稿を作る</h2>
                <p>
                    すべてのスタンプを1枚のキャンバスに並べて描きます（または配置します）。<br />
                    各スタンプのサイズは自動調整されますが、キャンバス全体は以下のサイズで作成することをお勧めします。
                </p>

                <div style={{ margin: '2rem 0', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #555' }}>
                                <th style={{ padding: '1rem' }}>スタンプ個数</th>
                                <th style={{ padding: '1rem' }}>配置 (横 x 縦)</th>
                                <th style={{ padding: '1rem' }}>推奨キャンバスサイズ (px)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '1rem' }}>8個</td>
                                <td style={{ padding: '1rem' }}>4 x 2</td>
                                <td style={{ padding: '1rem', color: '#4a9eff', fontWeight: 'bold' }}>1480 x 640</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '1rem' }}>16個</td>
                                <td style={{ padding: '1rem' }}>4 x 4</td>
                                <td style={{ padding: '1rem', color: '#4a9eff', fontWeight: 'bold' }}>1480 x 1280</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '1rem' }}>24個</td>
                                <td style={{ padding: '1rem' }}>4 x 6</td>
                                <td style={{ padding: '1rem', color: '#4a9eff', fontWeight: 'bold' }}>1480 x 1920</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '1rem' }}>32個</td>
                                <td style={{ padding: '1rem' }}>4 x 8</td>
                                <td style={{ padding: '1rem', color: '#4a9eff', fontWeight: 'bold' }}>1480 x 2560</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem' }}>40個</td>
                                <td style={{ padding: '1rem' }}>4 x 10</td>
                                <td style={{ padding: '1rem', color: '#4a9eff', fontWeight: 'bold' }}>1480 x 3200</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                        ※ 横幅 1480px は、スタンプ1つあたり 370px × 4列 の計算です。<br />
                        ※ 縦幅は 320px × 行数 で計算しています。
                    </p>
                </div>

                <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>イメージ例（24個の場合）</p>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto', aspectRatio: '1480/1920' }}>
                        <Image
                            src="/images/example_24.jpg"
                            alt="24個配置の例"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>2. アップロードする</h2>
                <p>
                    トップページの点線エリアに画像をドラッグ＆ドロップしてください。<br />
                    設定で「個数」を選んでおくと、自動的に分割されます。
                </p>
            </section>

            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>3. ダウンロードする</h2>
                <p>
                    分割されたスタンプを確認し、「ZIPでダウンロード」ボタンを押してください。<br />
                    自動的に `main.png` と `tab.png` も生成されるので、そのままLINE Creators Marketにアップロードできます。
                </p>
            </section>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Link
                    href="/"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 3rem',
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: '#000',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontSize: '1.2rem'
                    }}
                >
                    スタンプを作ってみる
                </Link>
            </div>
        </div>
    );
}
