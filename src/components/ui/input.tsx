import { cn } from "@/utils/libs/cn";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 outline-none rounded-md bg-zinc-800/30 border border-zinc-800",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Button";

export { Input };
