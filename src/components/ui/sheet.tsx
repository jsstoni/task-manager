import React from "react";
import { cn } from "@/utils/libs/cn";
import { Button } from "@/components";
import { BsXLg } from "react-icons/bs";

interface Props {
  children: React.ReactNode;
  hidden: boolean;
  size?: "sm" | "md" | "xl";
  close: () => void;
}

export function Sheet({ children, hidden, size = "md", close }: Props) {
  //variant size
  const vs = {
    sm: "max-w-sm",
    md: "max-w-md",
    xl: "max-w-xl",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 size-full transform transition-transform duration-300 ease-in-out",
        {
          "visible translate-x-0": hidden,
          "translate-x-full": !hidden,
        },
      )}
    >
      <div
        className={cn(
          "absolute w-full overflow-auto bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900",
          "bottom-0 right-0 top-0 border-l",
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
