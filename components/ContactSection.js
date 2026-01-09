import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <h2 className={styles.heading}>お問い合わせ / 不具合報告</h2>
                <p className={styles.desc}>
                    ご意見・ご要望・不具合などございましたら、<br className={styles.spBr} />下記フォームよりお気軽にお知らせください。
                </p>

                <div className={styles.formWrapper}>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfXdNAQiT0cXYyRWI9xt83wGUZjVKch7pj-HSmtqJodqaSPmQ/viewform?embedded=true"
                        width="640"
                        height="689"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        className={styles.iframe}
                        title="Contact Form"
                    >
                        読み込んでいます…
                    </iframe>
                </div>
            </div>
        </section>
    );
}
