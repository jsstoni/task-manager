import { Button, Input } from "@/components";

export default function Signup() {
  return (
    <form action="" className="flex flex-col w-full">
      <label htmlFor="">Email</label>
      <Input type="text" />

      <label htmlFor="">Password</label>
      <Input type="password" />

      <label htmlFor="">Repeat Password</label>
      <Input type="repassword" />

      <Button>Register</Button>
    </form>
  );
}
