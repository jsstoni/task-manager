"use client";

import {
  Button,
  DisplayError,
  FormError,
  Input,
  Modal,
  Select,
  Textarea,
} from "@/components";
import { closeCreate, useCreateTaskMutation } from "@/utils/libs/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { formCreate, FormCreateType } from "@/utils/constant/forms";
import { Tasks } from "@/utils/constant/tasks";
import { useAppDispatch, useBoard } from "@/utils/hooks";
import { handleError } from "@/utils/handle-error";

export function FormCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCreateType>({ resolver: zodResolver(formCreate) });

  const dispatch = useAppDispatch();
  const { modalCreate } = useBoard();

  const [submitTask, { isLoading, isError, error }] = useCreateTaskMutation();

  const handleClose = () => {
    dispatch(closeCreate());
    reset();
  };

  const onSubmit: SubmitHandler<FormCreateType> = async (data) => {
    const task: Partial<Tasks> = { column: "Backlog", log: 0, ...data };
    await submitTask(task).unwrap();
    handleClose();
  };

  return (
    <Modal title="Create Task" isOpen={modalCreate} close={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
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

        {isError && <DisplayError value={handleError(error)} />}

        <Button
          type="submit"
          className="mt-3"
          loader={isLoading}
          disabled={isLoading}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
}
