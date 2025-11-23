FROM node:20

WORKDIR /app

# 依存関係インストール用に package.json 系だけ先にコピー
COPY package.json package-lock.json* ./

RUN npm install

# 残りのソースコードをコピー
COPY . .

# Next.js 開発サーバーを起動
CMD ["npm", "run", "dev", "--", "--port", "3000", "--hostname", "0.0.0.0"]
