# Nanobanana Pro

**Nanobanana Pro** は、LINEクリエイターズマーケットのガイドラインに厳密に準拠したLINEスタンプを作成するための、特化型 Next.js Webアプリケーションです。
ブラウザ上で画像処理（分割・リサイズ・フォーマット変換）を完結させ、誰でも簡単にスタンプセットを作成できます。

## デザインコンセプト: Pop & Cute (Banana Style)

当初のエンジニアリングライクなUIからピボットし、現在はクリエイターの創造性を刺激する**Pop & Cute**なデザインを採用しています。

*   **世界観**: 「日曜日の朝のような」明るさと親しみやすさ。
*   **配色**: Banana Yellow (`#F7E017`) と LINE Green (`#06C755`) を基調としたビタミンカラー（※UIコンポーネント実装時は、アクセシビリティ確保のためスキル側で定義された `#05A545` を優先適用可）。
*   **タイポグラフィ**: `Zen Maru Gothic` を全面採用し、丸みのある優しい印象に（※本プロジェクトではシステムフォントを厳格に禁止）。
*   **UIスキル**: `pop_cute_ui_craft` を本プロジェクトの優先スキルとして適用（`human_ui_craft` の規定を上書き）。

## プロジェクト概要

*   **ゴール:** LINEクリエイターのための「画像ペースト -> 自動分割・リサイズ -> ZIP出力」というワークフローを自動化すること。
*   **コア技術:** Next.js (App Router), React, HTML5 Canvas API.
*   **収益化:** Google AdSense (Approved & Integrated).
*   **主要ライブラリ:** `jszip` (ZIP圧縮), `file-saver` (ファイル保存).
*   **処理方式:** 画像操作（分割、リサイズの、クロマキー処理）はすべて Canvas API を使用してブラウザ上で完結します。

## アーキテクチャと構造

*   **`app/`**: Next.js App Router のページとレイアウト。
    *   `page.js`: トップページ (Hero -> Workflow -> HowTo -> Tool -> FAQ の順で構成)。
    *   `contact/page.js`: お問い合わせフォームページ。
    *   `sitemap.js`: `sitemap.xml` を生成。
    *   `robots.js`: `robots.txt` を生成。
    *   `manifest.js`: `manifest.webmanifest` を生成。
    *   `globals.css`: グローバルスタイル (変数定義、リセットCSS)。
        *   ※ `pop_cute_ui_craft` で定義された変数を実装。
*   **`components/`**: 再利用可能な UI コンポーネント。
    *   `HeroSection.js`: トップのMVエリア（ドットパターン背景）。
    *   `WorkflowGuide.js`: 視覚的なステップバイステップガイド。
    *   `ToolSection.js`: メインのスタンプ作成ツール部分（カード型UI）。
    *   `StickerGrid.js`: 処理済みスタンプのグリッド表示（市松模様背景）。
    *   `FaqSection.js`: Q&A リスト（アコーディオン）。
    *   `ContactSection.js`: Googleフォームの埋め込み。
*   **`utils/`**: UI に依存しないコアロジック。
    *   `imageProcessor.js`: 画像処理の頭脳 (Split, Resize, Compliance, Chroma Key)。

## 主な機能

1.  **スマート分割 (Smart Split)**: 画像をポンッと置くだけで、自動的にグリッド分割します。
2.  **厳格な準拠 (Strict Compliance)**:
    *   最大サイズ: W370 x H320 px.
    *   余白: 上下左右に約10pxの透過余白を自動追加。
    *   寸法: 幅と高さを強制的に偶数ピクセルに調整。
3.  **自動生成 (Auto-Generation)**: 必須画像である `main.png` と `tab.png` も自動生成。
4.  **ZIPエクスポート**: すべてのファイルを1つのZIPにまとめて出力。

## ビルドと実行

### 前提条件
*   Node.js (LTS 推奨)
*   npm
*   Cloudflare Wrangler (デプロイ用)

### コマンド一覧

*   **開発サーバーの起動:** `npm run dev`
*   **本番用ビルド:** `npm run build`
*   **デプロイ:** `npm run deploy` (Cloudflare Pages)

## 開発規約

*   **スタイリング**:
    *   CSS Modules を使用。
    *   **Pop & Cute UI Craft** ルールに従うこと（角丸16px以上、システムフォント禁止、黄色背景に白文字禁止など）。
*   **状態管理**: React `useState` / `useEffect` によるシンプル構成。

## ドキュメント参照

*   **`README.md`**: クイックスタートガイド。
*   **`docs/`**: 詳細ドキュメント（構成図など）。
