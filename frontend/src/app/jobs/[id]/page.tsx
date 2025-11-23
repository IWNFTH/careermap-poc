'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
};

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:3101/graphql';

const JOB_QUERY = `
  query Job($id: ID!) {
    job(id: $id) {
      id
      title
      company
      location
      url
      description
    }
  }
`;

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // id がまだ取れてない間は何もしない
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: JOB_QUERY,
            variables: { id },
          }),
        });

        const json = await res.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        setJob(json.data.job);
      } catch (e: any) {
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (!id) {
    return <p className="p-4">ID 取得中です…</p>;
  }

  if (loading) return <p className="p-4">読み込み中…</p>;
  if (error) return <p className="p-4 text-red-600">エラー: {error}</p>;
  if (!job) return <p className="p-4">求人が存在しません。</p>;

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-md p-6 rounded-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-3">{job.title}</h1>
        <p className="text-gray-700 mb-2">{job.company}</p>
        <p className="text-gray-500 mb-4">{job.location}</p>

        <p className="mb-4 whitespace-pre-line">{job.description}</p>

        <a
          href={job.url}
          target="_blank"
          className="text-blue-600 underline block mt-4"
        >
          🔗 求人ページを見る
        </a>
      </div>
    </main>
  );
}
