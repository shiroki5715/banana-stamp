"use client";

import styles from "./FaqSection.module.css";
import { useState } from "react";

export default function FaqSection() {
    const faqs = [
        { q: "アップロードした画像はサーバーに保存されますか？", a: "いいえ、保存されません。すべての画像処理（分割・リサイズ・加工）はお使いのブラウザ内（JavaScript）で完結しています。画像データが外部サーバーに送信されることは原則ありません。" },
        { q: "完全無料ですか？", a: "はい、完全無料でご利用いただけます。課金機能もありません。" },
        { q: "生成されるファイルの形式は？", a: "LINEスタンプの規定に合わせたPNG形式です。個別のスタンプ画像（01.png, 02.png...）に加え、申請に必要な main.png と tab.png も自動生成されます。" },
        { q: "「透かし除去」とは何ですか？", a: "無料の画像加工アプリなどで作成した際に右下に入るロゴ（ウォーターマーク）を、簡易的に認識して除去する機能です。完全ではありませんが、審査に通るレベルまで修正できる場合があります。" },
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
                <span className={styles.qText}>{q}</span>
                <span className={styles.icon}>{isOpen ? '−' : '＋'}</span>
            </button>
            <div className={styles.answer} style={{ maxHeight: isOpen ? '200px' : '0' }}>
                <p className={styles.answerText}>{a}</p>
            </div>
        </div>
    );
}
