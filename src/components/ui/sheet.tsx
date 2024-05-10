import { cn } from "@/utils/libs/cn";
import React from "react";

interface Props {
  children: React.ReactNode;
  hidden: boolean;
  position: "top" | "left" | "bottom" | "right";
  size?: "sm" | "md" | "xl";
}

export function Sheet({ children, position, hidden, size = "md" }: Props) {
  //variant size
  const vs = {
    sm: "max-w-sm",
    md: "max-w-md",
    xl: "max-w-xl",
  };
  //variant position
  const vp = {
    top: "top-0 left-0 right-0 mx-auto border-b",
    left: "left-0 top-0 bottom-0 border-r",
    bottom: "bottom-0 left-0 right-0 mx-auto border-t",
    right: "right-0 top-0 bottom-0 border-l",
  };

  return (
    <div
      className={cn("bg-black/60 fixed inset-0 z-20 size-full", {
        visible: hidden,
        invisible: !hidden,
      })}
    >
      <div
        className={cn(
          "dark:bg-zinc-900 dark:border-zinc-800 p-5 shadow-2xl absolute w-full",
          vp[position],
          vs[size]
        )}
      >
        {children}
      </div>
    </div>
  );
}
