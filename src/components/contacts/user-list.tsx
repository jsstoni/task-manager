export function UserList() {
  return (
    <article className="flex gap-2 p-4 hover:bg-zinc-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 p-4 text-2xl">
        N
      </div>
      <div>
        <p>Nombre</p>
        <small className="text-zinc-700">jonhdoe@gmail.com</small>
      </div>
    </article>
  );
}
