const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/home/nekos/.gemini/antigravity/brain/2b6de8d7-f12c-4bcb-9219-c5e07cf62cd0';
const URL = 'http://localhost:3001';

(async () => {
    const screenshotName = process.argv[2] || 'screenshot.png';
    const outputPath = path.join(ARTIFACT_DIR, screenshotName);

    console.log(`Taking screenshot of ${URL} to ${outputPath}...`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=ja-JP']
    });
    const page = await browser.newPage();

    // Set viewport to a reasonable desktop size
    await page.setViewport({ width: 1280, height: 800 });

    try {
        await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

        // Wait a bit more for any animations or client-side hydration
        await new Promise(r => setTimeout(r, 2000));

        await page.screenshot({ path: outputPath, fullPage: true });
        console.log(`Screenshot saved to ${outputPath}`);
    } catch (err) {
        console.error('Error taking screenshot:', err);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
