import React from "react";
import { cn } from "@/utils/libs/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border border-zinc-800 bg-zinc-800/30 px-3 py-2 outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Button";

export { Input };
