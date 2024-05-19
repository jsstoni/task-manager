import React from "react";
import { cn } from "@/utils/libs/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border px-3 py-2 outline-none dark:border-zinc-800 dark:bg-zinc-800/30",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Button";

export { Input };
