import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { session } from "@/lib/get-session";
import db from "./db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile found");
      }
      try {
        await db.user.upsert({
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
      } catch (err) {
        console.log("error from google signin", err);
      }

      return true;
    },
    session,
    async jwt({ token, profile }) {
      if (profile) {
        const user = await db.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }
        return {
          ...token,
          id: user.id,
          tenant: {
            id: user.tenantId,
          },
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
