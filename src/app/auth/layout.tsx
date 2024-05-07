interface Props {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: Props) {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
