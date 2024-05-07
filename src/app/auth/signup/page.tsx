"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Button, FormError, Input } from "@/components";
import { register } from "./actions";

export default function Signup() {
  const [formState, submit] = useFormState(register, null);
  const { pending } = useFormStatus();

  return (
    <form action={submit} className="flex flex-col w-full">
      <label htmlFor="">Email</label>
      <Input type="text" name="email" />
      <FormError value={formState} name="email" />

      <label htmlFor="">Password</label>
      <Input type="password" name="password" />
      <FormError value={formState} name="password" />

      <label htmlFor="">Repeat Password</label>
      <Input type="password" name="repassword" />
      <FormError value={formState} name="repassword" />

      {formState && formState.error && <span>{formState.error}</span>}
      {formState && formState.message && <span>{formState.message}</span>}

      <Button type="submit" className="mt-3">
        Register
      </Button>

      <Link href="/auth/signin" className="mt-3">
        I already have an account
      </Link>
    </form>
  );
}
