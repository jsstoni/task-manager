import { nextAuth } from "@/utils/libs/next-auth";
import { prisma } from "@/utils/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await nextAuth();

    const tasks = await prisma.tasks.findMany({
      where: {
        user_id: session.userId
      }
    });

    return NextResponse.json(tasks, { status: 200 });

  } catch (error) {
    let message = error instanceof Error ? process.env.NODE_ENV !== "production" ? error.message : "Tasks Error" : "Unexpected Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
