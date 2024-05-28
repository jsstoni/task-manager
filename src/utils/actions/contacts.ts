"use server";

import { getServerSession } from "next-auth";
import { SchemaContactType } from "../constant/contacts";
import { prisma } from "@/utils/libs/prisma";

export async function createContact(formData: SchemaContactType) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      throw new Error("you don't have permissions");
    }

    const contact = await prisma.contacts.create({
      data: {
        name: formData.name,
        email: formData.email,
        url: formData.url,
        user_id: session.user.user_id,
      },
    });

    return contact;
  } catch (error) {
    const message =
      error instanceof Error
        ? process.env.NODE_ENV !== "production"
          ? error.message
          : "Contacts error"
        : "Unexpected Error";
    return { error: message };
  }
}
