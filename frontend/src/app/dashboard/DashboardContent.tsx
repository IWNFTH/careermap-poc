"use client";

import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "../apollo-provider";

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;

type MeData = {
  me: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export function DashboardContent() {
  const [data, setData] = useState<MeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await apolloClient.query<MeData>({
          query: ME_QUERY,
          fetchPolicy: "network-only",
        });
        if (!cancelled) {
          setData(result.data);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p>ユーザー情報を読み込み中...</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        ユーザー情報の取得に失敗しました: {error.message}
      </p>
    );
  }

  if (!data?.me) {
    return <p>ユーザー情報が取得できませんでした。（未ログインの可能性）</p>;
  }

  return (
    <div className="space-y-1 text-sm">
      <p>ログイン中ユーザーID: {data.me.id}</p>
      <p>名前: {data.me.name}</p>
      <p>メールアドレス: {data.me.email}</p>
    </div>
  );
}
