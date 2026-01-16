export const metadata = {
    title: 'LINEスタンプ制作の画像要件・規定ガイド | バナナスタンプ',
    description: 'LINEクリエイターズマーケットの審査に通るための画像サイズ、余白、フォーマットの規定を詳しく解説します。main.png, tab.pngの仕様も網羅。',
};

export default function RequirementsGuide() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                LINEスタンプ制作の画像要件・規定ガイド
            </h1>

            <section style={{ marginBottom: '3rem' }}>
                <p style={{ lineHeight: '1.8' }}>
                    LINEスタンプ（クリエイターズスタンプ）を販売するためには、LINE株式会社が定める厳格なガイドラインに従った画像を制作する必要があります。
                    1ピクセルでもサイズが異なるとアップロード時にエラーとなってしまうため、正確な仕様理解が不可欠です。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>1. 必須画像と基本サイズ</h2>
                <p style={{ marginBottom: '1rem' }}>
                    スタンプ1セットを申請するためには、以下の3種類の画像ファイルが必要です。
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>画像種類</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>推奨サイズ (W × H)</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>必要枚数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}><strong>メイン画像 (main)</strong></td>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>240px × 240px</td>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>1個</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}><strong>スタンプ画像 (01-40)</strong></td>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>最大 370px × 320px</td>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>8/16/24/32/40個</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}><strong>トークルームタブ画像 (tab)</strong></td>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>96px × 74px</td>
                            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>1個</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ background: '#eef6ff', padding: '1.5rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0056b3' }}>💡 バナナスタンプなら全自動</h3>
                    <p>
                        当ツール「バナナスタンプ」を使用すれば、1枚の大きな画像からこれらのサイズ（main, tab含む）をすべて自動生成・リサイズします。
                        個別のリサイズ作業は不要です。
                    </p>
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>2. 余白と透過のルール</h2>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>10px程度の余白</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                    トリミングされた画像がキャンバスの上下左右いっぱいまで描かれていると、スタンプの視認性が悪くなる場合があります。
                    LINE公式の制作ガイドラインでは、上下左右に<strong>10px程度の余白</strong>を設けることが推奨されています。
                    バナナスタンプの自動処理では、この余白を考慮してリサイズを行います。
                </p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>背景の透過</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                    スタンプの背景は必ず<strong>透過（透明）</strong>である必要があります。
                    白い背景が残っていると、ユーザーが「ダークモード」を使用している際などに四角い枠が見えてしまい、審査落ちの原因（またはクオリティ低下）となります。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>3. ファイル形式とサイズ制限</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8' }}>
                    <li><strong>形式:</strong> PNG形式（APNGはアニメーションスタンプのみ）</li>
                    <li><strong>カラーモード:</strong> RGB（CMYKは不可）</li>
                    <li><strong>ファイルサイズ:</strong> 1個あたり1MB以下</li>
                    <li><strong>解像度:</strong> 72dpi以上推奨</li>
                </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>4. 審査リジェクト（不合格）を防ぐために</h2>
                <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                    画像規定以外にも、以下のようなケースで審査がリジェクトされることがあります。
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8' }}>
                    <li>単純なテキストのみのスタンプ（イラスト等がなく、視認性が低いもの）</li>
                    <li>公序良俗に反する表現、過度に攻撃的な表現</li>
                    <li>著作権侵害（パロディ含む）</li>
                    <li>内部に透過漏れがある（ゴミ取り忘れ）</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                    制作の際は、必ず<a href="https://creator.line.me/ja/guideline/sticker/" target="_blank" rel="noopener noreferrer" style={{ color: '#4a9eff', textDecoration: 'underline' }}>LINE Creators Market 制作ガイドライン</a>をご確認ください。
                </p>
            </section>
        </div>
    );
}
