import { z } from "zod";

export const formLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export type FormLoginType = z.infer<typeof formLogin>;

export const formRegister = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  repassword: z.string().min(6)
}).refine((data) => data.password === data.repassword,
  { message: "password do not match", path: ["repassword"] }
);

export type FormRegisterType = z.infer<typeof formRegister>;
