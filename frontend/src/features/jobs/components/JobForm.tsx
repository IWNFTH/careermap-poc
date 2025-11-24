'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const jobSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  company: z.string().min(1, '企業名は必須です'),
  location: z.string().min(1, '勤務地は必須です'),
  url: z
    .string()
    .url('URL形式で入力してください')
    .optional()
    .or(z.literal('')), // 空文字も許可
  description: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;

type JobFormProps = {
  onSubmit: (values: JobFormValues) => void | Promise<void>;
  loading?: boolean;
  message?: string;
  /** 編集時などに初期値を渡す */
  defaultValues?: Partial<JobFormValues>;
  /** ボタンのラベル（登録する / 更新する など） */
  submitLabel?: string;
};

export function JobForm({
  onSubmit,
  loading,
  message,
  defaultValues,
  submitLabel = '登録する',
}: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      url: '',
      description: '',
      ...defaultValues, // ← 渡された初期値で上書き
    },
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* タイトル */}
        <div>
          <label className="block text-slate-900 font-medium text-slate-700 mb-1">
            タイトル
          </label>
          <input
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="例）Next.js × Rails"
            {...register('title')}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* 会社名 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            企業名
          </label>
          <input
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="例）Sample Inc."
            {...register('company')}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        {/* 勤務地 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            勤務地
          </label>
          <input
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="例）東京（リモート可）"
            {...register('location')}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            募集ページURL
          </label>
          <input
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="https://example.com/jobs/123"
            {...register('url')}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
          )}
        </div>

        {/* 説明 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            詳細説明
          </label>
          <textarea
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[120px]"
            placeholder="募集要項の概要"
            {...register('description')}
          />
        </div>

        {/* 送信ボタン */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-blue-300"
          >
            {loading ? '送信中です…' : submitLabel}
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
  );
}
