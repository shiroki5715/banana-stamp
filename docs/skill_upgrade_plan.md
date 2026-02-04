# Skill Upgrade Implementation Plan

Codexのフィードバックに基づき、以下の順序でスキルの強化・追加を計画します。

## 🎯 Focus Areas
「機能追加」よりも「品質ガード（Quality Guard）」を優先します。

## 1. Upgrade `review_code` (Priority: Highest)
**目的**: 一般的なレビューではなく、プロジェクト固有のルール（Pop & Cute UI, Next.js Best Practices）を強制する。
**変更内容**:
- `docs/rules.md` (または `GEMINI.md`) を読み込み、それに準拠しているかをチェックするロジックを追加。
- 特に CSS Modules や Accessibility (色は見やすいか) を厳しく見るように指示を調整。

## 2. Create `task-planner-lite` (Priority: High)
**目的**: 「これ作って」の前に「実装計画」を挟むことで、手戻りを防ぐ。
**機能**:
- ユーザーの要望を受け取り、`task.md` の更新案と、変更すべきファイルリストを出力するだけ。
- 実際のコード変更は行わない「軽量」なプランナー。

## 3. Enhance `smart_deploy` (Priority: Medium)
**目的**: 人間のチェックリスト確認ではなく、機械的なゲートでデプロイ可否を判断する。
**変更内容**:
- `npm run lint`, `npm run build`, `npm test` が全て Pass しないとデプロイに進めないようにスクリプトを強化。

## Future Consideration
- **ui-regression-guard**: Playwright導入は工数が大きいため、上記3つが完了した後のネクストステップとします。

---

## 🚀 Next Step
まず **Priority 1: `review_code` のアップグレード** から着手することを推奨します。
