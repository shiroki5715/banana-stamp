"use client";

import { useState } from "react";
import styles from "./ToolSection.module.css";
import DropZone from "./DropZone";
import StickerGrid from "./StickerGrid";
import { splitImage, processMainOrTab } from "../utils/imageProcessor";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// LINE Standard Presets
const PRESETS = [
    { label: "8個", count: 8, rows: 2, cols: 4 },
    { label: "16個", count: 16, rows: 4, cols: 4 },
    { label: "24個", count: 24, rows: 6, cols: 4 },
    { label: "32個", count: 32, rows: 8, cols: 4 },
    { label: "40個", count: 40, rows: 10, cols: 4 },
];

export default function ToolSection() {
    const [stickers, setStickers] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(4);
    const [selectedPreset, setSelectedPreset] = useState(8); // count

    const [bgMode, setBgMode] = useState('none');
    const [sourceFile, setSourceFile] = useState(null);

    // --- Logic copied from page.js ---
    // --- Logic copied from page.js ---
    const processFile = async (file, r, c, mode) => {
        const currentMode = mode !== undefined ? mode : bgMode;

        setIsProcessing(true);
        try {
            const processed = await splitImage(file, r, c, currentMode);
            setStickers(processed);
        } catch (error) {
            console.error("Processing failed", error);
            alert("処理に失敗しました。画像形式を確認してください。");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileSelect = async (file) => {
        setSourceFile(file);
        await processFile(file, rows, cols, bgMode);
    };

    // Preset Handler
    const handlePresetSelect = async (count) => {
        setSelectedPreset(count);
        if (count === 'custom') return;

        const preset = PRESETS.find(p => p.count === count);
        if (preset) {
            setRows(preset.rows);
            setCols(preset.cols);
            // If file exists, re-process
            if (sourceFile) await processFile(sourceFile, preset.rows, preset.cols, bgMode);
        }
    };

    const handleBgModeChange = async (e) => {
        const newMode = e.target.value;
        setBgMode(newMode);
        if (sourceFile) await processFile(sourceFile, rows, cols, newMode);
    };

    const handleDownload = async () => {
        const zip = new JSZip();
        stickers.forEach((sticker, i) => {
            const num = (i + 1).toString().padStart(2, '0');
            // Remove data:image/png;base64, prefix
            const base64Data = sticker.url.split(',')[1];
            zip.file(`${num}.png`, base64Data, { base64: true });
        });

        if (stickers.length > 0) {
            try {
                const mainImg = await processMainOrTab(stickers[0].url, 'main');
                const tabImg = await processMainOrTab(stickers[0].url, 'tab');
                zip.file("main.png", mainImg.blob);
                zip.file("tab.png", tabImg.blob);
            } catch (e) {
                console.error("Error generating main/tab", e);
            }
        }

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "line_stickers.zip");
    };

    const reset = () => {
        setStickers([]);
        setSourceFile(null);
    };

    return (
        <section id="tool" className={styles.section}>
            <div className="container">

                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.title}>スタンプ作成ツール</h2>
                    <p className={styles.desc}>設定を選んで、画像をドロップするだけ。</p>
                </div>

                <div className={styles.grid}>
                    {/* Left Column: Settings */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.stepBadge}>1</div>
                            <h3>設定</h3>
                        </div>

                        <div className={styles.cardBody}>
                            {/* 1. Count Selector */}
                            <div className={styles.controlGroup}>
                                <label className={styles.label}>スタンプ個数</label>
                                <div className={styles.segments}>
                                    {PRESETS.map(p => (
                                        <button
                                            key={p.count}
                                            className={`${styles.segmentBtn} ${selectedPreset === p.count ? styles.active : ''}`}
                                            onClick={() => handlePresetSelect(p.count)}
                                        >
                                            {p.count}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Options */}
                            <div className={styles.controlGroup}>
                                <label className={styles.label}>背景除去 (クロマキー)</label>
                                <div className={styles.selectWrapper}>
                                    <select value={bgMode} onChange={handleBgModeChange} className={styles.select}>
                                        <option value="none">しない</option>
                                        <option value="white">白除外 (手書き/スキャン)</option>
                                        <option value="green">緑除外 (GB)</option>
                                        <option value="blue">青除外 (BB)</option>
                                        <option value="magenta">マゼンタ除外</option>
                                    </select>
                                </div>
                                <p className={styles.helpText}>※特定の色を透明にします</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Action */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.stepBadge}>2</div>
                            <h3>{stickers.length > 0 ? "ダウンロード" : "アップロード"}</h3>
                        </div>

                        <div className={`${styles.cardBody} ${styles.actionBody}`}>
                            {/* Loading Overlay */}
                            {isProcessing && (
                                <div className={styles.loader}>
                                    <div className={styles.spinner}></div>
                                    <p>Processing...</p>
                                </div>
                            )}

                            {stickers.length > 0 ? (
                                <div className={styles.resultArea}>
                                    <div className={styles.resultHeader}>
                                        <div className={styles.resultInfo}>
                                            <span className={styles.successIcon}>✓</span>
                                            {stickers.length}個 生成完了
                                        </div>
                                    </div>

                                    <div className={styles.previewScroll}>
                                        <StickerGrid stickers={stickers} onDownload={handleDownload} />
                                    </div>

                                    <div className={styles.resultActions}>
                                        <button onClick={handleDownload} className="btn-primary">
                                            ZIPで保存
                                        </button>
                                        <button onClick={reset} className={styles.btnSub}>
                                            やり直す
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.uploadContainer}>
                                    <DropZone onFileSelect={handleFileSelect} />
                                    <div className={styles.notes}>
                                        <p>※ 偶数ピクセルでリサイズされ、LINE用サイズに自動調整されます。</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
