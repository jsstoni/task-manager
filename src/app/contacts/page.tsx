import { SideColumn } from "@/components";
import { UserList } from "@/components/contacts/user-list";

export default function Contact() {
  return (
    <main className="relative ml-[60px] flex-grow">
      <SideColumn>
        <h1 className="text-xl">Contact</h1>
        <UserList />
      </SideColumn>
    </main>
  );
}
