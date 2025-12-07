"use client";

import { useState, useCallback } from "react";
import styles from "./DropZone.module.css";

export default function DropZone({ onFileSelect }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelect]);

    const handleChange = useCallback((e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    }, [onFileSelect]);

    return (
        <div
            className={`${styles.dropzone} ${isDragging ? styles.active : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="fileInput"
                className={styles.input}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleChange}
            />
            <label htmlFor="fileInput" className={styles.label}>
                <div className={styles.icon}>📁</div>
                <p className={styles.text}>
                    画像をここにドラッグ＆ドロップ<br />
                    <span className={styles.subtext}>またはクリックして選択</span>
                </p>
            </label>
        </div>
    );
}
