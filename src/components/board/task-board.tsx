import React from "react";

interface Props {
  children?: React.ReactNode;
}

export function TaskBoard({ children }: Props) {
  return (
    <div className="absolute inset-0 flex justify-between h-screen">
      {children}
    </div>
  );
}
