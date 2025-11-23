'use client';

import { useEffect, useState } from 'react';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
};

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:3101/graphql';

const JOBS_QUERY = `
  query Jobs {
    jobs {
      id
      title
      company
      location
    }
  }
`;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: JOBS_QUERY }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        if (json.errors) throw new Error(json.errors[0]?.message ?? 'GraphQL Error');

        setJobs(json.data.jobs ?? []);
      } catch (e: any) {
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
            エラーが発生しました: {error}
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
                    className="rounded border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
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
