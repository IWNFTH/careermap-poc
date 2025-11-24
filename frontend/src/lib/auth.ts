import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) {
          return null;
        }

        const data = await res.json();

        if (data.status !== "ok") {
          return null;
        }

        // NextAuth に渡すユーザー情報
        // data.token は JWT (Rails発行) をそのまま持たせる
        return {
          id: String(data.user.id),
          name: data.user.name,
          email: data.user.email,
          accessToken: data.token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // ログイン直後のみ user が入っている
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        // @ts-ignore
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user && session.user) {
        const u = token.user as any;
        (session.user as any).id = u.id;
        session.user.name = u.name;
        session.user.email = u.email;
      }

      // Rails の JWT を session にも載せておく
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
