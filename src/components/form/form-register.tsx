"use client";

import Link from "next/link";
import { Button, FormError, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import signup from "@/utils/actions/signup";
import { formRegister, FormRegisterType } from "@/utils/constant/forms";
import { useState } from "react";
import { DisplayError } from "../ui/display-error";

export function FormRegister() {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterType>({ resolver: zodResolver(formRegister) });

  const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
    const user = await signup(data);
    if ("error" in user) {
      setError(user.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <label htmlFor="">Email</label>
      <Input type="text" {...register("email")} />
      <FormError value={errors.email} />

      <label htmlFor="">Password</label>
      <Input type="password" {...register("password")} />
      <FormError value={errors.password} />

      <label htmlFor="">Repeat password</label>
      <Input type="password" {...register("repassword")} />
      <FormError value={errors.repassword} />

      {error && !isSubmitting && <DisplayError value={error} />}

      <Button type="submit" className="mt-3" loader={isSubmitting}>
        Register
      </Button>

      <Link href="/auth/signin" className="mt-3">
        I already have an account
      </Link>
    </form>
  );
}
