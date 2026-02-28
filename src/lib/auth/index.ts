import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isPublicPath =
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/api/auth");

      if (isPublicPath) {
        return true;
      }

      // 精査必要、一旦仮で配置
      const isRestrictedPath =
        pathname === "/posts/me" ||
        pathname === "/posts/new" ||
        pathname.startsWith("/posts/user") ||
        pathname.startsWith("/posts/edit");

      if (isRestrictedPath) {
        return !!auth?.user;
      }

      return true;
    },
  },

  secret: process.env.AUTH_SECRET,
});
