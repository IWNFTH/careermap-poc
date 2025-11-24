"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod でスキーマ定義
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  password: z
    .string()
    .min(6, "パスワードは6文字以上で入力してください"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (res?.error) {
      // 認証エラー（メールorパスワード不正など）
      setServerError("メールアドレスまたはパスワードが正しくありません");
      return;
    }

    router.push(res?.url || callbackUrl);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow"
      >
        <h1 className="text-xl font-bold text-slate-900">ログイン</h1>

        {serverError && (
          <p className="rounded bg-red-50 p-2 text-sm text-red-600">
            {serverError}
          </p>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-900" htmlFor="email">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-900" htmlFor="password">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isSubmitting ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}
