import { withSession } from "@/utils/libs/auth/session";
import { prisma } from "@/utils/libs/prisma";
import { NextResponse } from "next/server";

interface Log {
  id: number;
  counter: number;
}

export const PUT = withSession(async ({ request, session }) => {
  try {
    const body: Log = await request.json();
    const put = await prisma.tasks.update({
      data: { log: { increment: body.counter } },
      where: { id: body.id, user_id: session.userId },
    });
    return NextResponse.json(put, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? process.env.NODE_ENV !== "production"
          ? error.message
          : "Tasks Error"
        : "Unexpected Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
});
