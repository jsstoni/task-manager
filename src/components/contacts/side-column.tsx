interface Props {
  children: React.ReactNode;
}

export function SideColumn({ children }: Props) {
  return (
    <aside className="flex h-screen max-w-xs flex-col overflow-auto border-r dark:border-zinc-800">
      {children}
    </aside>
  );
}
