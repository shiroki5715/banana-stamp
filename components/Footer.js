import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.links}>
                    <Link href="/guide/requirements" className={styles.link}>画像規定ガイド</Link>
                    <Link href="/guide/howto" className={styles.link}>詳しい使い方</Link>
                    <Link href="/privacy-policy" className={styles.link}>プライバシーポリシー</Link>
                    <Link href="/terms" className={styles.link}>利用規約</Link>
                    <Link href="/contact" className={styles.link}>お問い合わせ</Link>
                </div>
                <p className={styles.copyright}>© 2026 バナナスタンプ (Nanobanana Pro). Optimized for LINE Creators Market.</p>
            </div>
        </footer>
    );
}
