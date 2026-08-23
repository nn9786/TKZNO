# フロントエンド: Takazono.Oliveとの意図的な差異

対象参照プロジェクト: `Takazono.Olive.Web`（`references/takazono.olive`）
本ドキュメントの位置づけ: `docs/training-material-plan.md` で定めた方針、および実装後の照合作業で確認した、フロントエンド（`src/Takazono.Ojt.Web`）における Olive との差異の一覧。バックエンドは対象外。

差異は以下の2つに分けて記載する。

- **1. 手本実装のパターンに関わる差異**: マスタ画面（`pages/Master`・`organisms/Master/<Entity>`・関連hooks/services）そのものの実装パターンに関する差異。学習者はこのパターンを見本として自分の担当マスタを実装するため、ここでの差異は学習内容に直接影響する。
- **2. その他の意図的な差異**: マスタCRUDパターンの外側（アプリ全体のレイアウト、ツール類、ログイン画面など）にある差異。学習者が模写するマスタ実装パターンそのものには影響しない。

各項目には根拠（`training-material-plan.md`の該当節、または本セッション内での確認・決定事項）を付す。根拠のない項目は「明示決定なし」と記載し、実装から観察された差異であることを示す。

---

## 1. 手本実装のパターンに関わる差異（学習に影響する部分）

### 1.1 atoms層の性質

- **Olive**: `atoms/Mui`配下のコンポーネントは独自propsを持つラッパー（例: `Button`に`csvDownloadFunc`propを追加、`Typography`に`drawerTitle`等の独自variantを追加）。
- **Ojt**: `src/components/atoms/Mui/index.ts`はMUIコンポーネントをそのまま再エクスポートするだけの薄いバレルで、独自ロジック・独自propsを持たない。
- 根拠: `docs/feature/04.storybook-setup.md`に「`components/atoms/Mui` は現状MUIの薄い再エクスポートバレル（プロジェクト固有のラッパーロジックはまだない）」と明記。学習の初期段階では「まずMUIをそのまま使う」体験を優先し、atomsへの独自props設計は将来の発展課題として意図的に残した。

### 1.2 フォームバリデーション方式

- **Olive**: 自前の`useValidation`フック（`react-hook-form`の`register`オプションに正規表現ベースの検証ルールを渡す方式）。
- **Ojt**: Zodスキーマ + `@hookform/resolvers/zod`（`useStoreSchema`等、マスタごとのスキーマ生成フック）。
- 根拠: `training-material-plan.md` §2.1・§4.2「自前の`useValidation`フック(正規表現ベース) → react-hook-form + Zodによるスキーマバリデーションに更新」で明示。現在のベストプラクティスへの意図的な刷新。

### 1.3 国際化(i18n)の完成度・方式

- **Olive**: `react-intl`の`IntlProvider`が`locale="ja"`固定。実質単一言語のメッセージコード整形エンジン。
- **Ojt**: `Takazono.Physalis.Web`方式（コード管理CSV + `useLocalizationLabels`）を土台に、Redux管理の言語state・実際に動く日英切替・en列翻訳を完成させている。
- 根拠: `training-material-plan.md` §2.9で「Physalis方式を土台に完成させる」と明示。Olive/Physalisどちらも未完成だった部分を意図的に完成させた差異。

### 1.4 一覧画面のページング方式

- **Olive**: `PageSize: 999`で実質全件取得し、スクロールで一覧を見せる（サーバーサイドページングなし）。
- **Ojt**: `pageNumber`/`pageSize`によるサーバーサイドページング（`Pagination`コンポーネント、`PagingHelper`）。
- 根拠: 明示決定なし（`training-material-plan.md`にページング方式そのものへの言及はない）。ただし実務的なマスタ画面としてより一般的な設計であり、他の意図的な現代化（Zod、Storybook等）と同じ方向性のため、意図的な置き換えと判断してよい。

### 1.5 検索欄のUXパターン（即時反映 vs 明示送信）

- **Olive**: 「使用中止も表示」トグルの`watch()`変更を`useEffect`で検知し、自動的に再検索する。
- **Ojt**: 検索フォームの明示的な送信（「検索」ボタン押下 or Enter）で検索を実行する。フリーワード・コード等の他の検索条件も同じフォーム送信でまとめて適用される。
- 根拠: 明示決定なし。両者ともUXとして妥当なパターンであり、複数の検索条件をまとめて送信できる分Ojtの方が一般的なマスタ検索UIに近い。意図的というより「Zod/RHF中心の設計にした結果の自然な帰結」に近い差異。

### 1.6 排他制御(競合)の伝え方の実装場所

- **Olive**: `useErrorDialog`の`handleConcurrencyException`が、エラーのinstance種別(`ERROR_TYPE.T_DB_UPDATE_CONCURRENCY_EXCEPTION`)を見て個別に分岐処理する。
- **Ojt**: `useDisplayValidationError`が`errorCode: "CONCURRENCY_CONFLICT"`を検知し、`concurrencyMessage`ステートを介して`ConcurrencyConflictDialog`を表示する、という一本化されたフック+コンポーネントの組み合わせに統一されている。
- 根拠: 明示決定なし。ユーザーに伝わる体験（専用ダイアログで気づかせ、リロードを促す）は同等。実装の置き場所・抽象化の粒度が異なるだけの差異。

### 1.7 一覧→編集時のデータ再取得の置き場所

- **Olive**: `WardListTable`（一覧テーブルのorganism）内で行クリック時に`getWard(sid)`を呼び直し、取得結果を一覧のstateにマージしてから編集ドロワーを開く。
- **Ojt**: `Store.tsx`（ページ本体）の`handleRowClick`で`getStore(item.sid!)`を呼び直し、その結果を`editing`ステートに入れて`StoreEditDrawer`に渡す。ListTable自体はクリックイベントを上に伝播するだけ。
- 根拠: 明示決定なし。「編集前に最新データを再取得する」という振る舞い自体は同じだが、Ojtでは「pages＝ページ本体（薄い）／organisms＝機能実装」という役割分担（`training-material-plan.md` §4.1に明記の踏襲方針）に沿って、データ取得ロジックをページ側に寄せている。

### 1.8 CSV出力ボタンの実装方式

- **Olive**: `Button`atomに`csvDownloadFunc`という独自propを渡すと、クリック時のダウンロード処理をatom内部で肩代わりする設計。
- **Ojt**: ページ側の`handleDownloadCsv`が`downloadStoresCsv(language)`でBlobを取得し、`downloadFile`ユーティリティでファイル保存する。`Button`には通常の`onClick`を渡すだけ。
- 根拠: 1.1のatoms方針差異に付随する自然な帰結（atomsに独自propsを持たせない方針のため）。明示的な単独決定ではない。

### 1.9 権限制御(`useKengen`)の規模

- **Olive**: 画面パス×操作の巨大な権限マトリクス（4ロール想定）。
- **Ojt**: Admin/General の2ロールのみを対象にした簡易マトリクス（`GENERAL_PERMISSIONS`）。Adminは常に全操作可、Generalは現状どのマスタも参照のみ。
- 根拠: `training-material-plan.md` §2.5「ロールは Admin（全操作可）／General（参照＋一部操作のみ）の2種類のみ」で明示。`useKengen.ts`内のコメントにも同旨の記載あり。

### 1.10 パスワード管理機能の一部省略

- **Olive**: `PasswordResetDialog`に「次回ログイン時、強制的にパスワード変更」(`forcePasswordChangeFlag`)チェックボックスがあり、ログイン設定(`LoginSettingModel`)やパスワード強度設定(`PASSWORD_COMPLEX`: NONE/WEAK/STRONGなど)に応じてバリデーションルールが可変になる。
- **Ojt**: `forcePasswordChangeFlag`相当の概念自体が存在しない。パスワードの検証ルールはZodスキーマで固定。
- 根拠: `training-material-plan.md` §2.5「認証の実装自体は学習対象外」「リフレッシュトークン等は省略」という認証機能全体の簡略化方針の延長として、本セッションで意図的な簡略化として扱うことを確認済み。

---

## 2. その他の意図的な差異（マスタCRUDパターンの外側、学習パターンへの影響が小さい部分）

### 2.1 アプリ全体のレイアウト（サイドバー化）

- **Olive**: （比較調査の対象外。既存プロジェクトのトップレベルナビゲーション構成は本ドキュメントでは未調査）
- **Ojt**: ダッシュボードを起点に、左サイドバーの1項目として「マスタメニュー」を配置する構成に刷新済み。
- 根拠: `docs/feature/01.sidebar-layout-and-mastermenu-redesign.md`。Oliveとの比較を目的とした変更ではなく、「将来の画面追加に耐えるナビゲーション」を目指したOjt独自のUI刷新。

### 2.2 Storybookのバージョン・構成

- **Olive**: Storybook 8系、`@storybook/addon-essentials`を利用。
- **Ojt**: Storybook 10系。v9以降でessentialsの機能がコアに統合されたため、`addon-essentials`は導入せず現行のベストプラクティス構成を採用。
- 根拠: `docs/feature/04.storybook-setup.md`「Olive の古い Storybook 8 セットアップを踏襲するのではなく、現行のベストプラクティスのデフォルト（Storybook 10）を維持した」と明記。

### 2.3 Lint/Format基盤

- 現状はESLint(flat config)+Prettierで、最終的にOliveと同じ構成に揃っている（教材立ち上げ初期は`oxlint`のみを使用していたが、その後移行済み）。現時点でOliveとの差異ではないため参考情報として記載。

### 2.4 テスト基盤の運用状況

- **Olive**: Jestは依存関係として存在するが、実際のテストコードは運用されていない。
- **Ojt**: Vitest + React Testing Libraryを実際に運用する文化として整備する計画だが、本レビュー時点では未着手（依存導入・到達目標とも未定）。
- 根拠: `training-material-plan.md` §2.1・§2.3のロードマップ「#14 テストとStorybook」。現時点では「計画上の差異」であり、実装済みの差異ではない。

### 2.5 ログイン画面のポリシー可変性

- **Olive**: `LoginSettingModel`/`UserSettingModel`により、ログイン方式（パスワードのみ／二要素認証等）やパスワード強度ポリシーが設定で可変。
- **Ojt**: ログイン方式・パスワードポリシーは固定（Zodスキーマに埋め込み）。設定によるポリシー切り替えの概念自体がない。
- 根拠: 1.10と同じく、`training-material-plan.md` §2.5の認証機能簡略化方針に基づく。マスタCRUDパターンそのものではなくログイン画面固有の話のため本セクションに分類。

---

## まとめ

学習に直接影響する差異（§1）は、いずれも「Zod/RHFによるバリデーション」「Physalis方式のi18n完成」「2ロールの権限モデル」「atomsを薄く保つ」という、`training-material-plan.md`で確定した設計方針から一貫して導かれるものであり、場当たり的な差異ではない。§1.4〜1.8（ページング・検索UX・排他制御ダイアログの置き場所・データ再取得の置き場所・CSV呼び出し方式）は個別の意思決定ドキュメントこそないが、いずれも上記の一貫した方針の自然な帰結として説明できる。

§2に分類した差異は、マスタCRUDパターンそのものの外側にあり、学習者が自分の担当マスタを実装する際に模写する対象には含まれない。
