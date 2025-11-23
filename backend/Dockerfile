FROM ruby:3.1.4

# 必要ライブラリ（MySQL, node は asset/JS 用）
RUN apt-get update -y && \
    apt-get install -y build-essential libmysqlclient-dev nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 先に Gemfile だけコピーして bundle install
COPY Gemfile Gemfile.lock ./
RUN bundle install

# アプリ本体
COPY . .

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails s -b 0.0.0.0 -p 3000"]
