import { getContacts } from "@/utils/actions/contacts";

export async function UserList() {
  const contacts = await getContacts();

  return contacts.map((contact) => {
    return (
      <article
        key={contact.id}
        className="flex gap-2 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 p-4 text-2xl">
          N
        </div>
        <div>
          <p>{contact.name}</p>
          <small className="text-zinc-700">{contact.email}</small>
        </div>
      </article>
    );
  });
}
