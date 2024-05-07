interface Props {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: Props) {
  return (
    <main className="h-screen max-w-xs mx-auto flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
