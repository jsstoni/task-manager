import { z } from "zod";

export const formLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormLoginType = z.infer<typeof formLogin>;

export const formRegister = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    repassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repassword, {
    message: "password do not match",
    path: ["repassword"],
  });

export type FormRegisterType = z.infer<typeof formRegister>;

export const formCreate = z.object({
  title: z.string().trim().min(1, { message: "Name is required" }).max(60),
  priority: z.enum(["low", "medium", "high"]),
  content: z.string().min(1, { message: "Description is required" }),
  duedate: z
    .string()
    .min(1)
    .transform((value) => {
      const formatDate = new Date(value).toISOString();
      return formatDate;
    }),
});

export type FormCreateType = z.infer<typeof formCreate>;
