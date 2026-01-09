# Nanobanana Pro - Requirements Definition & Implementation Plan

## Goal
Create a high-quality "GUI Web App" named **Nanobanana Pro** that automates the creation of LINE Stickers. The app will allow users to upload images, automatically split/resize them according to strict LINE guidelines, and export a ready-to-upload ZIP file.

## User Requirements Analysis
- **Core Function**: "Paste image -> Auto split & resize".
- **Concept**: Professional, easy-to-use, "wow" aesthetic.
- **Support**:
    - [x] Standard Stickers (Static) - **Priority 1**
    - [ ] Animation Stickers (APNG) - Future
    - [ ] Theme (Kisekae) - Future
- **Compliance**: Adhere strictly to LINE Creators Market Guidelines.

## Proposed Workflow
1.  **Upload Stage**: User uploads a single large "Sheet" (e.g., a grid of hand-drawn sketches) or selects multiple distinct images.
2.  **Smart Processing**:
    -   **Slicing**: If a sheet is provided, application splits it into N images (grid-based).
    -   **Resizing**: Each image is resized to fit within W370×H320px.
    -   **Margin**: A 10px transparent margin is strictly enforced.
    -   **Rules**: Dimensions must be even numbers. Resolution 72dpi+. Color mode RGB.
    -   **Flexibility**: Supports splitting 4x2 grids (8 stamps) or flexible counts (8, 16, 24, 32, 40).
3.  **Main/Tab Generation**: automatically picks one image (or user selects) to generate `main.png` (W240×H240) and `tab.png` (W96×H74) with correct resizing.
4.  **Preview**: "LINE System Simulator" view to see how stickers look on a chat background.
5.  **Export**: Download a ZIP file containing `01.png`...`08.png`, `main.png`, `tab.png`.

## Technical Architecture
-   **Framework**: Next.js (App Router).
-   **Styling**: Vanilla CSS (CSS Modules) for "Premium" design (Glassmorphism, smooth animations).
-   **Image Logic**: **HTML5 Canvas API**. All processing happens client-side for speed and privacy.
    -   `offscreenCanvas` for background processing.
    -   `JSZip` for bundling files.

## Documentation
- **Project Structure**: Standard Next.js structure.
- **Key Utilities**: `utils/imageProcessor.js` contains the core strict-compliance resizing logic.
