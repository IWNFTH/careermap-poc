#!/bin/bash
set -e

# server.pid が残っているとRailsが起動しないため削除する
rm -f /app/tmp/pids/server.pid

# コンテナのメインプロセスを実行
exec "$@"