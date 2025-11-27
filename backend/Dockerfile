FROM ruby:3.1.4

# 必要ライブラリ（MySQL, node は asset/JS 用）
RUN apt-get update -y && \
    apt-get install -y build-essential libmariadb-dev-compat libmariadb-dev nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 先に Gemfile だけコピーして bundle install
COPY Gemfile Gemfile.lock ./
RUN bundle install

# アプリ本体
COPY . .

COPY entrypoint.sh /usr/bin/

RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0"]

EXPOSE 3000