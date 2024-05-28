interface Props {
  children: React.ReactNode;
}

export function SideColumn({ children }: Props) {
  return (
    <aside className="flex h-screen max-w-xs flex-col gap-4 overflow-auto border-r p-5 dark:border-zinc-800">
      {children}
    </aside>
  );
}
