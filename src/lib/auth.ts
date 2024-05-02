import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "./db";
import getSession from "@/lib/get-session";
import {
  createWorkspace,
  createWorkspaceOnSignIn,
  getWorkspaces,
  hasWorkspace,
} from "@/app/(main)/workspaces/actions/workspace.action";
import { createTeam } from "@/app/(main)/teams/actions/teams.action";
import { Role } from "@prisma/client";

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

      // const checkWorkspace = await hasWorkspace(user.tenantId);
      // if (!checkWorkspace) {
      //   const workspace = await createWorkspace();
      // }

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
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      const check = await hasWorkspace(user?.email);
      if (!check) {
        const workspace = await createWorkspaceOnSignIn(user?.email);
        localStorage.setItem("current", workspace?.id);
      } else {
        const workspaces = await getWorkspaces(user?.email);
        console.log(workspaces);
        if (workspaces) {
          localStorage.setItem("current", workspaces.id);
        }
      }
    },
  },
};

export default NextAuth(authOptions);
