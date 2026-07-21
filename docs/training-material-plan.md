# React/TypeScript 学習教材 化計画

対象参照プロジェクト: `D:\olive\takazono.olive`（実案件ソース、Takazono.Olive.Web ほか）
本ドキュメントの位置づけ: `docs/prompt.md` の依頼に対する分析・提案。実装前の計画書。
**更新履歴**: 2026-07-14 時点でのフィードバックを反映し全面更新（決定事項は §6・§7・§8 決定事項ログを参照）。

---

## 0. 参照プロジェクトの分析サマリ

詳細調査の結果、`Takazono.Olive.Web` は以下の構成であることを確認した。

- **フロントエンド**: Vite + React 19 + TypeScript、MUI、Redux Toolkit、react-hook-form、`aspida`（OpenAPIからのAPIクライアント自動生成）、Storybook（atoms/molecules のみ）。テスト基盤（Jest/RTL）は依存関係のみで実際のテストコードは存在しない。
- **`components/pages/Master` の実装パターン**（Ward/Clinic/Doctor などで共通）:
  - `pages/Master/<Entity>.tsx` … ページ本体。検索条件・一覧state・Drawer開閉stateを保持し、`<Base>` テンプレート配下に breadcrumb・ツールバー（CSV出力/表示順変更/新規登録）・`<EntityListTable>`・作成/編集用 `<Drawer>` を配置。
  - `organisms/Master/<Entity>/` … `<Entity>ListTable`（検索結果グリッド、行クリックで編集Drawerを開く）、`<Entity>InformationCreateDrawer`／`UpdateDrawer`（react-hook-form によるフォーム）、`<Entity>DisplayOrderDrawer`（ドラッグ&ドロップ並び替え）から構成。
  - 単純なフラットマスタは Drawer オーバーレイ、親子関係を持つマスタ（Yosei など）は詳細ページ遷移（`/:sid`）というパターンの使い分けがある。
- **状態管理方針**: マスタ一覧・フォームは **Redux を使わずローカル state + react-hook-form** で完結。Redux Toolkit は認証・グローバルローディング/エラーダイアログ・複数画面をまたぐ業務ワークフロー（処方入力など）専用。
- **API層**: `aspida` が OpenAPI 仕様から `src/api` を自動生成 → `services/*Api.tsx` が薄いラッパー関数を提供 → `hooks/useApi.tsx` がローディング/エラーハンドリングを共通化 → コンポーネントから呼び出し。**この一連の流れは教材でもそのまま採用する（後述）。**
- **フォーム**: react-hook-form + 自前の `useValidation` フック。サーバー側バリデーションエラーをフィールドにマッピングする `useDisplayValidationError` という実務的な仕組みがある。
- **デザインシステム**: atoms（MUIの薄いラッパー）→ molecules → organisms → pages という4層構成。
- **i18n（react-intl）**: 依存関係としては存在するが、実態は **単一ロケール（`locale="ja"` 固定）のメッセージ/エラーコード整形エンジンとしての流用**であり、多言語対応は行われていない。なお、姉妹プロジェクト `Takazono.Physalis.Web` には「将来的な多言語化を見据えて設計されたが未完成」の仕組みがあり、Oliveも将来的にほぼ同じ方式を導入する見込みのため、教材はPhysalis方式を土台にする（詳細は §2.9）。
- **バックエンド**: Domain / Application.Port / Application / Infrastructure / Controller / WebApi のクリーンアーキテクチャ＋MediatR（CQRS）＋FluentValidation＋AutoMapper。マスタ系CRUDの実体はGit submodule（`_libs/takazono.core`）側にあり、マルチプロジェクト・マルチリポジトリ構成。

---

## 1. システム題材の決定

**案A「多店舗小売業の店舗・商品・在庫管理システム」で確定。**

Ward→店舗、Clinic→取引先、Doctor→スタッフ、SickRoom→売場、Unit→単位、PrescriptionType→商品カテゴリ、Yosei→商品バリエーション（親子データ）といった形で、参照プロジェクトの各マスタパターンとほぼ1:1で対応させながら翻訳できる。マスタ数の目標は「Takazono.Olive程度」（§2.2 の画面構成で具体化）。

---

## 2. 教材全体計画

### 2.1 技術スタック

| 領域 | 採用技術 | 参照プロジェクトとの関係 |
|---|---|---|
| フロントエンド基盤 | React 19 + TypeScript 5.x + Vite | 踏襲 |
| UIライブラリ | MUI (Material UI) v6 | 踏襲 |
| 状態管理（グローバル） | Redux Toolkit（認証・グローバルUI状態のみ） | 踏襲 |
| 状態管理（マスタ一覧/フォーム） | ローカル state + react-hook-form | 踏襲 |
| API通信 | **aspida（OpenAPI自動生成）+ `services/*Api.ts`（薄いラッパー）+ `hooks/useApi.tsx`（ローディング/エラー共通化）** | **踏襲（維持希望のフィードバックに基づき確定）**。当初はTanStack Queryへの刷新も検討したが、参照プロジェクトと同じ実装パターンを教材でも使う方針に統一した |
| フォーム | react-hook-form + Zod（`@hookform/resolvers`） | react-hook-form は踏襲。バリデーションは自前 `useValidation` から型安全なスキーマバリデーション（Zod）へ更新 |
| ルーティング | react-router-dom v6/v7 | 踏襲 |
| 国際化(i18n) | Takazono.Physalis.Web方式（コード管理CSV＋`useLocalizationLabels`フック）を採用し、実際に稼働する日/英切り替えとして完成させる | **Physalis方式を踏襲＋完成**（詳細 §2.9） |
| テスト | Vitest + React Testing Library（導入方針のみ確定、到達目標は後日検討） | 参照プロジェクトは未運用。教材では実際に運用する文化として整備 |
| Storybook | Storybook（atoms/molecules層のみ対象） | 踏襲 |
| Lint/Format | ESLint (flat config) + Prettier + import順序/絶対パスエイリアス等の規約 + `eslint-plugin-jsx-a11y`（`recommended`ルールセットをそのまま適用、個別上書きなし） | 踏襲（a11y含め参照プロジェクトの設定に合わせる） |
| バックエンド | ASP.NET Core Web API（単一プロジェクト）、**.NET 10** | 簡略化（詳細 §2.4）／バージョンは踏襲 |
| ORM | Entity Framework Core（Code First, Migrations） | 踏襲 |
| DB | SQL Server **LocalDB**（開発機はWindows前提、Dockerは使用しない） | 要件通り |
| API仕様 | Swashbuckle（Swagger/OpenAPI自動生成、aspidaの入力元） | 踏襲 |
| 認証 | 自前JWT発行（詳細 §2.5） | 簡略化 |
| CI | GitHub Actions（詳細 §2.7） | 新規導入 |
| リポジトリ構成 | FE(Web)/BE(WebApi)を単一Gitリポジトリに同居（詳細 §2.10） | 踏襲 |

### 2.2 システム構成

#### ディレクトリ構成（フロントエンド）

```
src/
  api/            # aspidaが自動生成するAPIクライアント（手で編集しない）
  assets/         # 画像・SVG
  components/
    atoms/        # MUIの薄いラッパー（Button, TextFieldなど）
    molecules/    # Breadcrumbs, SortableTableCell, ReactHookForm系フィールド等
    organisms/
      Master/     # 機能別実装（1マスタ1フォルダ）
      Common/     # Header, GlobalDialog, GlobalLoadingなど
    templates/    # ページ共通レイアウト(Base)
    pages/
      Master/     # ページ本体（薄い。organismsを組み合わせる）
  constants/
    csv/          # i18nラベルカタログ（ButtonLabel.csv/TermLabel.csv/UnitLabel.csv等、code,jp,en列）＋従来通りのroute定義等
  services/       # 1エンティティ1ファイルのAPI薄ラッパー（apiClient呼び出し）
  hooks/          # useApi（ローディング/エラー共通化）、useValidation、useLocalizationLabels等の汎用フック
  store/          # Redux Toolkit（authSlice, uiSlice ※言語設定もここで管理）
  styles/         # MUIテーマ
  types/          # グローバル型・ambient宣言
  utils/          # 純粋関数ユーティリティ（apiClient.ts 含む）
```

参照プロジェクトの `atoms/molecules/organisms/templates/pages` 階層、および `services/` + `hooks/useApi` によるAPI呼び出しの流儀をそのまま踏襲する。

#### 1マスタ分の実装イメージ（「店舗マスタ」の例）

```
components/pages/Master/Store.tsx                     # ページ本体
components/organisms/Master/Store/
  index.tsx
  StoreListTable.tsx                                   # 検索結果一覧
  StoreCreateDrawer.tsx                                 # 新規登録フォーム
  StoreEditDrawer.tsx                                   # 編集フォーム
  StoreDisplayOrderDrawer.tsx                           # 表示順変更（ドラッグ&ドロップ）
services/storeApi.ts                                    # apiClient.v2.Store.* の薄いラッパー
interfaces/storeApi.ts                                  # リクエスト/レスポンス型（生成型から派生）
```

#### 画面構成・マスタ一覧（初期スコープ、全14マスタ）

「Takazono.Olive程度のマスタ数」という目標に合わせ、参照プロジェクトの `pages/Master` 配下（Clinic/Comment/Doctor/Institution/PrescriptionChemical/PrescriptionType/SickRoom/Unit/User/Ward/Yosei/Youhou 系＝実質12〜14エンティティ）と同等の規模になるよう、案Aのドメインで以下14マスタを設計する。難易度が段階的に上がるよう並べてある。

| # | マスタ名 | 参照プロジェクトの対応 | 特徴・学習ポイント |
|---|---|---|---|
| 1 | 単位マスタ（個/箱/ケース等） | Unit | 最もシンプルな区分値マスタ。最初の練習台 |
| 2 | 税区分マスタ | （kubun系全般が対応） | シンプルなkubunマスタ第2弾 |
| 3 | **店舗マスタ**（手本実装） | Ward | CRUD＋表示順変更まで含むフル装備の「手本」 |
| 4 | 売場/部門マスタ | SickRoom | 店舗を参照する子マスタ（外部キー選択） |
| 5 | 役割（ロール）マスタ | User権限区分 | 権限制御の土台。数種類の固定ロール |
| 6 | スタッフ（担当者）マスタ | Doctor/User | 役割・所属店舗を参照。権限による表示制御の対象第一号 |
| 7 | 取引先（仕入先）マスタ | Institution | 一覧項目が多め、CSV出力機能を追加 |
| 8 | 得意先マスタ（法人顧客） | Clinic | 取引先と似た構造の類似マスタ（自主演習向け） |
| 9 | 商品カテゴリマスタ | PrescriptionType | 階層構造（親カテゴリ参照）を持つ発展形 |
| 10 | 商品マスタ | Yosei | カテゴリ/取引先/単位/税区分を参照する複合マスタ |
| 11 | 商品バリエーション（規格・色・サイズ）マスタ | Yosei配下の子データ、YoseiDetail | 商品に紐づく親子データ＋詳細ページ遷移パターン |
| 12 | 倉庫/保管場所マスタ | Youhou系 | 店舗に紐づく参照マスタ、応用パターンの反復 |
| 13 | お知らせ/コメントマスタ | Comment | シンプルなCRUD＋公開期間などの条件項目 |
| 14 | システム設定マスタ（キー・バリュー） | System/Youhou系 | 管理者専用の設定画面。権限制御の総仕上げ |

このうち **#3 店舗マスタが「手本実装」**（AIコーディング＋レビュー済みの正解実装）、**#1・#2・#8・#13 あたりを初期の自主演習**、**#9〜#12 を応用演習（関連マスタ・親子データ・権限制御）** として位置づける。共通レイアウト・ログイン画面・マスタメニューは別途用意する。

#### 共通部品構成

参照プロジェクトの4層（atoms/molecules/organisms/templates）をそのまま採用。atoms（Button種別プロパティ等）、molecules（Breadcrumbs、SortableTableHeaderCell、ReactHookForm用フィールド）、organisms/Common（Header、GlobalLoading、GlobalErrorDialog）、templates（Base）を最初期に整備し、以降すべてのマスタ画面から再利用させる。

#### API設計方針

- `Search`（GET, 一覧検索）/ `Get/{id}`（GET）/ `Create`（POST）/ `Update`（PUT）/ `Delete`（DELETE）/ `UpdateDisplayOrder`（PUT）という動詞ベースの命名で統一し、`services/<entity>Api.ts` の関数名と1:1対応させる。
- 一覧用の軽量モデルと詳細用モデルを分ける。
- Swaggerからaspidaでフロント型を生成し、型の二重管理を避ける。

### 2.3 学習ロードマップ

前提スキル: 「JS基礎の学習教材を1ヶ月程度学習した」レベルを想定。想定期間: **2〜3ヶ月**。

| ステップ | 期間目安 | 学ぶ内容 | 作成する画面/成果物 |
|---|---|---|---|
| 0. 環境構築 | 2〜3日 | Node/Git/VSCode、LocalDB、リポジトリ構成の理解、CI（lint/build）の存在確認 | 開発環境一式、`dotnet ef database update` |
| 1. React/TS基礎 | 1週間 | コンポーネント/props/state/hooks、TSの型・interface | API接続なしの簡易UI |
| 2. ルーティング/レイアウト | 3〜4日 | react-router-dom、共通レイアウト、パンくず | アプリ外枠、サイドメニュー |
| 3. UIライブラリとデザインシステム | 1週間 | MUI、atoms/molecules設計、Storybook入門 | 共通部品一式、Storybookカタログ |
| 4. API連携の基礎 | 3〜4日 | Swagger、aspida生成クライアント、`services/`層、`useApi`フック | マスタ#1（単位）の一覧表示（読み取り専用） |
| 5. フォームとバリデーション | 1週間 | react-hook-form + Zod、Drawer/Dialog | マスタ#1の新規登録 |
| 6. 更新・削除 | 1週間 | 更新/削除、確認ダイアログ、一覧再取得 | マスタ#1・#2 のCRUD完成 |
| 7. 検索・ソート・ページング・表示順 | 1週間 | 検索条件、ソート、表示順D&D | **マスタ#3（店舗）＝手本実装として完成** |
| 8. グローバル状態管理 | 1週間 | Redux Toolkit（認証・ローディング/エラー） | ログイン画面、共通ローディング/エラーダイアログ |
| 9. 国際化(i18n) | 3〜4日 | Physalis方式（コードベースCSVラベルカタログ＋`useLocalizationLabels`フック）、言語stateのRedux管理、実際に動く言語切替 | 言語切替UI、既存画面の文言のi18n化 |
| 10. 演習1（自主実装・基本） | 1〜1.5週間 | ここまでの内容の再現 | マスタ#4・#5・#8・#13 を手本を見ながら自力実装 |
| 11. 応用パターンA（関連マスタ） | 1週間 | 他マスタ参照（Select）、CSV出力 | マスタ#6・#7 |
| 12. 応用パターンB（親子データ） | 1〜1.5週間 | 階層構造、親子データ、詳細ページ遷移パターン | マスタ#9・#10・#11 |
| 13. 権限制御 | 1週間 | ロールベースの表示制御（簡易版useKengen） | マスタ#14、既存マスタへの権限適用 |
| 14. テストとStorybook | 1週間 | Vitest/RTLでの単体テスト、Storybook拡充 | atoms/molecules/一部organismsのテスト |
| 15. 演習2（総合課題） | 1〜2週間 | 要件定義〜実装までの一通りの再現 | マスタ#12 または追加マスタをゼロから設計・実装 |

合計でおよそ9〜11週間となり、想定期間（2〜3ヶ月）に収まる設計とした。バッファは演習のつまずきやレビュー待ちに充てる想定。

### 2.4 バックエンド詳細設計（単一プロジェクト構成）

クリーンアーキテクチャの多層・マルチリポジトリは廃止し、**Controller → Service → EF Core** の薄い3層に統合する。エンティティ数が14と多いため、レイヤー別フォルダを基本としつつ、DTOなど1エンティティあたり複数ファイルになるものだけエンティティ名でサブフォルダ化する（レイヤー内が肥大化しすぎるのを防ぐハイブリッド構成）。

```
Takazono.Ojt.WebApi/
  Controllers/
    StoreController.cs
    ProductController.cs
    ...                          # 1エンティティ1ファイル、フラットでOK（14個程度なら見通せる）
  Services/
    IStoreService.cs
    StoreService.cs
    ...                          # インターフェース+実装のペアをエンティティごとに
  Entities/
    Store.cs
    Product.cs
    ...
  Dtos/
    Store/
      StoreDto.cs
      SearchStoreRequest.cs
      CreateStoreRequest.cs
      UpdateStoreRequest.cs
    Product/
      ...
  Data/
    AppDbContext.cs
    Migrations/
    Seed/
      DevSeeder.cs               # §2.6
  Auth/
    JwtTokenService.cs
    AuthController.cs
  Common/
    BaseEntity.cs
    PagedResult.cs
    ApiExceptionMiddleware.cs
  Program.cs
  appsettings.json
  appsettings.Development.json
```

- MediatR（CQRS）、ドメインイベント、AutoMapperは初期スコープでは省略。Controllerがサービスを直接呼び、DTOマッピングは手書き（`ToDto()`拡張メソッド程度）に留める。中級編で選択的に導入を検討する余地は残す。
- FluentValidationも初期は使わず、DataAnnotations＋シンプルな手書きチェックで十分。バリデーションの学習の主眼はフロント（Zod）側に置く。
- ルーティングは `api/v1/[controller]/[action]` 形式で、フロントの `services/*Api.ts` と対応させる（参照プロジェクトの命名慣習は踏襲しつつ、教材は最初のバージョンなので`v1`から開始する）。
- 接続文字列等は `dotnet user-secrets` は使わず、**`appsettings.Development.json` に直書き**する。個人リポジトリ＋関係者限定招待という運用（⑥）であればリスクは小さいため、シンプルさを優先する。
- **Controller-based API** を採用する（Minimal APIは使わない）。Takazono.Core/Oliveと同じ流儀であり、教材としても「ルーティング属性＋アクションメソッド」という明示的な構造の方が学習しやすい。
- **マイグレーションの適用は手動**とする。`Program.cs`での自動`Database.Migrate()`は行わず、学習者自身が`dotnet ef database update`を都度実行する運用にする（マイグレーションの仕組み自体を体感させる狙い）。
- **パッケージマネージャはnpmで固定**（Olive/Physalisと同じ）。yarn/pnpmへ変更する積極的理由はないため。
- **Swagger UIでJWT認証を試せるようにする**。Swashbuckleの`AddSecurityDefinition("Bearer", ...)` + `AddSecurityRequirement(...)`を設定し、Swagger UI右上の「Authorize」ボタンからトークンを入力してそのまま認証付きAPIを叩けるようにする（`POST /api/v1/Auth/Login`でトークンを取得→Authorizeへ貼り付け、という導線を教材の初期ステップで教える）。

#### 2.4.1 .NETバージョン

Takazono.Olive／`takazono.core`は現在ほぼ全プロジェクトが **`net10.0`** に統一されている（テスト用プロジェクトの一部のみ`net8.0`/`net6.0`が残存）。.NET 10は偶数バージョン＝**LTS（長期サポート版）でありながら2025年11月にリリースされた最新版**でもあるため、「Nodeのように最新を追いたいが移行コストは避けたい」というご要望と「安定性」がどちらも同時に満たせる。**.NET 10を採用する**（参照プロジェクトと完全一致するため、実務転用の観点でも好都合）。`global.json`は参照プロジェクトにも存在しないため、教材でも導入せず、ローカルにインストールされたSDKに委ねる方針を踏襲する。

#### 2.4.2 エンティティ・DB設計規約（Takazono.Core の型・命名の雰囲気を踏襲）

「Takazono.Core（takazono.oliveのサブモジュール）のデータ型や命名雰囲気に倣う」というご要望に基づき、以下をそのまま採用する。

- **主キー**: `Sid`（`long`型）。DB側はIDENTITY列で自動採番（Takazono.Coreは`seed: 2000, increment: 1`。教材では`seed: 1`で十分）。
- **共通基底クラス `BaseEntity`**: 全エンティティ共通で以下を持たせる。
  - `Sid`（PK）
  - `Version`（`byte[]`、EF Coreの行バージョン/楽観的排他制御用トークン）
  - `CreatedDateTime` / `CreatedSid` / `CreatedName`（作成日時・作成者）
  - `ModifiedDateTime` / `ModifiedSid` / `ModifiedName`（更新日時・更新者）
  - Takazono.CoreにあるMediatRドメインイベント用のプロパティ群は、MediatR/CQRSを採用しない教材では省略する。
- **論理削除は `IsDeleted` ではなく `UseFlag`（`bool`）** を使う。Takazono.Core全体で`IsDeleted`/`DeletedAt`は一切使われておらず、有効/無効を表す`UseFlag`で統一されている。教材の全マスタもこれに合わせる。
- **表示順**: `DisplayOrderNumber`（プレーンな`int`、一意制約なし）。並び替えはDB制約ではなく専用の更新エンドポイント（`UpdateDisplayOrder`）で管理する。
- **カラム命名**: C#プロパティはPascalCase、SQL列名は明示的な`HasColumnName(...)`によるFluent APIで**snake_case**に変換する（例: `UseFlag`→`use_flag`、`CreatedDateTime`→`created_date_time`）。テーブル名はマスタ系を`m_`プレフィックス（例: `m_store`, `m_product`）で統一する。
- **区分値（Kubun）**: 専用のルックアップテーブルは作らず、**`enum : byte`をそのままDBカラムに格納**し、`[Description]`属性で表示ラベルの元ネタを持たせる（実際の日英ラベルは§2.9のCSVカタログ側で管理し、enumの`[Description]`は開発者向けのコメント的役割に留める）。
- **マイグレーション**: EF Core標準の`yyyyMMddHHmmss_Name.cs`命名をそのまま使用（特別なルールは設けない）。

#### 2.4.3 API共通レスポンス形式（Takazono.Core/Oliveを踏襲）

- **envelope（success/dataでの包装）は使わない**。Controllerは`Ok(model)`のようにモデルをそのまま返す（Takazono.Coreの`WardController`と同じ）。
- **一覧検索のページング**は共通の`PagedResult<T>`（Takazono.Coreの`SearchModel<TModel>`相当）でラップする。フィールドは `Items` / `PageNumber` / `PageSize` / `TotalCount` / `TotalPages` / `SortKey` / `SortDirection` / `HasPreviousPage` / `HasNextPage` を踏襲する。
- **エラーハンドリング**は共通の例外フィルタ（`ApiExceptionMiddleware`）で`ProblemDetails`/`ValidationProblemDetails`に変換する。ステータスコードはTakazono.Coreの分類を簡略化して踏襲する: 400（バリデーション）／401（認証）／404（未検出）／409（更新競合・参照整合性違反など、Takazono.Coreの520/521/522相当をまとめる。独自の5xxコードは教材では標準外で分かりにくいため採用しない）／500（想定外エラー）。
  - **1点だけ意図的にTakazono.Coreと変える**: Takazono.Coreは未処理例外を`ObjectResult(exception)`として**生の例外情報をそのまま500ボディに返す**実装になっているが、これは本番運用では情報漏えいリスクがあるため、教材では「詳細はサーバーログに出力し、レスポンスは定型のサニタイズ済みメッセージのみ返す」という改善版で教える（参照プロジェクトからの意図的な逸脱として明記）。

### 2.5 認証方式（簡素化版）

認証の実装自体は学習対象外という方針のため、最小構成にする。

- **ASP.NET Core Identityは使わない**。Identityは独自のユーザー/ロールテーブルスキーマ、`UserManager`/`SignInManager`、Cookie前提の既定挙動など、学習目的に対して過剰な複雑さを持ち込むため。
- 自前の `Users` テーブル（Id / UserName / PasswordHash / Role）を用意し、`PasswordHasher<T>`（ASP.NET Core標準ライブラリ、Identity本体は不要）でハッシュ化。
- `POST /api/auth/login` で認証し、JWT（HS256、`appsettings.json` の対称鍵）を発行。クレームは `sub`（ユーザーID）と `role` のみ。
- **リフレッシュトークンは実装しない**。学習用途で長時間の連続セッションは想定しにくいため、有効期限を8〜12時間程度に設定し、切れたら再ログインする方式で十分。
- ロールは **Admin（全操作可）／General（参照＋一部操作のみ）の2種類のみ**。`useKengen`相当の権限制御を学ぶには十分な最小構成。
- 開発用に2〜3件のテストユーザーをシードしておき、会員登録画面は用意しない（将来の発展課題候補にはなる）。

### 2.6 開発用サンプルデータ（Seeder）

「開発ができる最低限のデータ」を毎回自分で手入力させるのは非効率なため、Seederを用意する方針とする。

- **固定・不変な区分値マスタ**（単位、税区分、ロールなど）は EF Core Migration の `HasData` で投入する。マイグレーション適用と同時に必ず存在する状態にする。
- **業務的なサンプルデータ**（店舗数件、カテゴリ十数件、商品数十件、取引先・スタッフ数件など）は `Data/Seed/DevSeeder.cs` のような専用クラスを用意し、`Program.cs` 起動時に `env.IsDevelopment()` かつ対象テーブルが空の場合のみ投入する（学習者が編集・削除した後に毎回リセットされないよう、冪等な「空なら入れる」方式にする）。
- 量は最小限（各マスタ数件〜数十件程度）にとどめ、検索/ソート/ページングの動作確認ができる程度で十分。実データらしさより「動く」ことを優先する。
- 必要に応じて `dotnet run --seed-reset` のような開発専用コマンド、またはDevelopment環境限定の `POST /api/dev/reset-seed` エンドポイントを用意し、演習をやり直したい学習者が任意にデータをリセットできるようにすると親切（任意対応）。
- **命名について**: 「具体的な世界観・命名」というのは実装で使う画面文言（i18nラベル）のことではなく、この**Seederが投入するサンプルデータの内容**（店舗名・商品名・取引先名など）を指す。実在の企業・ブランドを想起させない、テストデータとして自然な名称（例:「サンプル店舗A」「テスト商店」寄りの、それっぽい架空名）であれば十分で、精緻な世界観設計は不要という認識で確定する。

### 2.7 CI（GitHub Actions）

lint/test/buildの自動化を導入する。個人リポジトリ＋関係者限定招待という運用なので、まずは軽量な構成から始めて問題ない。

- **フロントエンド**: `npm ci` → `npm run lint` → `npm run build`（テスト整備後は `npm run test` も追加）
- **バックエンド**: `dotnet restore` → `dotnet build` → （テスト整備後は `dotnet test`）
- トリガーは `pull_request` と `main` への push。ステップ0（環境構築）の直後、まだテストが無い段階から **lint + build のみのCI** を先に導入し、「最初からCIが通る状態を保つ」体験を教材の初期から持たせることを推奨する。テストを書くステップ（#14）でジョブにテスト実行を追加する。

```yaml
# .github/workflows/ci.yml（イメージ）
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  frontend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: frontend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
  backend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: backend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with: { dotnet-version: '10.0.x' }
      - run: dotnet restore
      - run: dotnet build --no-restore
```

（SQL ServerはCI上ではLocalDBが使えないため、バックエンドのビルドのみをCI対象とし、DBアクセスを伴う統合テストはローカル実行前提とする。後日、テスト方針確定時にコンテナDBを使ったCI統合テストの要否を再検討する。）

### 2.8 デザイン方針（Figma等の要否）

初期スコープ（マスタCRUD画面群）については **Figma等の正式なデザインカンプは用意しない方針を推奨する**。理由:

- 学習目的はReact/TypeScriptの実装力であり、ビジュアルデザインの精度は評価軸ではない。
- MUIの既定テーマ＋最小限のデザイントークン（`styles/theme.ts` の配色・余白・タイポグラフィ）を最初に決めておけば、画面ごとに都度デザインしなくても一定の統一感が出る。
- 参照プロジェクトのスクリーンショットを「レイアウトの大まかな参考」として手本実装者に渡す程度で十分（一覧＋検索＋Drawerという構造さえ揃えれば、細かい見た目は実装しながら決めて問題ない）。

一方で、将来拡張（§5）で想定しているダッシュボード/レポート画面のように、情報設計そのものに学習価値がある画面を追加する場合は、その時点で軽量なワイヤーフレーム（Figmaでなくても手書き/Excalidraw等で可）を用意することを推奨する。初期スコープでFigma運用を導入するコストに見合うリターンは薄いため、必要になった段階で個別導入する方が良い。最終判断は運用側に委ねる。

### 2.9 国際化（i18n）方針

#### 2.9.1 現状調査：Takazono.Olive と Takazono.Physalis.Web の比較

**Takazono.Olive（前回調査分）**: `react-intl` は依存関係のみで、`IntlProvider` が `locale="ja"` 固定。エラー/警告/案内メッセージを `useMessage()` フック経由で `constants/csv/errorCsv.csv` 等から参照する、単一言語のメッセージコード整形エンジンとしての流用に留まる。バックエンド（共有サブモジュール `takazono.core`）には `.resx` の日英ペアによる実働ローカライズ機構があるが、culture決定がサーバーのOSカルチャー設定に依存しており、個人単位の切り替えができない設計上の欠陥を持つ。

**Takazono.Physalis.Web（今回追加調査）**: `D:\physalis\takazono.physalis\src\Takazono.Physalis.Web` を調査した結果、Oliveより一段進んだ、**「将来の多言語化に向けて設計されたが未完成」の仕組み**が見つかった。これが「Oliveも将来ほぼ同じものを導入する見込み」というご指摘の根拠と考えられる。

- **2系統のi18n機構が併存**している。
  1. **システムメッセージ系**（Oliveと同一パターン）: `react-intl` の `IntlProvider`（`App.tsx:23`、`locale="ja"` 固定）＋ `useMessage()` フックが、CSVから作った `CSV_DEFINITION` を参照してエラー/警告/案内メッセージを整形する。
  2. **UIラベル系**（Physalis独自・こちらが本命）: `useLocalizationLabels(language: 'jp' | 'en')` という自前フックが、`constants/csv/ButtonLabel.csv`（387行）・`TermLabel.csv`（1,772行）・`UnitLabel.csv`（28行）という**「コード, 日本語, 英語」の3列CSV**を読み込み、`getLabel(code, vars?)` でラベル文字列を返す。**454ファイル・約5,230箇所**で使われており、Olive/Physalisの中では例外的に広く浸透した仕組み。呼び出し側は必ず日本語コメントを添える規約（`getLabel('B0034') // 薬品使用量集計`）。
- **ただし実態は「未完成」**: 3列CSVの `en` 列は**全行が空欄**（実データ0件）。`IntlProvider` の `locale` も `'ja'` 固定。さらに `useLocalizationLabels` の呼び出し側では、**61ファイルに渡って** `const localLang: 'jp' | 'en' = 'jp' //ゆくゆく設定ができたら取得して表示`（＝「いずれ設定機能ができたら取得する」という意味のコメント付き）という**ハードコードが丸ごとコピペ**されている。つまり「コードは"将来の言語切替"を前提に書かれているが、言語切替機能自体もen翻訳も一度も実装されていない」状態。
- 社内ドキュメント（`AGENTS.md`, `code-review-guide.md`）には「静的文言は `useLocalizationLabels` 経由にすること」というレビュー基準が明文化されており、**会社としてこの方式を今後の標準にしたい意図が読み取れる**（`csvIndex.ts:20` のコメント `ToDo Oliveの方針が決まるまでanyで` からも、Olive側の対応方針待ちであることが伺える）。

#### 2.9.2 教材での方針：Physalis方式を土台に「完成させる」

ご要望の通り、教材はゼロから別方式（前回案のreact-intl＋JSONカタログ）を作るのではなく、**Physalis方式（コード管理CSV＋`useLocalizationLabels`）をそのまま踏襲**する。Oliveが将来同じ方式を導入するなら、教材で先にこのパターンを習得させておく方が実務転用価値が高いため。ただし、Physalis自体が「未完成」なので、教材では**そのTODOを実際に完成させる**形にする。

- **カタログ構成はPhysalisを踏襲**: `constants/csv/` 配下に `ButtonLabel.csv` / `TermLabel.csv` / `UnitLabel.csv` 相当（教材ドメインに合わせて命名）を `code,jp,en` の3列で用意する。**Physalisと違い `en` 列は実際に翻訳を入れて完成させる**。システムメッセージ（エラー/警告/案内）は従来通り `react-intl` の `IntlProvider` ＋ `useMessage()` で扱う（Olive/Physalisと同じ二系統構成を維持し、両方を学習させる）。
- **言語切替を実際に完成させる**: Physalisが `//ゆくゆく設定ができたら取得して表示` とコメントしたまま放置していた部分を実装する。
  - 言語選択状態は Redux Toolkit の `uiSlice`（または新設の `settingSlice`）に `language: 'jp' | 'en'` として持たせ、`redux-persist` の対象に含めて再訪問時も保持する（Olive/Physalis双方が使っているRedux Toolkit + redux-persistの基盤をそのまま活用）。
  - `useLocalizationLabels()` は引数で `language` を受け取る現行シグネチャをやめ、内部で `useAppSelector(state => state.ui.language)` を読む形に変更する（＝Physalisの各呼び出し箇所に61箇所も分散していた `const localLang = 'jp'` のハードコードを、グローバルstate1箇所の参照に置き換える）。
  - ヘッダーに ja/en の切替UI（トグルボタン or セレクト）を設置し、`dispatch(setLanguage('en'))` するだけで即時に全画面へ反映されることを確認させる（リロード不要な即時反映がねらい）。
  - `IntlProvider` の `locale` も同じRedux state から取得するよう修正し、システムメッセージ系・UIラベル系の両方が同じ言語設定に連動するようにする（Physalis/Oliveでは両者が独立していて事実上どちらも`ja`固定だった箇所）。
- **バックエンドは言語判定に関与させない**。UI文言・システムメッセージともにフロントの静的カタログで完結させる。将来的にAPIが返す文言まで多言語化する必要が生じた場合は、Oliveの「サーバーOSカルチャー依存」ではなく、リクエスト単位の `Accept-Language` を解釈する方式を推奨する（変更なし、前回の指摘を維持）。
- **型安全性の強化（任意・推奨）**: Physalis/Oliveとも `getLabel(code: string)` / `formatMessage({id: string})` は素の`string`引数で、コード誤字がコンパイル時に検出できない。教材では小さなビルドスクリプトでCSVヘッダーからコードのUnion型（例: `type LabelCode = 'B0001' | 'T0001' | ...`）を生成し、`getLabel`引数を型付けする改善を**選択的に**盛り込むことを推奨する。あくまで任意の上乗せであり、Physalis規約からの逸脱ではなく「Physalisが本来目指していたが手が回らなかった仕上げ」という位置づけ。
- 学習ステップは #9（ロードマップ参照、Physalis方式の再現として）に配置し、「共通レイアウト完成後・自主演習前」というタイミングで実施する（以降のマスタ画面はすべて最初から `getLabel()` 経由で文言を書かせる）。

#### 2.9.3 Physalis方式を採用することの注意点

- **CSVの手書きパースがナイーブ**（Physalisは単純な `split(',')` でカンマ入りの値やクォート処理に対応していない）。教材でも同じ簡易パーサーを再現するか、最小限の堅牢化（クォート対応の簡易CSVパーサー導入）を行うかは判断が必要。学習目的からは「まず同じ簡易実装を体験させ、後の改善演習でパーサーを堅牢化させる」流れが教育的に自然だと考える。
- コードの命名規則（`T0001`＝Term、`B0001`＝Button、`U0001`＝Unit）はPhysalisの命名慣習をそのまま流用し、教材ドメイン用のプレフィックス（例: 店舗管理系なら独自の接頭辞）を決めておく。
- 5,230箇所もの呼び出しという「広く浸透しているが型安全性・ツール支援がない」という実情もセットで教える価値がある（＝実務でよくある「規約はあるが機械的強制がない」状態への向き合い方の学習機会）。

### 2.10 リポジトリ構成

Takazono.Oliveと同様、**FE(Web)/BE(WebApi)を単一のGitリポジトリに同居**させる。参照プロジェクトは `src/` 配下に `Takazono.Olive.Web`（フロントエンド、npmプロジェクト）と `Takazono.Olive.WebApi` 等（バックエンド、.NETプロジェクト）を並べ、リポジトリ直下の `.sln` は.NETプロジェクトのみを束ねる構成になっている。教材でも同じ形を踏襲する。

```
takazono-ojt/                      # リポジトリルート（GitHub個人リポジトリ）
  Takazono.Ojt.slnx                  # .NETプロジェクトのみを束ねる
  src/
    Takazono.Ojt.Web/                # フロントエンド（npmプロジェクト、§2.2のディレクトリ構成）
    Takazono.Ojt.WebApi/             # バックエンド（§2.4のディレクトリ構成）
  docs/                             # 教材本文（§2.11）
  .github/workflows/ci.yml         # §2.7
  README.md
```

製品名は **「Takazono.Ojt」** で確定（リポジトリ名は慣例に合わせてケバブケース `takazono-ojt`、ソリューション/プロジェクト名・namespaceは `Takazono.Ojt.Web`/`Takazono.Ojt.WebApi`）。

マルチプロジェクト・Git submodule構成（`_libs/takazono.core`相当）は導入しない（§2.4で述べた通り単一プロジェクトに統合済みのため、そもそも分割する動機がない）。

### 2.11 手本実装・模範解答の運用、教材ドキュメントの形式

- **模範解答の公開タイミングと隠し方は後回しでよい**とのことなので、まずは**14マスタすべてを「完成版」として一通り実装しきる**ことを優先する。実装が固まった段階で、
  1. 完成版全体に `reference-complete` のようなタグ（またはリリースブランチ）を打って保全する。
  2. その後、学習者に自力実装させたいマスタ（§2.2の演習用マスタ）の実装をリポジトリの`main`から間引き、雛形・型定義・空のコンポーネントファイルなど「土台だけ残す」状態に戻す作業を行う。
  3. 間引く粒度（フォルダごと削除するのか、中身だけ空にするのか）は、実際に運用してみてから決める。
  - この手順であれば「今回は後回し」という方針に沿いつつ、後戻りのコストも最小限になる（完成形が先にあるため、間引き作業は差分削除で済む）。
- **教材ドキュメントの形式はREADME中心**で構成する。具体的には、リポジトリ直下の `README.md`（全体像・環境構築手順・目次）を起点に、各学習ステップの説明は `docs/roadmap/01-react-basics.md` のようなステップ別Markdownとして配置し、`README.md`からリンクする形を想定する（Notion/Wiki等の外部ツールは使わず、リポジトリ内で完結させる）。

### 2.12 開発環境のポート・CORS

**訂正（2026-07-14）**: 当初は `launchSettings.json` のみを調べて Olive: Vite `3000` / API `30001`、Physalis: Vite既定`5173` / API `5270` と判断し、フロント`4000`／バックエンド`40001`を選定したが、これは調査不足だった。`launchSettings.json`は実際には使われていない既定値に過ぎず、本当の開発ポートはフロントの`.env`・`aspida.config.js`・axiosの`BASE_URL`・ElectronのCSP（`connect-src`）など**フロントエンドのソースにハードコードされた値**の方に表れていた。改めて両プロジェクトのソース全体（`.env`/`.env.example`/`vite.config.ts`/`aspida.config.js`/`index.html`のCSP/`appsettings.json`のKestrel設定/`.vscode/launch.json`まで）を再調査した結果、以下がいずれかのプロジェクトで実際に使われている・またはハードコードされているポートと判明した。

**使用中と判明した全ポート**: `3000`, `3001`, `4505`(nlogのTCPターゲット、HTTPではないが念のため), `5173`, `5270`, `6006`(Storybook、両プロジェクト共通), `23797`, `24478`, `30001`, `30002`, **`40001`**（Physalisの`apiClientServiceAccount.ts`に`BASE_URL`としてハードコードされ、`index.html`のCSPにも`connect-src`/`ws:`として明記されている実在の値）。

このため、**フロントエンド`4000`／バックエンド`40001`という当初の決定を撤回し、以下に変更する**（`40001`はPhysalisが実際に予約している値だったため）。

- フロントエンド（Vite dev server）: **`http://localhost:4210`**
- バックエンド（ASP.NET Core, Kestrel, http のみ・開発用HTTPS証明書は使わない）: **`http://localhost:4211`**
- 選定理由: 上記の予約済みポート一覧（3000系, 4505, 5173, 6006, 23797-24478, 30001-30002, 40001）は全て回避。加えて `4200`（Angular CLI既定）のような他フレームワークの well-known ポートとも重ならないよう`4210/4211`とした。
- CORS: バックエンドの`Program.cs`で開発用ポリシーを1つ定義し、`http://localhost:4210`からのオリジンのみ許可する（本番相当の環境変数切り替えは初期スコープでは不要）。
- フロント/バックエンドは学習者が**2つのターミナルでそれぞれ起動**する運用でよい（`concurrently`等での一本化は行わない）。
- 実装済みのコード（`vite.config.ts`、`aspida.config.js`、`utils/apiClient.ts`、`Properties/launchSettings.json`、`Program.cs`のCORSポリシー）は全て`4210`/`4211`に修正済み。

### 2.13 バリデーションメッセージのi18n統合、日付/タイムゾーンの扱い

**Zodバリデーションメッセージのi18n統合**: react-hook-form + Zod（§2.1）と、Physalis方式のコード管理カタログ（§2.9）をどう繋ぐかは新規に設計が必要な部分だったため、以下を推奨する。

- Zodスキーマを**コンポーネントの外の定数として固定定義しない**。代わりに、`useLocalizationLabels()`の`getLabel`を使ってメッセージを組み立てる**スキーマ生成フック**（例: `useStoreSchema()`）を各マスタごとに用意し、`useMemo(() => z.object({...}), [language])`で現在の言語が変わるたびに作り直す。
- 汎用的なバリデーション文言（必須・文字数上限など）は、既存の `TermLabel.csv`等とは別に **`ValidationLabel.csv`**（`code,jp,en`、例: `V0001`=「必須項目です」/`Required`）を新設し、`getLabel('V0002', { max: '20' })` のようにPhysalisと同じ`{変数}`置換の仕組みで文字数上限などを埋め込む。
- これにより「文言はすべて`getLabel`経由のカタログに一元化する」というPhysalis方式の思想を、react-hook-form側のバリデーションメッセージにも一貫して適用できる（Olive自体の`useValidation`フックの後継、という位置づけにもなる）。

**日付・タイムゾーンの扱い**: Oliveの実装を確認した結果、実はUTC変換は一切行っておらず、バックエンドは`DateTime.Now`（JSTのローカル時刻）で統一、`date-fns-tz`も「送信時にJSTオフセット文字列へ整形するだけ」の一方向処理であり、実質**JST固定・タイムゾーン変換なし**という設計だった。ご要望通りこれに合わせる。

- バックエンドは`DateTime.UtcNow`を使わず、Oliveと同じ**`DateTime.Now`（JSTのローカル時刻）で統一**する。EF Coreのタイムゾーン変換用ValueConverterなども導入しない。
- 「多言語化はするがタイムゾーン変換はしない」という整理にする。つまり、日英切り替えで変わるのは**日付の表示フォーマットのみ**（例: ja→`2026年7月14日`、en→`Jul 14, 2026`のように`date-fns`のロケール（`ja`/`enUS`）を切り替える）であり、時刻の実体（何時何分か）はどちらの言語で見ても同じJSTの値のまま変わらない。
- Olive同様、フロントからバックエンドへ送信する日付はJSTオフセット付きの文字列に整形して送る（`parseToJstDatetime`相当のユーティリティを踏襲）。

---

## 3. 追加で決めるべき事項（未決定・後回し事項）

以下は今回のフィードバックで「後回しでよい／要検討」とされた項目。実施時期が来たら改めて具体化する。

- **テストの到達目標**（カバレッジ基準、必須テスト範囲）: 実務PJ水準に合わせて後日設定
- **演習の提出・レビュー体制**: 業務状況に応じてレビュー者を後日設定
- **各ステップの理解度確認方法**（チェックリスト、簡易テスト等）: 実務PJ水準に合わせて後日設定
- **Gitブランチ運用・コミット規約**: 実際のPJ運用に合わせて後日検討
- **手本実装・演習マスタの模範解答をいつ・どう間引く/隠すか**: 具体的な粒度は§2.11の手順で実装後に決定

以下は今回の回答で解消済み（参考として記録）。

- 題材: 案A確定
- バックエンド構成、認証方式、Seeder方針: §2.4〜2.6 の通り確定
- 開発環境: Docker不使用・LocalDB使用（開発機はWindows前提）で確定
- 提供形態: GitHub個人リポジトリ＋関係者限定招待で確定
- 前提スキル: JS基礎教材1ヶ月相当で確定
- 教材ボリューム: 2〜3ヶ月、Takazono.Olive相当の14マスタで確定（§2.2、§2.3）
- i18n: 含める方針で確定。Takazono.Physalis.Webのコード管理CSV＋`useLocalizationLabels`方式を土台に、Physalisで未完成だった言語切替・en翻訳を教材側で完成させる方針に確定（§2.9）
- CI: GitHub Actions導入で確定（§2.7）
- デザイン: 初期スコープはFigma等なしで推奨（§2.8、最終判断は運用側）
- 著作権/公開範囲: 個人リポジトリ限定公開、将来的に社内利用を検討（⑥と同様の運用）
- リポジトリ構成: FE/BE単一リポジトリで確定（§2.10）
- .NETバージョン: net10.0で確定（§2.4.1）
- DB/エンティティ設計規約: Takazono.Coreの型・命名慣習（`Sid`/`BaseEntity`/`UseFlag`/snake_caseカラム等）を踏襲で確定（§2.4.2）
- API共通レスポンス形式: Takazono.Core/Oliveのenvelopeなし＋`PagedResult`＋例外フィルタ方式を踏襲（500の生例外返却のみ意図的に改善）で確定（§2.4.3）
- 接続文字列・シークレット管理: `appsettings.Development.json`直書きで確定
- サンプルデータの世界観: UI文言ではなくSeederデータの命名の話であることを確認。「それっぽいテスト名称」で十分と確定（§2.6）
- 教材ドキュメント形式: README中心（+ `docs/roadmap/`のステップ別Markdown）で確定（§2.11）
- アクセシビリティ(a11y) lint: Takazono.Oliveと同じ`eslint-plugin-jsx-a11y`の`recommended`ルールセットをそのまま採用で確定

新たに生じた検討事項:

- Seederのリセット手段（開発用コマンド/エンドポイント）を用意するか否かの最終判断
- i18n対象範囲（全画面を#9以降必須とするか、一部画面は将来対応でよいか）
- i18nの型安全性強化（コードのUnion型自動生成）を教材の必須内容にするか任意の発展課題にするか（§2.9.2 末尾）
- CIにテストを組み込むタイミング（#14到達時に追加、で良いか）
- 模範解答を間引く際の粒度（フォルダごと削除／中身だけ空にする、等）を実装後にどう決めるか（§2.11）

---

## 4. 既存プロジェクトとの比較整理

### 4.1 引き継ぐべき構成・考え方

- atoms → molecules → organisms → templates → pages の4〜5層コンポーネント設計
- 「pages＝ページ本体（薄い）／organisms＝機能実装」という2層の役割分担
- 一覧＋新規登録／編集をDrawer（またはDialog）で完結させるCRUDパターン、および親子関係のあるマスタは詳細ページ遷移パターンという使い分け
- **aspida による自動生成クライアント → `services/` 薄いラッパー → `useApi` フックによる共通ローディング/エラー処理、という一連のAPI呼び出しの流儀**
- barrel（`index.ts`）によるモジュール公開、`@/` エイリアスによる絶対パスインポート（相対パス禁止）
- ルート定義・区分値などの一元管理（`constants/` 的な考え方）
- 共通フックによる横断的関心事の吸収（バリデーションルールの共通化、サーバー側バリデーションエラーのフィールドマッピング）
- 権限に応じた表示制御という考え方自体（規模は縮小、§2.5）
- Storybookはatoms/molecules層にのみ適用するという方針
- ESLint/Prettierによるコーディング規約（named export限定、import順序、関数コンポーネント記法など）
- 「マスタ一覧・フォームはローカルstate、Reduxはグローバル/横断的関心事のみ」という状態管理の役割分担そのもの
- **Takazono.Coreのエンティティ/DB設計慣習**: `Sid`（long, identity）主キー、`BaseEntity`共通監査項目（Created/Modified系＋`Version`による楽観排他）、論理削除は`UseFlag`、PascalCase→snake_caseカラム変換、`m_`テーブルプレフィックス（§2.4.2）
- **Takazono.Core/OliveのAPIレスポンス設計**: envelopeを使わない`Ok(model)`直接返却、一覧検索は`PagedResult`（`SearchModel`相当）でページング情報を返す、例外フィルタによるステータスコード統一（§2.4.3）
- FE/BE単一リポジトリ構成（§2.10）

### 4.2 現在のベストプラクティスへ置き換える部分

- 自前の `useValidation` フック（正規表現ベース） → react-hook-form + Zod によるスキーマバリデーション
- Jest依存のみで未運用のテスト環境 → Vitest + React Testing Library を実際に運用する文化として整備
- OliveのReact-intl単一ロケール固定運用、およびPhysalisの「`en`列が空欄・言語切替が未実装」という中途半端な状態 → 両者が採用しているコード管理CSV＋`useLocalizationLabels`方式そのものは踏襲しつつ、実際に機能する言語切替とen翻訳を完成させる（§2.9）
- lefthookのpre-commitチェックが `|| true` で非ブロッキングになっている点 → 教材では意図的にブロッキングにし、CI（§2.7）でも同等のチェックを強制する
- Takazono.Coreの未処理例外が生の例外情報をそのまま500レスポンスに返す実装 → 詳細はサーバーログのみに出力し、レスポンスは定型のサニタイズ済みメッセージにする（§2.4.3、情報漏えい対策として意図的に改善）

### 4.3 教材向けに簡略化すべき部分

- バックエンドの Domain/Application.Port/Application/Infrastructure/Controller/WebApi というマルチプロジェクト構成、およびGit submoduleによる共通ライブラリ分離 → 単一プロジェクトの Controller → Service → EF Core という3層構成に統合（§2.4）
- MediatR（CQRS）、ドメインイベント、AutoMapper → 初期スコープでは省略
- 巨大なパス×ロールの権限テーブル（`useKengen`） → ロール2種×アクション数種程度の最小構成に縮小（§2.5）
- `kubun`/`constants` の二重管理（区分値↔表示ラベル）は考え方は残しつつ、対象とする区分値の種類を絞る
- ASP.NET Core Identity・リフレッシュトークン・Docker環境配布は不採用（§2.4〜2.5）

---

## 5. 将来的な拡張案（中級者向け・初期スコープ外）

- マスタ管理の先にある業務トランザクション画面（入出庫、発注、棚卸、売上集計など）
- ダッシュボード／レポート画面（グラフ表示、集計API）※このタイミングでワイヤーフレーム/Figma導入を検討（§2.8）
- ファイルアップロード・CSV一括登録
- より高度な権限管理（画面項目単位の制御、ロール管理画面自体の追加）
- E2Eテスト（Playwright）、CI/CDパイプラインの拡張（デプロイまで含める等）
- パフォーマンスチューニング（仮想化リスト、コード分割）
- 通知機能（SignalR等によるリアルタイム更新）
- モバイル対応（レスポンシブ強化、あるいはReact Native等への展開）
- 会員登録・パスワードリセット等、認証機能の拡張（§2.5で省略した範囲）

---

## 6. 決定事項ログ（2026-07-14）

| # | 論点 | 決定内容 |
|---|---|---|
| ① | 題材・サンプルデータ | 案Aで確定。開発用Seederを用意する方針（§2.6） |
| ② | バックエンドのフォルダ分割 | レイヤー別＋DTOのみエンティティ別サブフォルダのハイブリッド構成（§2.4） |
| ③ | 認証方式 | 自前JWT、Identity不使用、リフレッシュトークンなし、ロール2種（§2.5） |
| ④ | 開発環境 | Docker不使用。LocalDBで開発ビルドを動作させる |
| ⑤ | テスト到達目標 | 後日検討（実務PJ水準に合わせる） |
| ⑥ | 提供形態 | GitHub個人リポジトリ、関係者のみ招待 |
| ⑦ | レビュー体制 | 後日検討（業務状況に応じて設定） |
| ⑧ | 前提スキル | JS基礎教材を1ヶ月程度学習したレベル |
| ⑨ | ボリューム・期間 | 2〜3ヶ月、Takazono.Olive相当（14マスタ）を目標（§2.2、§2.3） |
| ⑩ | 理解度確認方法 | 後日検討（実務PJ水準に合わせる） |
| ⑪ | i18n | 含める。Takazono.Physalis.Webの「コード管理CSV＋`useLocalizationLabels`」方式（Oliveも将来導入見込み）を土台に採用。ただしPhysalisは`en`列が空欄・言語切替が未実装という「未完成」状態のため、教材ではen翻訳と実際に動く言語切替（Redux管理）を完成させる（§2.9） |
| ⑫ | CI | GitHub Actions導入。lint/buildから開始し、テスト整備後に拡張（§2.7） |
| ⑬ | デザインカンプ | 初期スコープはFigma等なしを推奨、実装しながら決定（§2.8） |
| ⑭ | 著作権/公開範囲 | ⑥と同様（個人リポジトリ限定）。将来的に社内利用を検討 |
| 他 | API層の方針 | aspida＋`services/`＋`useApi`のパターンを維持（TanStack Queryへの刷新は行わない） |

## 7. 決定事項ログ 追補（2026-07-14・実装着手前の追加論点）

| # | 論点 | 決定内容 |
|---|---|---|
| A | 開発機のOS前提 | Windows前提で確定 |
| B | リポジトリ構成 | Takazono.Olive同様、FE(Web)/BE(WebApi)を単一リポジトリに同居（§2.10） |
| C | 手本実装・模範解答の公開/隠蔽 | 後回し。まず14マスタ全てを完成させ、`reference-complete`タグ等で保全した上で、後日演習用マスタを間引く方式（§2.11） |
| D | 世界観・命名 | UI文言ではなくSeederデータの命名の話と確認。実在ブランドを想起させない「それっぽいテスト名称」で十分（§2.6） |
| E | DB設計方針 | Takazono.Core（サブモジュール）のデータ型・命名慣習（`Sid`/`BaseEntity`/`UseFlag`/snake_caseカラム/`m_`プレフィックス等）を踏襲（§2.4.2） |
| F | .NETバージョン | **net10.0**で確定。.NET 10は偶数バージョン＝LTSでありながら2025年11月リリースの最新版でもあるため、「Nodeのように最新を追いたい」という要望と安定性の両方を満たせ、かつ参照プロジェクトとも一致する（§2.4.1） |
| G | 接続文字列・シークレット管理 | `appsettings.Development.json`に直書きで確定 |
| H | APIレスポンス形式 | Takazono.Core/Oliveの「envelopeなし＋`PagedResult`（`SearchModel`相当）＋例外フィルタ」方式を踏襲。ただし未処理例外を生の例外情報のまま返す部分のみ、サニタイズ済みメッセージに改善（§2.4.3） |
| I | Gitブランチ運用・コミット規約 | 後回し。実際のPJ運用に合わせて後日検討 |
| J | 教材ドキュメント形式 | README中心（`README.md`＋`docs/roadmap/`のステップ別Markdown）で確定（§2.11） |
| K | アクセシビリティ(a11y) lint | Takazono.Oliveと同じ`eslint-plugin-jsx-a11y`の`recommended`ルールをそのまま適用（個別カスタマイズなし） |

## 8. 決定事項ログ 追補2（2026-07-14・着手直前の運用細部）

| # | 論点 | 決定内容 |
|---|---|---|
| L | ASP.NET Core APIの作成方式 | Controller-based API（Minimal APIは不使用）で確定 |
| M | APIバージョニング | `api/v1/...`から開始（Oliveの`v2`表記は機械的踏襲をやめる）で確定（§2.4） |
| N | 開発時ポート・CORS | **訂正**: 当初`4000`/`40001`としたが、`40001`はPhysalisが実際に予約している値だったと判明（launchSettings.jsonだけでなくフロントのハードコード値・CSPまで再調査して発覚）。**フロント`http://localhost:4210`／バックエンド`http://localhost:4211`**に変更し、実装済みコードも修正済み。CORSはこのオリジンのみ許可（§2.12） |
| O | EF Coreマイグレーション適用 | 手動（`dotnet ef database update`）で確定。自動`Database.Migrate()`は使わない |
| P | パッケージマネージャ | npmで固定（yarn/pnpmは不使用） |
| Q | 教材内の製品名 | **「Takazono.Ojt」**で確定。リポジトリ名`takazono-ojt`、プロジェクト/namespace `Takazono.Ojt.Web`/`Takazono.Ojt.WebApi`（§2.10） |
| R | Swagger UIでのJWT認証テスト | 設ける。`AddSecurityDefinition`/`AddSecurityRequirement`でBearer認証を構成し、Login→Authorizeボタンにトークン貼り付け、という導線を用意（§2.4） |
| S | フロント/バックエンド同時起動 | 2ターミナルで個別起動する運用でよい。`concurrently`等の一本化は行わない（§2.12） |
| T | Zodバリデーションメッセージのi18n統合 | `getLabel`ベースのスキーマ生成フック（`useXxxSchema()`、`ValidationLabel.csv`新設）で統合する方式を新規提案（§2.13） |
| U | 日付・タイムゾーンの扱い | Oliveに合わせ、UTC変換は行わず**JST固定**（`DateTime.Now`統一）。多言語化は日付の表示フォーマット（`date-fns`のロケール切替）のみに限定し、時刻の実体は変えない（§2.13） |
