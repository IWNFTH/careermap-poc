'use client';

import * as Dialog from '@radix-ui/react-dialog';

type Job = {
  id: string;
  title: string;
  company?: string | null;
  location?: string | null;
  url?: string | null;
  description?: string | null;
};

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Dialog.Root>
      {/* カード全体をトリガーにする */}
      <Dialog.Trigger asChild>
        <button
          className="w-full text-left rounded border bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <h2 className="text-lg font-semibold text-slate-900">{job.title}</h2>
          <p className="text-sm text-slate-800">
            {job.company} / {job.location}
          </p>
          {job.url && (
            <p className="mt-1 text-xs text-blue-700 underline">
              {job.url}
            </p>
          )}
        </button>
      </Dialog.Trigger>

      {/* オーバーレイ */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-6 shadow-xl
            focus:outline-none
          "
        >
          <div className="flex items-start justify-between mb-4">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              {job.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-full p-1 hover:bg-slate-100"
                aria-label="閉じる"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-3 text-sm text-slate-800">
            <p>
              <span className="font-semibold">企業名：</span>
              {job.company}
            </p>
            <p>
              <span className="font-semibold">勤務地：</span>
              {job.location}
            </p>

            {job.url && (
              <p>
                <span className="font-semibold">募集URL：</span>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  {job.url}
                </a>
              </p>
            )}

            {job.description && (
              <div>
                <p className="font-semibold mb-1">詳細説明：</p>
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <a
              href={`/jobs/${job.id}`}
              className="text-sm text-blue-700 hover:underline"
            >
              詳細ページへ移動 →
            </a>
            <Dialog.Close asChild>
              <button className="text-sm text-slate-700 hover:underline">
                閉じる
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
