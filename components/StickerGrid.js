"use client";

import styles from "./StickerGrid.module.css";
import Image from "next/image";

export default function StickerGrid({ stickers, onDownload }) {
    if (!stickers || stickers.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>プレビュー ({stickers.length}個)</h3>
                <button className={styles.downloadBtn} onClick={onDownload}>
                    ZIPをダウンロード
                </button>
            </div>

            <div className={styles.grid}>
                {stickers.map((sticker, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={sticker.url}
                                alt={`Sticker ${index + 1}`}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.info}>
                            <span>#{index + 1}</span>
                            <span className={styles.dims}>{sticker.width}x{sticker.height}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
