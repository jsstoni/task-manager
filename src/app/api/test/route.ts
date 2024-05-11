import { withSession } from "@/utils/libs/auth/session";
import { NextResponse } from "next/server";

export const GET = withSession(async ({ session }) => {
  return NextResponse.json(session);
});
