import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { getSession } from "./options";

interface SessionHandler {
  ({
    request,
    params,
    session,
  }: {
    request: Request;
    params: Record<string, string>;
    session: { userId: number | undefined };
  }): Promise<Response>;
}

export const withSession =
  (handler: SessionHandler) =>
  async (request: Request, { params }: { params: Record<string, string> }) => {
    let session: { userId: number | undefined };
    try {
      const authHeader = request.headers.get("Authorization");
      if (authHeader) {
        if (!authHeader.includes("Bearer ")) {
          throw new Error("authorization header");
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = await decode({
          token,
          secret: process.env.NEXTAUTH_SECRET,
        });
        session = { userId: parseInt(decoded?.sub as string) };
      } else {
        const auth = await getSession();
        session = { userId: auth.user?.user_id };
      }

      return await handler({ request, params, session });
    } catch (error) {
      return NextResponse.json({ error }, { status: 401 });
    }
  };
