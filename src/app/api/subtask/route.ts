import { subtaskCreate } from "@/utils/constant/forms";
import { Subtask } from "@/utils/constant/tasks";
import { handleCatchError } from "@/utils/handle-error";
import { withSession } from "@/utils/libs/auth/session";
import { prisma } from "@/utils/libs/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

//create sub tasks
export const POST = withSession(async ({ request, session }) => {
  try {
    const body: Subtask[] = await request.json();

    const schema = z.array(subtaskCreate).refine((subtasks) => {
      const idSet = new Set(subtasks.map((subtask) => subtask.tasks_id));
      return idSet.size === 1;
    });

    const isValid = schema.safeParse(body);
    if (!isValid.success) {
      const { errors } = isValid.error;
      return NextResponse.json(
        { error: { message: "invalid request", errors } },
        { status: 500 },
      );
    }

    const firtsId = body[0].tasks_id;

    const task = await prisma.tasks.findUnique({ where: { id: firtsId } });

    if (!task) {
      throw new Error("Tasks not found");
    }

    if (session.userId !== task.user_id) {
      throw new Error("You do not have permission");
    }

    const res = await prisma.$transaction(
      body.map((todo) => prisma.subtask.create({ data: todo })),
    );

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return handleCatchError(error, "Created subtask error");
  }
});

//change status to checked (true or false)
export const PUT = withSession(async ({ request, session }) => {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    if (!id) {
      throw new Error("ID not found");
    }

    const subtask = await prisma.subtask.findUnique({
      where: { id: +id },
      include: {
        Tasks: true,
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found");
    }

    if (session.userId !== subtask.Tasks.user_id) {
      throw new Error("You do not have permission");
    }

    const put = await prisma.subtask.update({
      data: { check: body.check },
      where: { id: +id },
    });

    return NextResponse.json(put, { status: 200 });
  } catch (error) {
    return handleCatchError(error, "Put subtask error");
  }
});

//remove subtasks
export const DELETE = withSession(async ({ request, session }) => {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    if (!id) {
      throw new Error("ID not found");
    }

    const subtask = await prisma.subtask.findUnique({
      where: { id: +id },
      include: {
        Tasks: true,
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found");
    }

    if (session.userId !== subtask.Tasks.user_id) {
      throw new Error("You do not have permission");
    }

    const rm = await prisma.subtask.delete({ where: { id: +id } });

    return NextResponse.json(rm, { status: 200 });
  } catch (error) {
    return handleCatchError(error, "Delete subtask error");
  }
});
