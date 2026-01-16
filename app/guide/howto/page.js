export const metadata = {
    title: '使い方の詳細・トラブルシューティング | バナナスタンプ',
    description: 'バナナスタンプの詳しい操作方法と、うまくいかない場合の対処法（Q&A）をまとめています。iPadでの利用やZIP解凍についても解説。',
};

export default function HowToGuide() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                使い方の詳細・トラブルシューティング
            </h1>

            <section style={{ marginBottom: '3rem' }}>
                <p style={{ lineHeight: '1.8' }}>
                    このページでは、バナナスタンプを使ったLINEスタンプ画像の作成手順をより詳しく解説します。
                    また、よくあるトラブルへの対処法も掲載しています。
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>詳しい操作手順</h2>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>STEP 1: 原稿画像を用意する</h3>
                    <p style={{ lineHeight: '1.8' }}>
                        例えば「8個」のスタンプを作りたい場合、キャンバスに「横4個 × 縦2個」等倍でイラストを並べた1枚の画像（PNG/JPG）を用意します。
                        iPadのProcreateや、Photoshop、CLIP STUDIO PAINTなどで描いたものを1枚の画像として書き出してください。
                        <br />
                        <small style={{ color: '#666' }}>※ 画像の全体サイズは大きくても問題ありません。ツールが自動縮小します。</small>
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>STEP 2: 個数を選択してアップロード</h3>
                    <p style={{ lineHeight: '1.8' }}>
                        バナナスタンプのトップページで、作成したスタンプの個数（8個〜40個）を選択します。
                        その後、原稿画像を点線枠エリアにドラッグ＆ドロップ（またはタップして選択）してください。
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>STEP 3: プレビューとダウンロード</h3>
                    <p style={{ lineHeight: '1.8' }}>
                        瞬時に分割処理が実行され、画面下に個別のスタンプ画像が表示されます。
                        問題なければ「ZIPファイルをダウンロード」ボタンを押してください。
                        必要なファイル（連番画像、main.png、tab.png）がすべて入った圧縮フォルダが保存されます。
                    </p>
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>トラブルシューティング (FAQ)</h2>

                <details style={{ marginBottom: '1rem', border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
                    <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>Q. ZIPファイルがダウンロードされません</summary>
                    <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                        ブラウザのポップアップブロック機能が作動している可能性があります。
                        アドレスバーにブロック通知が出ていないか確認し、許可してください。
                        また、iPhone/iPadの場合は「ファイル」アプリの「ダウンロード」フォルダをご確認ください。
                    </p>
                </details>

                <details style={{ marginBottom: '1rem', border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
                    <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>Q. 画像が真っ黒になります（透過されない）</summary>
                    <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                        お使いのペイントソフトで「背景レイヤー」を非表示にし、「背景透過PNG」として書き出しているか確認してください。
                        JPG形式で保存すると透過情報は失われ白または黒の背景がつきます。
                        必ず「PNG形式」で用意することをお勧めします。
                    </p>
                </details>

                <details style={{ marginBottom: '1rem', border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
                    <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>Q. 分割位置がズレてしまいます</summary>
                    <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                        原稿画像のサイズが均等割り付けになっていない可能性があります。
                        例えば8個（横4×縦2）の場合、全体の幅が4の倍数、高さが2の倍数になるようにキャンバス設定してください。
                        また、各イラストがグリッドの中央に配置されているか確認してください。
                    </p>
                </details>

                <details style={{ marginBottom: '1rem', border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
                    <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>Q. サーバーに画像は保存されますか？</summary>
                    <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                        いいえ、一切保存されません。
                        当ツールはブラウザ上のJavaScript（Canvas API）で画像処理を行っており、
                        お客様の画像データが外部サーバーに送信されることはありません。
                        セキュリティ面でも安心してご利用いただけます。
                    </p>
                </details>
            </section>
        </div>
    );
}
