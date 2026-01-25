// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  events: {
    async signIn({ user, account }) {
      const url = `${process.env.BACKEND_URL}/api/login`;
      const sub = account?.providerAccountId;

      if (!sub) {
        throw new Error("Missing Google sub");
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, name: user.name, sub: sub }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Backend login failed", res.status, text);
        // Optional: throw to make the failure obvious in logs
        throw new Error(`Backend login failed: ${res.status}`);
      }
    },
  },
});
