import { z } from "zod";

const env = z.object({
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
});

env.parse(process.env);

declare global {// eslint-disable-next-line no-unused-vars
  namespace NodeJS {// eslint-disable-next-line no-unused-vars
    interface ProcessEnv extends z.infer<typeof env> { }
  }
}
