import { describe, it } from 'node:test';
import assert from 'node:assert';
import { suggestGrid } from '../utils/imageProcessor.js';

describe('Logic Test: suggestGrid', () => {
    it('should suggest 4x2 or 2x4 for 2:1 ratio (8 stickers)', () => {
        // Width 800, Height 400 -> Ratio 2.0
        // Expected candidate: { cols: 4, rows: 2, count: 8, ratio: 2.0 }
        const result = suggestGrid(800, 400);
        assert.strictEqual(result.cols, 4);
        assert.strictEqual(result.rows, 2);
        assert.strictEqual(result.count, 8);
    });

    it('should suggest 4x4 for 1:1 ratio (16 stickers)', () => {
        // Width 400, Height 400 -> Ratio 1.0
        const result = suggestGrid(400, 400);
        assert.strictEqual(result.cols, 4);
        assert.strictEqual(result.rows, 4);
        assert.strictEqual(result.count, 16);
    });

    it('should suggest 4x10 for tall images (40 stickers)', () => {
        // Width 400, Height 1000 -> Ratio 0.4
        const result = suggestGrid(400, 1000);
        assert.strictEqual(result.cols, 4);
        assert.strictEqual(result.rows, 10);
        assert.strictEqual(result.count, 40);
    });
});
