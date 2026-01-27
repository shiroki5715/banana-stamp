# Nanobanana Pro

**Nanobanana Pro** は、LINEクリエイターズマーケットのガイドラインに厳密に準拠したLINEスタンプを作成するための、特化型 Next.js Webアプリケーションです。クライアントサイドでの画像処理により、分割、リサイズ、フォーマット変換を自動化します。

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
*   **`components/`**: 再利用可能な UI コンポーネント。
    *   `HeroSection.js`: トップのMV（メインビジュアル）エリア。
    *   `WorkflowGuide.js`: [NEW] 視覚的なステップバイステップガイド (SVG/CSS)。
    *   `HowToStep.js`: テキストベースの手順説明。
    *   `ToolSection.js`: メインのスタンプ作成ツール部分。
    *   `StickerGrid.js`: 処理済みスタンプのグリッド表示。
    *   `FaqSection.js`: Q&A リスト。
    *   `ContactSection.js`: Googleフォームの埋め込み。
*   **`utils/`**: UI に依存しないコアロジック。
    *   `imageProcessor.js`: アプリの「頭脳」。以下を処理します：
        *   **分割 (Splitting):** 大きなグリッド画像を個別のスタンプ画像にカット。
        *   **リサイズ (Resizing):** 画像を W370xH320 (マイナス10pxの余白) に収まるように調整。
        *   **準拠チェック (Compliance):** 幅と高さを偶数に強制し、10pxの透過余白を自動付与。
        *   **クロマキー (Chroma Key):** シンプルな背景削除機能。
*   **`public/`**: 静的アセット (SVG, アイコンなど)。

## 主な機能

1.  **スマート分割 (Smart Split)**: グリッドの寸法（例: 4x2）を自動検出（または指定）し、1枚のシートを複数のスタンプに分割します。
2.  **厳格な準拠 (Strict Compliance)**:
    *   最大サイズ: W370 x H320 px.
    *   余白: 上下左右に約10pxの透過余白を自動追加。
    *   寸法: 幅と高さを強制的に偶数ピクセルに調整。
    *   フォーマット: PNG。
3.  **自動生成 (Auto-Generation)**: 最初のスタンプから必須画像である `main.png` (W240xH240) と `tab.png` (W96xH74) を自動生成します。
4.  **ZIPエクスポート**: すべてのファイル (`01.png`, `02.png`..., `main.png`, `tab.png`) を1つのZIPファイルにまとめて、簡単にアップロードできるようにします。
5.  **SEO & 分析**: 
    *   **Google Analytics**: `next/script` (gtag.js) を通じて統合済み。
    *   **Search Console**: HTMLファイル (`public/google....html`) および Metaタグで確認済み。
    *   **メタデータ**: 動的サイトマップ、Robots.txt、および厳密な OGP/Twitter Card タグ。

## ビルドと実行

### 前提条件
*   Node.js (LTS 推奨)
*   npm
*   Cloudflare Wrangler (デプロイ用)

### デプロイ
*   **ターゲット**: Cloudflare Pages
*   **プロジェクト名**: `banana-stamp`
*   **本番 URL**: `https://banana-stamp.com/`
*   **コマンド**: `npm run deploy` (内部で build + wrangler deploy を実行)

### コマンド一覧

*   **依存関係のインストール:**
    ```bash
    npm install
    ```
*   **開発サーバーの起動:**
    ```bash
    npm run dev
    ```
    `http://localhost:3000` でアクセスできます。
*   **本番用ビルド:**
    ```bash
    npm run build
    ```
*   **本番サーバーの起動（ローカル確認用）:**
    ```bash
    npm start
    ```
*   **コードのLintチェック:**
    ```bash
    npm run lint
    ```
*   **デプロイ:**
    ```bash
    npm run deploy
    ```

## 開発規約

*   **スタイリング**: コンポーネントレベルのスタイリングには **CSS Modules** (`*.module.css`) を使用し、競合を避けてください。`globals.css` は変数定義とリセットのみに使用します。
*   **状態管理**: ローカルな状態には React の `useState` と `useEffect` を使用します。複雑なグローバル状態が必要な場合でも、現状のスコープではシンプルに保ちます（現在はPropsのバケツリレーで十分です）。
*   **画像処理**: 
    *   ロジックは `utils/imageProcessor.js` に集約してください。
    *   非同期の Canvas 操作には `Promise` を使用してください。
    *   可能な限りメインスレッドをブロックしないようにしてください（現在の実装はメインスレッドでの同期/Promiseベースですが）。
*   **ファイル名**: エクスポートロジックにおいては、LINEの命名規則 (`01.png`, `main.png`, `tab.png`) を遵守してください。

## ドキュメント参照

*   **`README.md`**: クイックスタートガイド。
*   **`REQUIREMENTS.md`**: 詳細な製品要件定義書。
