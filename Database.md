# Database Setup Guide

## 前提条件

- Node.js と pnpm がインストールされていること
- Cloudflare アカウントが設定されていること
- wrangler CLI がインストールされていること

## 1. プロジェクト構成の確認

### 必要なファイル
- `prisma/schema.prisma` - Prismaスキーマファイル
- `prisma.config.ts` - PrismaのD1アダプター設定
- `wrangler.jsonc` - Cloudflareの設定ファイル
- `.env` - 環境変数

## 2. D1データベースの作成・確認

### 既存データベースの確認
```bash
npx wrangler d1 list
```

### 新しいデータベースの作成（必要な場合）
```bash
npx wrangler d1 create your-database-name
```

### データベース情報の取得
作成後、以下の情報を記録：
- `database_name`: データベース名
- `database_id`: データベースID（UUID）

## 3. 環境変数の設定

`.env`ファイルに以下を設定：

```env
# Cloudflare D1設定
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_D1_TOKEN="your-api-token"
CLOUDFLARE_DATABASE_ID="your-database-id"

# その他の設定
DATABASE_URL="file:./dev.db"
HOSTING_URL="http://localhost:3000"
```

## 4. wrangler.jsonc の設定

```json
{
  "name": "your-project-name",
  "compatibility_date": "2025-05-15",
  "pages_build_output_dir": "./dist",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "your-database-name",
      "database_id": "your-database-id"
    }
  ]
}
```

## 5. Prismaスキーマの設定

`prisma/schema.prisma`：

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
  output          = "../prisma-client"
}

generator zod {
  provider = "zod-prisma-types"
  output   = "../prisma-client/zod"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

```

## 7. 既存データベースとの同期（Baseline作成）

### 7.1 現在のデータベース状態を確認
```bash
# リモートD1のテーブル確認
npx wrangler d1 execute your-database-name --remote --command="SELECT name FROM sqlite_master WHERE type='table';"

# テーブル構造確認
npx wrangler d1 execute your-database-name --remote --command="PRAGMA table_info(User);"
```

## 8. 設定の検証

### Migration状態の確認
```bash
npx prisma migrate status
```

### データベースの同期
```bash
npx prisma db push
```

### D1データベースの最終確認
```bash
# 全テーブルの確認
npx wrangler d1 execute your-database-name --remote --command="SELECT name FROM sqlite_master WHERE type='table';"

# Migration記録の確認
npx wrangler d1 execute your-database-name --remote --command="SELECT * FROM _prisma_migrations;"
```

### 新しいMigrationの作成
```bash
npx prisma migrate dev --name add_new_field
```

### スキーマ変更の直接適用（開発時）
```bash
npx prisma db push
```

### Migration状態の確認
```bash
npx prisma migrate status
```

### 本番環境へのMigration適用
```bash
npx prisma migrate deploy
```
