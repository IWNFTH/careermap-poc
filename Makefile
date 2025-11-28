.DEFAULT_GOAL := help

# 環境構築（初回のみ）: ビルド -> 起動 -> DB作成
init:
	@echo "🚀 Initializing project..."
	@make setup-env
	@echo "🐳 Building and starting containers..."
	@docker compose up -d --build --wait
	@echo "🛠 Setting up database..."
	@docker compose exec api bundle exec rails db:prepare db:seed
	@echo "✅ Setup complete! Access http://localhost:3100"
	@open "http://localhost:3100" || echo "⚠️ Auto-open failed. Please open http://localhost:3100 manually."

# 環境変数コピー
setup-env:
	@cp -n backend/.env.example backend/.env || true
	@cp -n frontend/.env.example frontend/.env.local || true

# 起動（2回目以降）
up:
	@docker compose up -d

# 停止
down:
	@docker compose down

# リセット（データも消してやり直す時用）
reset:
	@docker compose down -v
	@make init

help:
	@echo "Available commands:"
	@echo "  make init   - 初回セットアップ（ビルド・起動・DB作成）"
	@echo "  make up     - コンテナ起動"
	@echo "  make down   - コンテナ停止"
	@echo "  make reset  - 全データ削除して再構築"