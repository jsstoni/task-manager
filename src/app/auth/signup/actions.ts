"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/utils/libs/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
  repassword: z.string().min(6)
}).refine((data) => data.password === data.repassword)

export async function register(_formState: any, formData: FormData) {
  let body = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    repassword: formData.get("repassword") as string
  }

  const validate = schema.safeParse(body);

  if (!validate.success) {
    return { errors: validate.error.flatten().fieldErrors }
  }

  try {
    body.password = await bcrypt.hash(body.password, 10);
    await prisma.users.create({
      data: {
        email: body.email,
        password: body.password
      }
    });

    return {
      message: "User created successfully"
    };
  } catch (error) {
    let message = error instanceof Error ? process.env.NODE_ENV !== "production" ? error.message : "Register error" : "Unexpected Error";
    return { error: message };
  }
}
