import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "./DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <p>NextAuth セッション上のユーザー: {session.user?.email}</p>
        {/* @ts-ignore */}
        <p className="text-xs text-slate-500">Rails JWT: {session.accessToken}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">GraphQL 経由のユーザー情報</h2>
        <DashboardContent />
      </section>
    </main>
  );
}
