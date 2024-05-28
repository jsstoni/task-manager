import { z } from "zod";

export interface Contacts {
  id: number;
  name: string;
  email: string;
  url: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

export const schemaContact = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  url: z.string().url(),
});

export type SchemaContactType = z.infer<typeof schemaContact>;
