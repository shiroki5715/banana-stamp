export default function PrivacyPolicy() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1>プライバシーポリシー</h1>
            <p style={{ marginTop: '1rem' }}>制定日：2026年1月9日</p>

            <section style={{ marginTop: '3rem' }}>
                <h2>1. 個人情報の利用目的</h2>
                <p>
                    当サイト「バナナスタンプ」（以下、当サイト）では、お問い合わせやサービス利用時に、
                    名前やメールアドレス等の個人情報をご入力いただく場合がございます。
                    取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合にのみ利用させていただくものであり、
                    これらの目的以外では利用いたしません。
                </p>
            </section>

            <section style={{ marginTop: '2rem' }}>
                <h2>2. 広告について</h2>
                <p>
                    当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しており、
                    ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
                    クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、
                    お客様個人を特定できるものではありません。
                </p>
                <p>
                    Cookieを無効にする方法やGoogleアドセンスに関する詳細は
                    <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" style={{ color: '#4a9eff' }}>「広告 – ポリシーと規約 – Google」</a>
                    をご確認ください。
                </p>
            </section>

            <section style={{ marginTop: '2rem' }}>
                <h2>3. アクセス解析ツールについて</h2>
                <p>
                    当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                    このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
                    トラフィックデータは匿名で収集されており、個人を特定するものではありません。
                </p>
            </section>
        </div>
    );
}
