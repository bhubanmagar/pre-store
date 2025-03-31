import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";
import type { NextAuthConfig } from "next-auth";
export const config = {
  pages: {
    signIn: "/sign-n",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: " email " },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        //find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //check if user exist
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          //   if password is correct ,return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // if user doesnot match or password doesn't match, return null
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

      console.log(token);

      //   if there is update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      // add user field to token
      if (user) {
        token.role = user.role;
        // if user has no name then use email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
          // update database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
