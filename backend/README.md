# Backend (Rails API)

## セットアップ

1. Ruby 3.3.0 と bundler を用意します。
2. 依存ライブラリをインストールします。

```bash
cd backend
bundle install
bundle exec rails db:prepare
bundle exec rails db:seed
```

## 起動

```bash
bundle exec rails s
```

開発環境では http://localhost:3000 で API が動作します。フロントエンドからの CORS は `http://localhost:5173` を許可しています。

## API エンドポイント

- GET /api/customers
- POST /api/customers
- GET /api/customers/:id
- GET /api/invoices
- POST /api/invoices
- GET /api/invoices/:id
- PATCH /api/invoices/:id
