import { cn } from "@/utils/libs/cn";
import React from "react";

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
          "w-full px-3 py-2 outline-none rounded-md bg-zinc-800/30 border border-zinc-800",
          className
        )}
        {...props}
      >
        {options &&
          options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="capitalize bg-zinc-900"
            >
              {option}
            </option>
          ))}
        {children}
      </select>
    );
  }
);

Select.displayName = "Button";

export { Select };
