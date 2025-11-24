'use client';

import { useQuery } from '@apollo/client';
import { MeDocument } from '@/graphql/graphql';

export function DashboardContent() {
  const { data, loading, error } = useQuery(MeDocument);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">エラー: {error.message}</p>;

  if (!data?.me) return <p>未ログイン or ユーザー情報なし</p>;

  return (
    <div className="space-y-1">
      <p>ID: {data.me.id}</p>
      <p>名前: {data.me.name}</p>
      <p>Email: {data.me.email}</p>
    </div>
  );
}
