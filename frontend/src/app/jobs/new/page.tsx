'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';

import { CreateJobDocument } from '@/features/jobs/graphql';
import {
  JobForm,
  JobFormValues,
} from '@/features/jobs/components/JobForm';

export default function NewJobPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');

  const [createJob, { loading, error }] = useMutation(CreateJobDocument);

  const handleSubmit = async (values: JobFormValues) => {
    setMessage('送信中です…');

    try {
      const res = await createJob({
        variables: {
          input: values,
        },
      });

      const payload = res.data?.createJob;

      if (!payload) {
        setMessage('エラー: レスポンスが不正です');
        return;
      }

      if (payload.errors && payload.errors.length > 0) {
        setMessage('エラー: ' + payload.errors.join(', '));
        return;
      }

      const job = payload.job;
      if (job?.id) {
        setMessage(`登録完了: ID=${job.id}「${job.title}」`);
        router.push(`/jobs/${job.id}`);
      } else {
        setMessage('登録は実行されましたが、IDが取得できませんでした。');
      }
    } catch (e: any) {
      setMessage(
        '通信エラーが発生しました: ' + (e?.message ?? 'Unknown error'),
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              求人登録 (GraphQL /createJob)
            </h1>
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

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            ネットワークエラーが発生しました: {error.message}
          </div>
        )}

        <JobForm onSubmit={handleSubmit} loading={loading} message={message} />
      </div>
    </main>
  );
}
