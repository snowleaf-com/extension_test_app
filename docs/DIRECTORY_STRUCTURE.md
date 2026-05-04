# ディレクトリ構成

`extension_test_app`（ブラウザ拡張まわりの検証・MVP）の **現状** と、`docs/MVP_SPEC.md` に沿った **目標構成** をまとめる。

---

## 現状（リポジトリルート）

```text
ブラウザ拡張app/                    # リポジトリルート（workspace）
├── .gitignore
└── docs/
    ├── DIRECTORY_STRUCTURE.md    # 本ファイル
    └── MVP_SPEC.md               # 技術・プロダクト方針
```

---

## 目標構成（モノレポ想定）

pnpm / npm workspaces などで `packages/*` を束ねる前提の例。

```text
ブラウザ拡張app/
├── .gitignore
├── docs/
│   ├── DIRECTORY_STRUCTURE.md
│   └── MVP_SPEC.md
├── package.json                  # 後続：workspaces 定義
├── pnpm-workspace.yaml           # pnpm 採用時
├── packages/
│   ├── creator-extension/        # WXT + React + TS（編集者向け）
│   ├── viewer-extension/         # WXT（検証・実行用）
│   └── shared-types/
└── supabase/                     # 任意：CLI・migrations
```

`packages/` 以下の各パッケージは、WXT 生成の `entrypoints/`・`wxt.config.ts` などは初期化後に追加される。

---

## 各パッケージの役割

| パス | 役割 |
|------|------|
| `packages/creator-extension` | ルール一覧・要素選択・イベント設定・保存（popup + content） |
| `packages/viewer-extension` | 定義取得・DOM 監視・発火検知・ログ送信。将来 `viewer-embed` とロジック共有可能 |
| `packages/shared-types` | Creator / Viewer / 将来の埋め込み SDK で共有する型 |
| `supabase/` | DB スキーマをコード管理する場合。未使用なら作らない |

---

## メモ

- **Creator と Viewer を別拡張 ID** にすると、Chrome に「編集用」「検証用」と並べてロードしやすい。
- 埋め込み SDK を後から足す場合も、**監視・ペイロード組み立ては shared に寄せる**と差し替えが楽。
