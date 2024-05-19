import React from "react";
import { cn } from "@/utils/libs/cn";

interface Props {
  children: React.ReactNode;
  hidden: boolean;
  size?: "sm" | "md" | "xl";
}

export function Sheet({ children, hidden, size = "md" }: Props) {
  //variant size
  const vs = {
    sm: "max-w-sm",
    md: "max-w-md",
    xl: "max-w-xl",
  };

  return (
    <div
      className={cn("fixed inset-0 z-20 size-full transition-colors", {
        visible: hidden,
        invisible: !hidden,
      })}
    >
      <div
        className={cn(
          "absolute w-full transform overflow-auto p-5 shadow-2xl transition-transform duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-900",
          "bottom-0 right-0 top-0 border-l",
          {
            "-translate-x-0": hidden,
            "translate-x-full": !hidden,
          },
          vs[size],
        )}
      >
        {children}
      </div>
    </div>
  );
}
