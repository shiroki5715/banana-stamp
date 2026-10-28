"use client";

import styles from "./StickerGrid.module.css";

export default function StickerGrid({ stickers }) {
    if (!stickers || stickers.length === 0) return null;

    return (
        <div className={styles.grid}>
            {stickers.map((sticker, index) => {
                const sizeKB = sticker.blob ? (sticker.blob.size / 1024).toFixed(1) : '0.0';
                return (
                    <div key={index} className={styles.card}>
                        <div className={styles.indexBadge}>No.{index + 1}</div>

                        <div className={styles.imageWrapper}>
                            <img
                                src={sticker.url}
                                alt={`Sticker ${index + 1}`}
                                className={styles.image}
                            />
                        </div>

                        <div className={styles.info}>
                            <div className={styles.row}>
                                <span className={styles.label}>サイズ</span>
                                <span className={styles.value}>{sticker.width}x{sticker.height}</span>
                            </div>
                            <div className={styles.row}>
                                <span className={styles.label}>容量</span>
                                <span className={styles.value}>{sizeKB}KB</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
