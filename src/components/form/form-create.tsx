"use client";

import { FormCreateType, formCreate } from "@/utils/constant/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormError,
  Input,
  Modal,
  Select,
  Textarea,
} from "@/components";
import { closeCreate, useCreateTaskMutation } from "@/redux";
import { Tasks } from "@/utils/constant/tasks";
import { useAppDispatch, useBoard } from "@/utils/hooks";

export function FormCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateType>({ resolver: zodResolver(formCreate) });

  const dispatch = useAppDispatch();
  const { modalCreate } = useBoard();

  const [submitTask, { isLoading }] = useCreateTaskMutation();

  const onSubmit: SubmitHandler<FormCreateType> = async (data) => {
    try {
      const task: Partial<Tasks> = { column: "Backlog", log: 0, ...data };
      await submitTask(task).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    dispatch(closeCreate());
    reset();
  };

  return (
    <Modal title="Create Task" isOpen={modalCreate} close={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <label htmlFor="">Title</label>
        <Input type="text" {...register("title")} />
        <FormError value={errors.title} />

        <label htmlFor="">Description</label>
        <Textarea rows={3} {...register("content")} />
        <FormError value={errors.content} />

        <label htmlFor="">Priority</label>
        <Select options={["low", "medium", "high"]} {...register("priority")} />
        <FormError value={errors.priority} />

        <label htmlFor="">Due Date</label>
        <Input type="date" {...register("duedate")} />
        <FormError value={errors.duedate} />

        <Button type="submit" className="mt-3">
          Create
        </Button>
      </form>
    </Modal>
  );
}
