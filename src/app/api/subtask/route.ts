import { Subtask } from "@/utils/constant/tasks";
import { handleCatchError } from "@/utils/handle-error";
import { withSession } from "@/utils/libs/auth/session";
import { prisma } from "@/utils/libs/prisma";
import { NextResponse } from "next/server";

//create sub tasks
export const POST = withSession(async ({ request }) => {
  try {
    const body: Subtask[] = await request.json();

    const res = await prisma.$transaction(
      body.map((todo) => prisma.subtask.create({ data: todo })),
    );

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return handleCatchError(error, "Created subtask error");
  }
});

//change status to checked (true or false)
export const PUT = withSession(async ({ request }) => {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    if (!id) {
      throw new Error("ID not found");
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
export const DELETE = withSession(async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    if (!id) {
      throw new Error("ID not found");
    }

    const rm = await prisma.subtask.delete({ where: { id: +id } });

    return NextResponse.json(rm, { status: 200 });
  } catch (error) {
    return handleCatchError(error, "Delete subtask error");
  }
});
