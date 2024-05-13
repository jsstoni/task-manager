"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FormError, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formLogin, FormLoginType } from "@/utils/constant/forms";
import { useState } from "react";
import { DisplayError } from "../ui/display-error";

export function FormLogin() {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginType>({ resolver: zodResolver(formLogin) });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormLoginType> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res && res.error) {
      setError(res.error);
    } else {
      router.push("/");
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

      {error && !isSubmitting && <DisplayError value={error} />}

      <Button
        type="submit"
        className="mt-3"
        disabled={isSubmitting}
        loader={isSubmitting}
      >
        Login
      </Button>

      <Link href="/auth/signup" className="mt-3">
        I need an account !
      </Link>
    </form>
  );
}
