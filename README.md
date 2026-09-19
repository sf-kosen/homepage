# 湘南藤沢高専ホームページ

## ドキュメント
- [AIの使い方](/docs/ai-usage.md)
- [コミットガイド](/docs/commit.md)
- [PRの書き方](/docs/pull-request.md)

## 開発
- `npm install`
- `npm run dev`
- `npm run build`

## 主なページ
- `/events/lt2`: LT会トップページ
- `/events/lt2/register`: 登壇登録
- `/events/lt2/vote/presenter`: 投票ページ

## 編集ポイント
- イベント情報の差し替え: `src/content/lt2Event.ts`
- トップページの各セクション: `src/Components/lt2/`
- デザイン判断の基準: `DESIGN.md`
- 作業ルール: `AGENTS.md`
