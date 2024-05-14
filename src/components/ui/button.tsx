import React from "react";
import { cn } from "@/utils/libs/cn";
import { BsArrowClockwise } from "react-icons/bs";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "link" | "ghost";
  loader?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ variant, loader, className, children, ...props }, ref) => {
    //class variant
    const cv = {
      default: "bg-black text-white dark:bg-white dark:text-black",
      secondary: "bg-blue-600 text-white",
      outline: "ring-1 ring-zinc-200 dark:ring-zinc-800 hover:dark:bg-zinc-900",
      ghost: "hover:bg-zinc-200 hover:dark:bg-zinc-900",
      link: "text-blue-500 hover:text-blue-800 hover:underline text-left",
    };

    return (
      <button
        className={cn("rounded-md p-1.5", cv[variant || "default"], className, {
          "flex items-center justify-center gap-1 px-4": loader,
        })}
        ref={ref}
        {...props}
      >
        {loader && <BsArrowClockwise className="animate-spin" />} {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
