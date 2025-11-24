import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>
      <p>ログイン中ユーザー: {session.user?.email}</p>
      {/* @ts-ignore */}
      <p>Rails JWT: {session.accessToken}</p>
    </main>
  );
}
