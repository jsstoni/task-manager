import React from "react";
import { Button } from "@/components";
import { cn } from "@/utils/libs/cn";
import { BsXLg } from "react-icons/bs";

interface Props {
  children: React.ReactNode;
  hidden: boolean;
  position: "top" | "left" | "bottom" | "right";
  size?: "sm" | "md" | "xl";
  close: () => void;
}

export function Sheet({
  children,
  position,
  hidden,
  size = "md",
  close,
}: Props) {
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
      className={cn("fixed inset-0 z-20 size-full transition-colors", {
        "visible bg-black/70": hidden,
        invisible: !hidden,
      })}
    >
      <div
        className={cn(
          "absolute w-full p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900",
          vp[position],
          vs[size],
        )}
      >
        <Button variant="ghost" onClick={close}>
          <BsXLg />
        </Button>
        {children}
      </div>
    </div>
  );
}
