"use client";

import { FormCreateType, formCreate } from "@/utils/constant/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormError, Input, Textarea } from "@/components";

export function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateType>({ resolver: zodResolver(formCreate) });

  const onSubmit: SubmitHandler<FormCreateType> = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <label htmlFor="">Title</label>
      <Input type="text" {...register("title")} />
      <FormError value={errors.title} />

      <label htmlFor="">Description</label>
      <Textarea rows={3} {...register("content")} />
      <FormError value={errors.content} />

      <label htmlFor="">Priority</label>
      <select {...register("priority")}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <FormError value={errors.priority} />

      <label htmlFor="">Due Date</label>
      <Input type="date" {...register("duedate")} />
      <FormError value={errors.duedate} />

      <Button type="submit" className="mt-3">
        Create
      </Button>
    </form>
  );
}
