'use client';

import { useState } from 'react';

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:3101/graphql';

const CREATE_JOB_MUTATION = `
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      job {
        id
        title
        company
        location
        url
      }
      errors
    }
  }
`;

export default function NewJobPage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('送信中です…');

    try {
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CREATE_JOB_MUTATION,
          variables: {
            input: { title, company, location, url, description },
          },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        console.error(json.errors);
        setMessage('エラー: ' + json.errors[0]?.message ?? 'GraphQL Error');
        return;
      }

      if (json.data.createJob.errors.length > 0) {
        setMessage('エラー: ' + json.data.createJob.errors.join(', '));
        return;
      }

      const job = json.data.createJob.job;
      setMessage(`登録完了: ID=${job.id}「${job.title}」`);
    } catch (err: any) {
      setMessage('通信エラーが発生しました: ' + (err?.message ?? 'Unknown error'));
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">求人登録 (GraphQL /createJob)</h1>
            <p className="mt-1 text-sm text-slate-600">
              フロント → GraphQL → Rails → MySQL までの一連の流れを確認するためのフォーム
            </p>
          </div>

          <a
            href="/jobs"
            className="text-sm text-blue-700 hover:underline"
          >
            ← 求人一覧へ戻る
          </a>
        </header>

        {/* カード */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* タイトル */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                タイトル
              </label>
              <input
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="例）Next.js × Rails インターン"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* 会社名 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                企業名
              </label>
              <input
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="例）Sample Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            {/* 勤務地 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                勤務地
              </label>
              <input
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="例）東京（リモート可）"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                募集ページURL
              </label>
              <input
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://example.com/jobs/123"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* 説明 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                詳細説明
              </label>
              <textarea
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[120px]"
                placeholder="募集要項の概要やアピールポイントなど"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* 送信ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                登録する
              </button>
            </div>
          </form>

          {/* メッセージ表示 */}
          {message && (
            <p className="mt-4 text-sm text-slate-800">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
