import React from "react";
import { cn } from "@/utils/libs/cn";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full rounded-md border px-3 py-2 outline-none dark:border-zinc-800 dark:bg-zinc-800/30",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
