import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const isExist = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!isExist) {
          return null;
        }

        if (isExist.password) {
          const passwordMatch = await compare(
            credentials.password,
            isExist.password
          );
          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: isExist.id + "",
          name: isExist.name,
          email: isExist.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
