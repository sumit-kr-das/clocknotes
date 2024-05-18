import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();
    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== UserRole.ADMIN
    ) {
      url.pathname = "/ws";
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);
export const config = {
  matcher: ["/timer", "/project", "/client", "/dashboard"],
};
