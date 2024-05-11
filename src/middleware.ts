import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
  pages: { signIn: "/auth/signin" },
});

const isPublic = ["/auth/signup"];

export default function middleware(request: NextRequest) {
  const {
    nextUrl: { pathname },
  } = request;
  if (isPublic.includes(pathname)) {
    return NextResponse.next();
  }
  return (authMiddleware as any)(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
