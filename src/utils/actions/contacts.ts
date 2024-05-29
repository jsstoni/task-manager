"use server";

import { SchemaContactType } from "../constant/contacts";
import { prisma } from "@/utils/libs/prisma";
import { getSession } from "../libs/auth/options";
import { handleServerError } from "../handle-error";

export async function createContact(formData: SchemaContactType) {
  try {
    const session = await getSession();
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
    return handleServerError(error, "Create contacts error");
  }
}

export async function getContacts() {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("you don't have permissions");
  }

  const contacts = await prisma.contacts.findMany({
    where: {
      user_id: session.user.user_id,
    },
  });

  return contacts;
}
