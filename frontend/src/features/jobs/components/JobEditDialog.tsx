'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useMutation } from '@apollo/client/react';
import { UpdateJobDocument, type Job } from '@/graphql/graphql';
import { JobForm, type JobFormValues } from './JobForm';

type Props = {
  job: Job;
  /** 更新後に親が何かしたければ（再取得など） */
  onUpdated?: (job: Job) => void;
};

export function JobEditDialog({ job, onUpdated }: Props) {
  const [updateJob, { loading, error }] = useMutation(UpdateJobDocument);

  const handleSubmit = async (values: JobFormValues) => {
    const res = await updateJob({
      variables: {
        input: {
          id: job.id,
          title: values.title,
          company: values.company,
          location: values.location,
          url: values.url || null,
          description: values.description || null,
        },
      },
    });

    const payload = res.data?.updateJob;
    if (!payload) return;

    if (payload.errors.length === 0 && payload.job) {
      onUpdated?.(payload.job);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-sm text-blue-700 hover:underline">
          編集
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-6 shadow-xl
            focus:outline-none
          "
        >
          <div className="flex items-start justify-between mb-4">
            <Dialog.Title className="text-lg font-bold text-slate-900">
              求人編集
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-full px-2 py-1 text-slate-600 hover:bg-slate-100"
                aria-label="閉じる"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          {error && (
            <div className="mb-3 rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
              更新中にエラーが発生しました: {error.message}
            </div>
          )}

          <JobForm
            defaultValues={{
              title: job.title,
              company: job.company,
              location: job.location ?? '',
              url: job.url ?? '',
              description: job.description ?? '',
            }}
            submitLabel="更新する"
            loading={loading}
            onSubmit={handleSubmit}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
