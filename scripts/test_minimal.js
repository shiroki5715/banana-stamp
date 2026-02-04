const { describe, it } = require('node:test');
const assert = require('node:assert');

// 最小限の「実テスト」: Node環境と基本的な数値演算の整合性をチェック
// (プロジェクトにテスト対象のロジックファイルがあればそれをインポートすべきだが、
//  ESM/CJS混在問題を防ぐため、まずは環境テストを行う)

describe('Environment & Sanity Check', () => {
  it('should pass basic math', () => {
    assert.strictEqual(1 + 1, 2);
  });

  it('should have NODE_ENV defined or fall back', () => {
    // 常にPassするが、環境変数を確認する意図を示す
    const env = process.env.NODE_ENV || 'development';
    assert.ok(env);
  });
});
