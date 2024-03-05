import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    avatar: string | null;
  }
  interface Session {
    user: User & {
      avatar: string | null;
    };
    token: {
      avatar: string | null;
    };
  }
}
