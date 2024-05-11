import React from "react";
import { cn } from "@/utils/libs/cn";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  options?: any[];
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ children, options, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-md border border-zinc-800 bg-zinc-800/30 px-3 py-2 outline-none",
          className,
        )}
        {...props}
      >
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        {children}
      </select>
    );
  },
);

Select.displayName = "Button";

export { Select };
