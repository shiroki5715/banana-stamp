"use client";

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { sendGTMEvent } from '@next/third-parties/google';
import styles from './ToolSection.module.css';
import DropZone from './DropZone';
import StickerGrid from './StickerGrid';
import { splitImage, processMainOrTab } from '../utils/imageProcessor';

// Presets configuration
const PRESETS = [
    { id: '8', label: '8個', rows: 2, cols: 4 },
    { id: '16', label: '16個', rows: 4, cols: 4 },
    { id: '24', label: '24個', rows: 6, cols: 4 },
    { id: '32', label: '32個', rows: 8, cols: 4 },
    { id: '40', label: '40個', rows: 10, cols: 4 },
];

const ToolSection = () => {
    const [stickers, setStickers] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(PRESETS[1]); // Default 16
    const [bgMode, setBgMode] = useState('none');
    const resultRef = useRef(null);

    // --- Handlers ---
    const handlePresetChange = (preset) => {
        setSelectedPreset(preset);
        setStickers([]);
    };

    const handleFileSelect = async (file) => {
        if (!file) return;

        setIsProcessing(true);
        setStickers([]);
        sendGTMEvent({ event: 'file_upload_start', value: selectedPreset.id });

        try {
            const result = await splitImage(
                file,
                selectedPreset.rows,
                selectedPreset.cols,
                bgMode
            );

            setStickers(result);

            // Auto scroll to results
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

        } catch (error) {
            console.error(error);
            alert('処理中にエラーが発生しました。もう一度お試しください。');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = async () => {
        if (stickers.length === 0) return;

        try {
            const zip = new JSZip();

            stickers.forEach((s, i) => {
                const num = (i + 1).toString().padStart(2, '0');
                zip.file(`${num}.png`, s.blob);
            });

            if (stickers.length > 0) {
                try {
                    const mainImg = await processMainOrTab(stickers[0].blob, 'main');
                    const tabImg = await processMainOrTab(stickers[0].blob, 'tab');
                    zip.file("main.png", mainImg.blob);
                    zip.file("tab.png", tabImg.blob);
                } catch (e) {
                    console.error("Error generating main/tab:", e);
                }
            }

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "line-stickers.zip");
            sendGTMEvent({ event: 'download_zip', value: stickers.length });
        } catch (error) {
            console.error(error);
            alert('ZIP生成中にエラーが発生しました。');
        }
    };

    const handleReset = () => {
        setStickers([]);
        const el = document.getElementById('tool');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="tool" className={styles.section}>
            <div className="container">

                {/* Pop Card Frame */}
                <div className={styles.windowFrame}>

                    {/* Simple Header */}
                    <div className={styles.windowHeader}>
                        <div className={styles.windowTitle}>
                            スタンプ作成・編集
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarGroup}>
                            <span className={styles.label}>スタンプ個数</span>
                            <div className={styles.toggleGroup}>
                                {PRESETS.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => handlePresetChange(p)}
                                        className={`${styles.toggleBtn} ${selectedPreset.id === p.id ? styles.active : ''}`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.toolbarGroup}>
                            <span className={styles.label}>背景処理</span>
                            <div className={styles.toggleGroup}>
                                {[
                                    { id: 'none', label: 'そのまま' },
                                    { id: 'white', label: '白を除去' },
                                    { id: 'green', label: '緑を除去' },
                                ].map(mode => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setBgMode(mode.id)}
                                        className={`${styles.toggleBtn} ${bgMode === mode.id ? styles.active : ''}`}
                                    >
                                        {mode.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Workspace Area */}
                    <div className={styles.workspace}>
                        {stickers.length === 0 ? (
                            <div className={styles.dropAreaContainer}>
                                <DropZone onFileSelect={handleFileSelect} isProcessing={isProcessing} />
                                {isProcessing && (
                                    <div className={styles.processingOverlay}>
                                        <div className={styles.spinner}>🍌</div>
                                        <p style={{ fontWeight: 'bold' }}>作成中...</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={styles.resultsArea} ref={resultRef}>
                                <div className={styles.resultsHeader}>
                                    <h3 className={styles.resultsTitle}>
                                        🎉 {stickers.length}個のスタンプができました！
                                    </h3>
                                    <div className={styles.resultActions}>
                                        <button onClick={handleReset} className="btn-secondary">
                                            はじめから
                                        </button>
                                        <button onClick={handleDownload} className="btn-primary">
                                            ZIPを保存する
                                        </button>
                                    </div>
                                </div>

                                <StickerGrid stickers={stickers} />
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default ToolSection;
