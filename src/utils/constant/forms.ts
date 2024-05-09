import { z } from "zod";

export const formLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export type FormLoginType = z.infer<typeof formLogin>;
