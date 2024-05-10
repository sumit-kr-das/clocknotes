import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import db from "./db";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      idToken: true,
    }),
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
          tenantId: isExist.tenantId,
          name: isExist.name,
          email: isExist.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      console.log("User is logging inside sign in", user);
      if (user?.email && user?.tenantId) {
        return true;
      }

      // google provider
      if (!profile?.email || !profile?.name) {
        throw new Error("No profile found");
      }

      const user = await db.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          avatar: (profile as any).picture,
          tenant: {
            create: {},
          },
        },
        update: {
          name: profile.name,
          avatar: (profile as any).picture,
        },
      });

      return true;
    },
    async jwt({ token, user, profile }) {
      if (user?.tenantId) {
        return {
          ...token,
          username: user.name,
          id: user.id,
          tenantId: user.tenantId,
        };
      }
      console.log("profile---------------------------", profile?.email);

      // GoogleProvider
      if (profile) {
        let newUser;
        try {
          newUser = await db.user.findUnique({
            where: {
              email: profile.email,
            },
          });
        } catch (err) {
          throw new Error("User search error");
        }
        if (!newUser) {
          throw new Error("No user found");
        }
        return {
          ...token,
          id: user.id,
          tenantId: user.tenantId,
          role: user?.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          tenantId: token.tenantId,
          role: token.role,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
