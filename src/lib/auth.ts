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
          throw new Error("User search error");
        }
        if (!user) {
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
      return session;
    },
  },
};

export default NextAuth(authOptions);
