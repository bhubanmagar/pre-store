// auth-edge.ts
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize() {
        // No DB access here. Just block or allow.
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line
    async session({ session, user, trigger, token }: any) {
      // set the user ID  from token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //   if there is update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    authorized({ request, auth }: any) {
      // check for the session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // Generate new Session cart id Cookie
        const sessionCartId = crypto.randomUUID();
        //  Clone the req headers
        const newRequestHeaders = new Headers(request.headers);
        // Create new response and new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        // set newly generated cartId into  response cookie
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
