"use server";

import bcrypt from "bcrypt";
import { FormRegisterType } from "@/utils/constant/forms";
import { prisma } from "@/utils/libs/prisma";

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
    const message =
      error instanceof Error
        ? process.env.NODE_ENV !== "production"
          ? error.message
          : "Register error"
        : "Unexpected Error";
    return { error: message };
  }
}
