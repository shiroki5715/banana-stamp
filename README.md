# Nanobanana Pro

**Nanobanana Pro** is a smart, web-based tool for creating LINE Stickers that strictly adhere to LINE Creators Market guidelines.

## Features
- **Smart Split**: Automatically splits a large user-defined grid (e.g., 4x2) into individual stickers.
- **Auto-Resize**: Resizes images to meet the max W370 x H320 requirement while maintaining aspect ratio and even-numbered dimensions.
- **Compliance**: Automatically adds the required 10px transparent margin.
- **ZIP Export**: Generates a ZIP file containing numbered stickers (`01.png`, etc.) and correctly sized `main.png` (240x240) and `tab.png` (96x74).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

The application is deployed at: **[https://banana-stamp.com](https://banana-stamp.com)**

## Documentation
For detailed requirements and technical structure, see [REQUIREMENTS.md](./REQUIREMENTS.md).
