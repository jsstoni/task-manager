import { CreateModal, RowItems, SideColumn } from "@/components";
import { UserList } from "@/components/contacts/user-list";

export default function Contact() {
  return (
    <>
      <main className="relative ml-[60px] flex-grow">
        <SideColumn>
          <RowItems className="border-b p-4 dark:border-zinc-800">
            <h1 className="text-xl">Contacts</h1>
            <CreateModal />
          </RowItems>

          <UserList />
        </SideColumn>
      </main>
    </>
  );
}
