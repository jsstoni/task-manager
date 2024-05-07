"use client";

import { Button, Input } from "@/components";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  async function login(formData: FormData) {
    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    if (res && res.error) {
      alert(res.error);
    } else {
      router.push("/");
    }
  }

  return (
    <form action={login} className="flex flex-col w-full">
      <label htmlFor="">Email</label>
      <Input type="text" name="email" />

      <label htmlFor="">Password</label>
      <Input type="password" name="password" />

      <Button type="submit" className="mt-3">
        Login
      </Button>

      <Link href="/auth/signup" className="mt-3">
        I need an account !
      </Link>
    </form>
  );
}
