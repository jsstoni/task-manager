"use server";

import bcrypt from "bcrypt";
import { FormRegisterType } from "@/utils/constant/forms";
import { prisma } from "@/utils/libs/prisma";
import { handleServerError } from "../handle-error";

export default async function signup(formData: FormRegisterType) {
  try {
    formData.password = await bcrypt.hash(formData.password, 10);
    const create = await prisma.users.create({
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
    const { password: _, ...user } = create;
    return user;
  } catch (error) {
    return handleServerError(error, "Register error");
  }
}
