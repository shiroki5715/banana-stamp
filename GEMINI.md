# Nanobanana Pro

**Nanobanana Pro** is a specialized Next.js web application for creating LINE Stickers that strictly adhere to LINE Creators Market guidelines. It features client-side image processing to automate splitting, resizing, and formatting.

## Project Overview

*   **Goal:** Automate the "Paste image -> Auto split & resize -> ZIP Export" workflow for LINE Creators.
*   **Core Tech:** Next.js (App Router), React, HTML5 Canvas API.
*   **Key Libraries:** `jszip` (zipping), `file-saver` (saving).
*   **Processing:** All image manipulation (splitting, resizing, chroma key) happens entirely in the browser using the Canvas API.

## Architecture & Structure

*   **`app/`**: Next.js App Router pages and layouts.
    *   `page.js`: Main application logic and UI orchestration.
    *   `globals.css`: Global styles (variables, reset).
*   **`components/`**: Reusable UI components.
    *   `DropZone.js`: Drag-and-drop file upload area.
    *   `StickerGrid.js`: Grid view of processed stickers.
*   **`utils/`**: Core logic independent of UI.
    *   `imageProcessor.js`: The "brain" of the app. Handles:
        *   **Splitting:** Cuts large grid images into individual stickers.
        *   **Resizing:** Fits images into W370xH320 (minus 10px margin) while maintaining aspect ratio.
        *   **Compliance:** Enforces even-numbered dimensions and 10px transparent margins.
        *   **Chroma Key:** Simple background removal (Green, Blue, Magenta, White).
        *   **Watermark Patch:** Heuristic removal of bottom-right watermarks.
*   **`public/`**: Static assets (SVGs, icons).

## Key Features

1.  **Smart Split**: Automatically detects or accepts grid dimensions (e.g., 4x2) to split a single sheet into multiple stickers.
2.  **Strict Compliance**:
    *   Max Size: W370 x H320 px.
    *   Margin: Automatically adds ~10px transparent margin.
    *   Dimensions: Forces even numbers for width and height.
    *   Format: PNG.
3.  **Auto-Generation**: Automatically generates required `main.png` (W240xH240) and `tab.png` (W96xH74) from the first sticker.
4.  **ZIP Export**: Bundles all files (`01.png`, `02.png`..., `main.png`, `tab.png`) into a single ZIP for easy upload.

## Building and Running

### Prerequisites
*   Node.js (LTS recommended)
*   npm
*   Cloudflare Wrangler (for deployment)

### Deployment
*   **Target**: Cloudflare Pages
*   **Project Name**: `banana-stamp`
*   **URL**: `https://banana-stamp.pages.dev/`
*   **Command**: `npx wrangler pages deploy out --project-name banana-stamp`

### Commands

*   **Install Dependencies:**
    ```bash
    npm install
    ```
*   **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access at `http://localhost:3000`.
*   **Build for Production:**
    ```bash
    npm run build
    ```
*   **Start Production Server:**
    ```bash
    npm start
    ```
*   **Lint Code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Styling**: Use **CSS Modules** (`*.module.css`) for component-level styling to avoid conflicts. Use `globals.css` only for variables and resets.
*   **State Management**: Use React `useState` and `useEffect` for local state. For complex global state, keep it simple (prop drilling is currently sufficient given the scope).
*   **Image Processing**: 
    *   Keep logic in `utils/imageProcessor.js`.
    *   Use `Promise`s for async Canvas operations.
    *   Avoid blocking the main thread where possible (though current implementation is sync/promise-based on main thread).
*   **Filenames**: Adhere to LINE's naming convention (`01.png`, `main.png`, `tab.png`) in the export logic.

## Documentation References

*   **`README.md`**: Quick start guide.
*   **`REQUIREMENTS.md`**: Detailed product requirements and specs.
