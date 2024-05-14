import { NextFetchEvent, NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
  pages: { signIn: "/auth/signin" },
});

const isPublic = ["/auth/signup"];

export default function middleware(
  request: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const {
    nextUrl: { pathname },
  } = request;

  if (isPublic.includes(pathname)) {
    return NextResponse.next();
  }

  return authMiddleware(request, event);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
