import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">CareerApp PoC</h1>
      <p className="mb-6 text-slate-700">
        Next.js × Rails × GraphQL の PoC アプリ
      </p>
      <Link
        href="/jobs"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        求人一覧を見る
      </Link>
    </main>
  );
}
