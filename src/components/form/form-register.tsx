"use client";

import { FormRegisterType, formRegister } from "@/utils/constant/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormError, Input } from "@/components";
import Link from "next/link";
import { signup } from "@/app/auth/signup/actions";

export function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterType>({ resolver: zodResolver(formRegister) });

  const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
    const user = await signup(data);
    if ("error" in user) {
      console.log(user.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <label htmlFor="">Email</label>
      <Input type="text" {...register("email")} />
      <FormError value={errors.email} />

      <label htmlFor="">Password</label>
      <Input type="password" {...register("password")} />
      <FormError value={errors.password} />

      <label htmlFor="">Repeat password</label>
      <Input type="password" {...register("repassword")} />
      <FormError value={errors.repassword} />

      <Button type="submit" className="mt-3">
        Register
      </Button>

      <Link href="/auth/signin" className="mt-3">
        I already have an account
      </Link>
    </form>
  );
}
