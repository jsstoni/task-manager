import { Subtask } from "@/utils/constant/tasks";
import { withSession } from "@/utils/libs/auth/session";
import { prisma } from "@/utils/libs/prisma";
import { NextResponse } from "next/server";

export const POST = withSession(async ({ request }) => {
  try {
    const body: Subtask[] = await request.json();
    const res = await prisma.$transaction(
      body.map((todo) => prisma.subtask.create({ data: todo })),
    );
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? process.env.NODE_ENV !== "production"
          ? error.message
          : "Created subtask error"
        : "Unexpected Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
});
