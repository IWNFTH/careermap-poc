'use client';

import { useQuery } from '@apollo/client/react';
import { JobsDocument } from '@/features/jobs/graphql';

export default function JobsPage() {
  const { data, loading, error } = useQuery(JobsDocument);

  const jobs = data?.jobs ?? [];

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">求人一覧 (GraphQL /jobs)</h1>

          <a
            href="/jobs/new"
            className="text-sm text-blue-700 hover:underline"
          >
            ＋ 新規登録
          </a>
        </header>

        {/* Content */}
        {loading && <p className="p-4">読み込み中です…</p>}

        {error && (
          <div className="p-4 text-red-600 border border-red-300 bg-red-50 rounded">
            エラーが発生しました: {error.message}
          </div>
        )}

        {!loading && !error && (
          <>
            {jobs.length === 0 ? (
              <p className="text-slate-600">求人データがありません。</p>
            ) : (
              <ul className="space-y-3">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="rounded border bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/jobs/${job.id}`)
                    }
                  >
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-sm text-slate-700">
                      {job.company} / {job.location}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
