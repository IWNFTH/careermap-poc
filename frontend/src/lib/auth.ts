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

        const apiUrl = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

        console.log(`Login Request to: ${apiUrl}/auth/login`);

        try {
          const res = await fetch(
            `${apiUrl}/auth/login`,
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
            console.error("Login Error Status:", res.status);
            return null;
          }

          const data = await res.json();

          if (data.status !== "ok") {
            return null;
          }

          return {
            id: String(data.user.id),
            name: data.user.name,
            email: data.user.email,
            accessToken: data.token,
          };
        } catch (e) {
          console.error("Login Fetch Error:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  },
};
