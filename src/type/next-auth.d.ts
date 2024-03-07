import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string | null;
    tenantId: string | null;
  }
  interface Session {
    user: User & {
      id: string;
      tenantId: string;
    };
    token: {
      id: string;
      tenantId: string;
    };
  }
}
