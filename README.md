# Takazono.Ojt.Web

React/TypeScript 未経験者向けの学習教材プロジェクト「Takazono.Ojt」のフロントエンドです。バックエンドは `src/Takazono.Ojt.WebApi`。

実案件プロジェクト `Takazono.Olive` の構成・設計思想を踏襲しつつ、業務仕様は「多店舗小売業の店舗・商品・在庫管理システム」という架空の題材に置き換えています。

## 前提環境

- Windows
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- SQL Server LocalDB(Visual Studio または [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads) に付属)
- Node.js 20 以上 / npm
- `dotnet-ef` CLI(未インストールの場合: `dotnet tool install --global dotnet-ef`)

## セットアップ(ローカルDBで動かす)

### 1. バックエンド(Takazono.Ojt.WebApi)

```bash
cd src/Takazono.Ojt.WebApi
dotnet ef database update   # LocalDBにマイグレーションを適用(DB自動作成)
dotnet run
```

- API: `http://localhost:4211`(Swagger UI: `http://localhost:4211/swagger`)
- 接続文字列は `appsettings.Development.json` に直書き(LocalDB, DB名: `TakazonoOjt`)。追加のシークレット設定は不要です。
- 開発環境では起動時に `DevSeeder` が最低限のサンプルデータ(店舗・取引先・得意先・ユーザー)を自動投入します。テーブルが空の場合のみ投入するため、既存データを上書きすることはありません。

### 2. フロントエンド(Takazono.Ojt.Web)

別ターミナルで:

```bash
cd src/Takazono.Ojt.Web
npm install
npm run dev
```

- 画面: `http://localhost:4210`

### ログイン(開発用シードユーザー)

| ユーザー名 | パスワード      | 権限   |
| ---------- | --------------- | ------ |
| `admin`    | `Admin#12345`   | 管理者 |
| `general`  | `General#12345` | 一般   |

### バックエンドのAPIを変更した場合

`Controllers`/`Dtos` を変更したら、バックエンドを起動した状態でフロント側の型・APIクライアント(`src/api`)を再生成します。

```bash
npm run api
```

## 主なnpmスクリプト

| コマンド            | 内容                                       |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | 開発サーバー起動                           |
| `npm run build`     | 型チェック + 本番ビルド                    |
| `npm run lint`      | ESLint + Prettier チェック                 |
| `npm run fix`       | ESLint + Prettier 自動修正                 |
| `npm run storybook` | Storybook起動(atoms/molecules層のカタログ) |
| `npm run api`       | aspidaでAPIクライアントを再生成            |

## Takazono.Oliveとの代表的な相違点

- **バックエンド構成**: Oliveのクリーンアーキテクチャ(Domain/Application.Port/Application/Infrastructure/Controller/WebApiのマルチプロジェクト＋MediatR/CQRS)を、単一プロジェクトの `Controller → Service → EF Core` という3層構成に簡略化。
- **リポジトリ構成**: Oliveのマルチリポジトリ＋Git submodule(`takazono.core`)構成をやめ、フロント/バックエンドを単一リポジトリに同居。
- **認証・権限**: Oliveの本格的な権限マトリクス(4階層の`useKengen`)ではなく、自前JWT発行＋Admin/Generalの2ロールに簡略化。
- **DB**: 本番相当のSQL Serverではなく、開発機のSQL Server LocalDBで完結させる構成。
- **i18n**: Oliveでは未完成だった「Takazono.Physalis.Web方式(コード管理CSV＋`useLocalizationLabels`)」を土台に、実際に動く言語切替とen翻訳を完成させている。
- **フォームバリデーション**: Oliveの自前`useValidation`フック(react-hook-formのoptionベース)ではなく、react-hook-form + Zodによるスキーマバリデーションを採用。
