puts "Seeding jobs..."

Job.find_or_create_by!(title: "Next.js × Rails") do |job|
  job.company     = "CareerApp Inc."
  job.location    = "東京（リモート可）"
  job.url         = "https://example.com/jobs/nextjs-rails-intern"
  job.description = "Next.js 15 と Ruby on Rails を使った学生向け就活サービス開発。"
end

Job.find_or_create_by!(title: "フロントエンドエンジニア（アルバイト）") do |job|
  job.company     = "CareerApp Inc."
  job.location    = "フルリモート"
  job.url         = "https://example.com/jobs/frontend-parttime"
  job.description = "React / TypeScript を用いたUIコンポーネント開発、Storybookでのカタログ整備。"
end

Job.find_or_create_by!(title: "バックエンドエンジニア（新卒）") do |job|
  job.company     = "CareerApp Inc."
  job.location    = "東京"
  job.url         = "https://example.com/jobs/backend-newgrad"
  job.description = "Rails + GraphQL API の設計・実装。学生向け求人検索機能の開発など。"
end

puts "Seeding jobs done."
