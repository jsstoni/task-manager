import { formCreate } from "@/utils/constant/forms";
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

export async function POST(request: Request) {
  try {
    const session = await nextAuth();
    const body = await request.json();
    body.user_id = session.userId;

    const isValid = formCreate.safeParse(body);

    if (!isValid.success) {
      const { errors } = isValid.error;
      return NextResponse.json({ error: { message: "invalid request", errors } }, { status: 500 });
    }

    const newTask = await prisma.tasks.create({ data: body });

    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    let message = error instanceof Error ? process.env.NODE_ENV !== "production" ? error.message : "Create task error" : "Unexpected Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
