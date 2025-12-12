# Billing App

Rails API と React (Vite) を分けたモノレポ構成の学習用請求書管理アプリです。

## 起動手順概要

1. 2つのターミナルを用意します。
2. backend 側: `cd backend && bundle install && bundle exec rails db:prepare && bundle exec rails db:seed && bundle exec rails s`
3. frontend 側: `cd frontend && npm install && npm run dev`
4. ブラウザで http://localhost:5173 を開き、顧客/請求書の作成と一覧を確認します。

詳細は各ディレクトリの README を参照してください。
