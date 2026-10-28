"use client";

import styles from "./FaqSection.module.css";
import { useState } from "react";

export default function FaqSection() {
    const faqs = [
        { q: "サーバーに画像は保存されますか？", a: "いいえ、保存されません！\nすべての処理はあなたのブラウザの中だけで行われます。\n画像データが外部に送信されることはないので、安心してお使いください。" },
        { q: "本当に無料ですか？", a: "はい、完全無料です！\n今後も課金機能などは予定していません。" },
        { q: "どんなファイルができますか？", a: "LINEスタンプの申請に必要な形式（PNG）で出力されます。\n指定した個数のスタンプと、メイン画像、タブ画像も全部まとめてZIPになります。" },
        { q: "作ったスタンプは売っていいの？", a: "もちろんです！\nこのツールで作ったスタンプは、あなたの著作物として自由に販売できます。" },
    ];

    return (
        <section id="faq" className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>よくある質問</h2>

                <div className={styles.list}>
                    {faqs.map((item, i) => (
                        <Accordion key={i} q={item.q} a={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Accordion({ q, a }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.qMark}>Q.</span>
                <span className={styles.qText}>{q}</span>
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    ▼
                </span>
            </button>
            <div className={styles.answer} style={{ maxHeight: isOpen ? '200px' : '0' }}>
                <p className={styles.answerText}>
                    {a}
                </p>
            </div>
        </div>
    );
}
