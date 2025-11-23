FROM node:20

WORKDIR /app

# 先に依存関係だけインストール
COPY package.json package-lock.json* ./
RUN npm install

# アプリ本体
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--port", "3000", "--hostname", "0.0.0.0"]
