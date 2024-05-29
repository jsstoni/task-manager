"use client";

import { Button, FormError, Input, Modal } from "@/components";
import { SchemaContactType, schemaContact } from "@/utils/constant/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createContact } from "@/utils/actions/contacts";

interface Props {
  open: boolean;
  close: () => void;
}

export function FormContact({ open, close }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaContactType>({ resolver: zodResolver(schemaContact) });

  const onSubmit: () => void = handleSubmit(async (data) => {
    await createContact(data);
  });

  const handleClose = () => {
    reset();
    close();
  };

  return (
    <Modal title="Create contact" size="xs" isOpen={open} close={handleClose}>
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

        <Button
          variant="secondary"
          className="mt-4"
          loader={isSubmitting}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
}
