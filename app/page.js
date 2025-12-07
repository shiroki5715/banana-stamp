"use client";

import { useState } from "react";
import styles from "./page.module.css";
import DropZone from "../components/DropZone";
import StickerGrid from "../components/StickerGrid";
import { splitImage, processMainOrTab, getImageDimensions } from "../utils/imageProcessor";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// LINE Standard Presets
const PRESETS = [
  { label: "8個 (推奨)", count: 8, rows: 2, cols: 4 },
  { label: "16個", count: 16, rows: 4, cols: 4 },
  { label: "24個", count: 24, rows: 6, cols: 4 },
  { label: "32個", count: 32, rows: 8, cols: 4 },
  { label: "40個", count: 40, rows: 10, cols: 4 },
];

export default function Home() {
  const [stickers, setStickers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Default to 8 stickers (2 rows x 4 cols is standard for LINE creators studio usually, or 4x2)
  // Actually LINE grid is 4 columns wide in the shop.
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(4);
  const [selectedPreset, setSelectedPreset] = useState(8); // 8, 16... or 'custom'

  const [bgMode, setBgMode] = useState('none'); // 'none', 'white', 'green', 'blue'
  const [shouldRemoveWatermark, setShouldRemoveWatermark] = useState(false);

  const [sourceFile, setSourceFile] = useState(null);

  const processFile = async (file, r, c, mode, wm) => {
    // Allow passing args, fallback to state
    const currentMode = mode !== undefined ? mode : bgMode;
    const currentWm = wm !== undefined ? wm : shouldRemoveWatermark;

    setIsProcessing(true);
    try {
      const processed = await splitImage(file, r, c, currentMode, currentWm);
      setStickers(processed);
    } catch (error) {
      console.error("Processing failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (file) => {
    setSourceFile(file);
    await processFile(file, rows, cols, bgMode, shouldRemoveWatermark);
  };

  const handlePresetChange = async (val) => {
    setSelectedPreset(val);
    if (val === 'custom') return; // Do nothing, keep current rows/cols

    const preset = PRESETS.find(p => p.count === Number(val));
    if (preset) {
      setRows(preset.rows);
      setCols(preset.cols);
      if (sourceFile) await processFile(sourceFile, preset.rows, preset.cols, bgMode, shouldRemoveWatermark);
    }
  };

  const handleCustomGridChange = async (newRows, newCols) => {
    setRows(newRows);
    setCols(newCols);
    setSelectedPreset('custom');
    if (sourceFile) await processFile(sourceFile, newRows, newCols, bgMode, shouldRemoveWatermark);
  };

  const handleBgModeChange = async (e) => {
    const newMode = e.target.value;
    setBgMode(newMode);
    if (sourceFile) await processFile(sourceFile, rows, cols, newMode, shouldRemoveWatermark);
  };

  const handleWatermarkChange = async (e) => {
    const isChecked = e.target.checked;
    setShouldRemoveWatermark(isChecked);
    if (sourceFile) await processFile(sourceFile, rows, cols, bgMode, isChecked);
  };

  const resetApp = () => {
    setStickers([]);
    setSourceFile(null);
    setRows(2);
    setCols(4);
    setSelectedPreset(8);
    setBgMode('none');
    setShouldRemoveWatermark(false);
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    stickers.forEach((sticker, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      zip.file(`${num}.png`, sticker.blob);
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

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} glass`}>
        <div className="container">
          <h1 className={styles.logo} onClick={resetApp} style={{ cursor: 'pointer' }} title="Reset App">
            バナナスタンプ
          </h1>
        </div>
      </header>

      <main className={`${styles.main} container`}>
        <div className={styles.hero}>
          <h2>LINEスタンプ作成を<br /> <span className={styles.highlight}>もっと自由に、もっと素早く</span></h2>
          <p>画像をドロップするだけ。ガイドラインに合わせて自動調整。</p>

          {/* Controls - Always show */}
          <div className={styles.controlsPanel}>
            <div className={styles.controlGroup}>
              <label>スタンプ個数を選択してください</label>
              <select
                value={selectedPreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className={styles.select}
              >
                {PRESETS.map(p => (
                  <option key={p.count} value={p.count}>{p.label}</option>
                ))}
                <option value="custom">カスタム設定</option>
              </select>
            </div>

            {selectedPreset === 'custom' && (
              <div className={styles.customControls}>
                <label>
                  行数 (Rows)
                  <input
                    type="number"
                    value={rows}
                    onChange={e => handleCustomGridChange(Number(e.target.value), cols)}
                    min="1" max="20"
                  />
                </label>
                <label>
                  列数 (Cols)
                  <input
                    type="number"
                    value={cols}
                    onChange={e => handleCustomGridChange(rows, Number(e.target.value))}
                    min="1" max="10"
                  />
                </label>
              </div>
            )}

            <div className={styles.controlGroup} style={{ marginTop: '1rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
              <label>背景除去 (クロマキー)</label>
              <select
                value={bgMode}
                onChange={handleBgModeChange}
                className={styles.select}
              >
                <option value="none">除去しない</option>
                <option value="white">白背景を除去 (手描き/スキャン向)</option>
                <option value="green">緑背景を除去 (Green Screen)</option>
                <option value="blue">青背景を除去 (Blue Screen)</option>
                <option value="magenta">マゼンタ背景を除去 (#FF00FF)</option>
              </select>
            </div>

            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={shouldRemoveWatermark}
                  onChange={handleWatermarkChange}
                />
                透かし（右下のマーク）を除去
              </label>
            </div>
          </div>

          <div className={styles.workspace}>
            {isProcessing ? (
              <div className={styles.loading}>処理中...</div>
            ) : stickers.length > 0 ? (
              <StickerGrid stickers={stickers} onDownload={handleDownload} />
            ) : (
              <DropZone onFileSelect={handleFileSelect} />
            )}
          </div>

          {stickers.length > 0 && (
            <button onClick={() => { setStickers([]); setSourceFile(null); }} className={styles.resetBtn}>
              はじめからやり直す
            </button>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Nanobanana Pro. Optimized for LINE Creators Market.</p>
      </footer>
    </div>
  );
}
