'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function AppHeader() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const userLabel =
    session?.user?.name || session?.user?.email || 'ゲスト';

  const handleLogout = () => {
    // ログアウト後はログイン画面へ
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* 左：ロゴ */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-bold text-slate-900">
            CareerAppPoC
          </Link>
        </div>

        {/* 中央：ナビ */}
        <nav className="flex items-center gap-4 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'px-2 py-1',
                  isActive
                    ? 'font-semibold text-sky-600'
                    : 'text-slate-600 hover:text-sky-600',
                ].join(' ')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 右：ユーザー情報・ログイン/ログアウト */}
        <div className="flex items-center gap-3 text-sm">
          {status === 'loading' ? (
            <span className="text-slate-500">読み込み中...</span>
          ) : session ? (
            <>
              <span className="text-slate-700">
                こんにちは、<span className="font-semibold">{userLabel}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded border px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                ログアウト
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-black px-3 py-1 text-xs font-medium text-white hover:opacity-90"
            >
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
