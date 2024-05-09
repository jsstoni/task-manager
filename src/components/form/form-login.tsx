"use client";

import { FormLoginType, formLogin } from "@/utils/constant/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormError, Input } from "@/components";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({ resolver: zodResolver(formLogin) });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormLoginType> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res && res.error) {
      alert(res.error);
    } else {
      router.push("/");
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

      <Button type="submit" className="mt-3">
        Login
      </Button>

      <Link href="/auth/signup" className="mt-3">
        I need an account !
      </Link>
    </form>
  );
}
