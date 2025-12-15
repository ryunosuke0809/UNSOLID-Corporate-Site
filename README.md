# UNSOLID Inc. Corporate Website

モータースポーツとテクノロジーを核とする **株式会社アンソリッド（UNSOLID Inc.）** のコーポレートサイトです。Apple/Metaを意識したナチュラルで先進的なデザインを基調に、トップページでは会社の基本情報のみを提示し、各事業ドメインやコーポレート情報は専用ページで深堀りできる構成へ刷新しました。

**所在地:** 〒336-0932 埼玉県さいたま市緑区中尾1654-11

## プロジェクト概要とゴール
- UNSOLID Inc. の4事業（映像技術、ITソリューション、レーシングパーツ販売、ペット事業）を明確に整理し、コーポレート視点で紹介
- トップページはヒーロー・事業概要・会社紹介・コンタクト誘導のシンプル構成
- 事業別ディテール／会社概要／実績／ビジョン・ミッション／お問い合わせを日英それぞれ個別ページで展開
- ハンバーガーメニュー搭載のレスポンシブナビゲーションと、滑らかなスクロール／フェードアニメーション

## ディレクトリ構成
```
UNSOLID-website/
├── index.html                # ルート（JPへリダイレクト）
├── style.css                 # 共通スタイル
├── script.js                 # 共通スクリプト（フェード・スクロール・ハンバーガー・フォーム）
├── README.md
├── jp/
│   ├── index.html            # トップ（JP）
│   ├── video-tech.html       # 映像技術（iZCast）
│   ├── it.html               # ITソリューション（公式アプリ / デジタル開発）
│   ├── oil.html              # レーシングパーツ販売（RAGNO 2ストロークオイル）
│   ├── pet.html              # ペット事業（ONE BRUSH）
│   ├── about.html            # 会社概要
│   ├── achievements.html     # 事業実績
│   ├── vision.html           # ビジョン & ミッション
│   └── contact.html          # お問い合わせフォーム
└── en/
    ├── index.html            # Top page (EN)
    ├── video-tech.html       # Video Technology / iZCast
    ├── it.html               # IT Solutions (official apps / digital platforms)
    ├── oil.html              # Racing Parts Sales (RAGNO lubricants)
    ├── pet.html              # Pet Business (ONE BRUSH)
    ├── about.html            # Company Profile
    ├── achievements.html     # Business Achievements
    ├── vision.html           # Vision & Mission
    └── contact.html          # Contact Form
```

## エントリ URI 一覧
| パス | 言語 | 役割 |
| --- | --- | --- |
| `/index.html` | - | 自動で `/jp/index.html` へリダイレクト |
| `/jp/index.html` | JP | トップページ（基本情報） |
| `/jp/video-tech.html` | JP | 映像技術（iZCast）詳細 |
| `/jp/it.html` | JP | ITソリューション（公式アプリ／配信基盤） |
| `/jp/oil.html` | JP | レーシングパーツ販売（RAGNO）詳細 |
| `/jp/pet.html` | JP | ペット事業（ONE BRUSH）詳細 |
| `/jp/about.html` | JP | 会社概要 |
| `/jp/achievements.html` | JP | 事業実績 |
| `/jp/vision.html` | JP | ビジョン・ミッション |
| `/jp/contact.html` | JP | お問い合わせフォーム |
| `/en/index.html` | EN | Top page |
| `/en/video-tech.html` | EN | Video Technology (iZCast) |
| `/en/it.html` | EN | IT Solutions (official app / streaming) |
| `/en/oil.html` | EN | Racing Parts Sales (RAGNO lubricants) |
| `/en/pet.html` | EN | Pet Business (ONE BRUSH) |
| `/en/about.html` | EN | Company Profile |
| `/en/achievements.html` | EN | Business Achievements |
| `/en/vision.html` | EN | Vision & Mission |
| `/en/contact.html` | EN | Contact Form |

## 完了済み機能
- トップページの再設計（ヒーロー／4事業概要／会社紹介リンク／CTA のみ）
- 4つの事業専用ページ（JP/EN）にて詳細ストーリー・サービス・ユースケースを掲載
- 会社概要／事業実績／ビジョン＆ミッション／お問い合わせのコーポレートページを日英で整備
- ヘッダーを「会社概要」「事業紹介」「問い合わせ」の3項目に整理し、プルダウンに「概要・実績・ビジョン」「映像技術・IT・レーシングパーツ販売・ペット事業」を配置
- モバイル用ハンバーガーメニューとオーバーレイ、デスクトップ用フローティングヘッダー
- Intersection Observer を利用したセクションフェードイン、スムーズスクロール
- Contactページにフォーム（`method="POST" action="send.php"`）を実装し、JavaScriptで簡易バリデーションとサンクスメッセージを表示
- ダークからMeta風のナチュラルパレットに刷新（背景 #fafafa / #f5f5f5、文字 #1c1e21、アクセント #0066ff・#00d4ff・#ff1744）

## デザイン & UI ハイライト
- Apple/Meta を意識したホワイトベースのグラスモーフィックヘッダーと大きな余白
- グラデーションとシャドウを使った「business-card-modern」カードコンポーネント
- 統一されたセクション見出し（eyebrow / title / description）
- フォームカード、バッジ、ボタンなど共通UIパーツをCSS単一ファイルで管理
- レスポンシブブレークポイント：`1024px` / `768px` / `480px`

## 使用技術
- HTML5（セマンティックタグ、日英個別ページ構成）
- CSS3（Flexbox / Grid レイアウト、アニメーション、カスタムプロパティ）
- バニラJavaScript（Intersection Observer、ハンバーガーメニュー、フォーム簡易処理）
- Google Fonts（システムフォントスタック）

## 未実装・保留中の機能
- `send.php` バックエンド実装およびメール通知
- 実写・製品写真、サーキット映像などのビジュアル素材
- 分析・計測基盤（Google Analytics 等）
- Table API / データベースとの連携（現状未利用）
- CMSやニュース更新機能
- 多言語展開（JP/EN以外）

## 推奨次ステップ
1. Publishタブで公開し、社内外レビューへ共有
2. 公式写真・製品ビジュアル・レース画像を追加して訴求力を向上
3. お問い合わせフォームのサーバーサイド処理（`send.php`）とスパム対策を実装
4. 事業実績や導入事例を継続的に更新（年度別リスト化など）
5. 英語版コンテンツのトーン＆マナー最適化、SEOキーワード整備
6. 解析タグ（GA4等）の導入とコールトラッキング

## データモデル / ストレージ
- 現時点で外部ストレージやTable APIの使用はありません。
- フォーム送信はJavaScriptでフロントエンドシミュレーションを行い、「送信済み」メッセージを表示するのみです。実運用ではバックエンドまたは外部フォームサービスの接続が必要です。

## 公開と運用
- 公開は **Publish タブ** から行ってください。ボタン1つでデプロイでき、公開URLが自動で発行されます。
- 公開後はリンク切れやフォーム挙動を再確認し、必要に応じてキャッシュクリアを行ってください。

## メンテナンスのヒント
- 新しい実績やサービス拡張時は該当言語ページ双方を更新
- 事業ロゴや写真などのアセットを `/assets/` ディレクトリに整理予定（現時点では未使用）
- スタイルやスクリプトは単一ファイルなので、変更時は影響範囲を確認のうえ調整
- レスポンシブテスト（iPhone/Android/タブレット/デスクトップ）を定期的に実施

---

© 2025 株式会社アンソリッド / UNSOLID Co., Ltd. – Crafted for clarity, speed, and corporate credibility.
