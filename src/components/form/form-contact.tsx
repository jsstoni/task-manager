"use client";

import { Button, FormError, Input } from "@/components";
import { SchemaContactType, schemaContact } from "@/utils/constant/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createContact } from "@/utils/actions/contacts";

export function FormContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaContactType>({ resolver: zodResolver(schemaContact) });

  const onSubmit: () => void = handleSubmit(async (data) => {
    createContact(data);
  });

  return (
    <form action={onSubmit}>
      <label htmlFor="name">Name</label>
      <Input {...register("name")} id="name" />
      <FormError value={errors.name} />

      <label htmlFor="mail">Email</label>
      <Input {...register("email")} id="mail" />
      <FormError value={errors.email} />

      <label htmlFor="url">Url</label>
      <Input {...register("url")} id="url" />
      <FormError value={errors.url} />

      <Button variant="secondary" className="mt-4">
        Save
      </Button>
    </form>
  );
}
