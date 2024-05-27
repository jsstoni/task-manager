import { NextResponse } from "next/server";
import { formCreate, updateColumn } from "@/utils/constant/forms";
import { prisma } from "@/utils/libs/prisma";
import { withSession } from "@/utils/libs/auth/session";
import { handleCatchError } from "@/utils/handle-error";

//get all tasks per user
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
    return handleCatchError(error, "Tasks Error");
  }
});

//create a new task
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
    const task = { ...newTask, subtask: [] };

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return handleCatchError(error, "Created task error");
  }
});

//update task column
export const PUT = withSession(async ({ request, session }) => {
  try {
    const body = await request.json();

    const isValid = updateColumn.safeParse(body);

    if (!isValid.success) {
      const { errors } = isValid.error;
      return NextResponse.json(
        { error: { message: "invalid request", errors } },
        { status: 500 },
      );
    }

    const updateTask = await prisma.tasks.update({
      where: { id: body.id, user_id: session.userId },
      data: { column: body.column },
    });

    return NextResponse.json(updateTask, { status: 200 });
  } catch (error) {
    return handleCatchError(error, "Updated task error");
  }
});
