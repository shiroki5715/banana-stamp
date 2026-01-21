"use client";

import styles from "./ShareButton.module.css";

export default function ShareButton() {
    const text = encodeURIComponent(
        "LINEスタンプ用の画像を3秒で作成しました！\n面倒なリサイズ・分割・透過が全部自動で終わる...🍌\n\n#NanobananaPro #LINEスタンプ作成"
    );
    const url = encodeURIComponent("https://banana-stamp.com");
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    return (
        <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェア
        </a>
    );
}
