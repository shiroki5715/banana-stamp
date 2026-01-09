export default function Contact() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', textAlign: 'center' }}>
            <h1>お問い合わせ</h1>
            <p style={{ margin: '2rem 0' }}>
                バナナスタンプに関するご質問、不具合報告などは以下のフォームよりお送りください。
            </p>

            <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <p>Googleフォームへ移動します。</p>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        padding: '1rem 2rem',
                        background: '#4CAF50',
                        color: 'white',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    お問い合わせフォームを開く
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                    ※ GoogleフォームのURLが設定され次第、リンクが有効になります。
                </p>
            </div>
        </div>
    );
}
