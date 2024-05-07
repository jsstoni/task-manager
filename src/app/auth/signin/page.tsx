import { Button, Input } from "@/components";

export default function Signin() {
  return (
    <form action="" className="flex flex-col w-full">
      <label htmlFor="">Email</label>
      <Input type="text" />

      <label htmlFor="">Password</label>
      <Input type="password" />

      <Button>Login</Button>
    </form>
  );
}
