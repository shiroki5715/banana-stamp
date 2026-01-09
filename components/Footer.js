import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '2rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#888'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link href="/howto" className="hover:underline">使い方ガイド</Link>
                    <Link href="/privacy-policy" className="hover:underline">プライバシーポリシー</Link>
                    <Link href="/terms" className="hover:underline">利用規約</Link>
                    <Link href="/contact" className="hover:underline">お問い合わせ</Link>
                </div>
                <p>© 2026 バナナスタンプ (Nanobanana Pro). Optimized for LINE Creators Market.</p>
            </div>
        </footer>
    );
}
