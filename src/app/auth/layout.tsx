import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: Props) {
  return (
    <main className="mx-auto flex h-screen max-w-xs flex-col items-center justify-center">
      {children}
    </main>
  );
}
