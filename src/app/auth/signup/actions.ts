"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/utils/libs/prisma";
import { FormRegisterType } from "@/utils/constant/forms";

export async function signup(formData: FormRegisterType) {
  try {
    formData.password = await bcrypt.hash(formData.password, 10);
    const create = await prisma.users.create({
      data: {
        email: formData.email,
        password: formData.password
      }
    });
    const { password: _, ...user } = create;
    return user;
  } catch (error) {
    let message = error instanceof Error ? process.env.NODE_ENV !== "production" ? error.message : "Register error" : "Unexpected Error";
    return { error: message };
  }
}
