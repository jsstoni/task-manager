import { cn } from "@/utils/libs/cn";
import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full px-3 py-2 outline-none rounded-md bg-zinc-800/30 border border-zinc-800",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
