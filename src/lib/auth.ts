import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
        throw new Error("User update error");
      }

      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        let user;
        try {
          user = await db.user.findUnique({
            where: {
              email: profile.email,
            },
          });
        } catch (err) {
          throw new Error("User not found");
        }

        if (!user) {
          throw new Error("No user found");
        }
        return {
          ...token,
          id: user.id,
          tenantId: user.tenantId,
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
        },
      };

      return session;
    },
  },
};

export default NextAuth(authOptions);
