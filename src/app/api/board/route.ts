import { NextResponse } from "next/server";
import { formCreate } from "@/utils/constant/forms";
import { prisma } from "@/utils/libs/prisma";
import { withSession } from "@/utils/libs/auth/session";

export const GET = withSession(async ({ session }) => {
  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        user_id: session.userId,
      },
      include: {
        subtask: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    return NextResponse.json(tasks, { status: 200 });
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

export const POST = withSession(async ({ request, session }) => {
  try {
    const body = await request.json();
    body.user_id = session.userId;

    const isValid = formCreate.safeParse(body);

    if (!isValid.success) {
      const { errors } = isValid.error;
      return NextResponse.json(
        { error: { message: "invalid request", errors } },
        { status: 500 },
      );
    }

    const newTask = await prisma.tasks.create({ data: body });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? process.env.NODE_ENV !== "production"
          ? error.message
          : "Created task error"
        : "Unexpected Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
});

export const PUT = withSession(async ({ request, session }) => {
  try {
    const body = await request.json();

    const updateTask = await prisma.tasks.update({
      where: { id: body.id, user_id: session.userId },
      data: { column: body.column },
    });

    return NextResponse.json(updateTask, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? process.env.NODE_ENV !== "production"
          ? error.message
          : "Updated task error"
        : "Unexpected Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
});
