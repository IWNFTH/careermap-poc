'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { JobDocument } from '@/features/jobs/graphql';

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, loading, error } = useQuery(JobDocument, {
    variables: { id },
  });

  if (loading) {
    return <div className="p-4">読み込み中です…</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 border border-red-300 bg-red-50 rounded">
        エラーが発生しました: {error.message}
      </div>
    );
  }

  const job = data?.job;

  if (!job) {
    return <div className="p-4">求人が見つかりませんでした。</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-sm text-slate-700">
            {job.company} / {job.location}
          </p>
        </header>

        <section className="bg-white rounded shadow-sm p-4">
          <h2 className="font-semibold mb-2">求人詳細</h2>
          <p className="whitespace-pre-wrap text-slate-800">
            {job.description}
          </p>
        </section>

        <a href="/jobs" className="text-sm text-blue-700 hover:underline">
          ← 求人一覧に戻る
        </a>
      </div>
    </main>
  );
}
