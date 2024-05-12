"use client";

import { useEffect } from "react";
import { BsX } from "react-icons/bs";
import { cn } from "@/utils/libs/cn";

type SizeType = "xs" | "md" | "lg" | "xl" | "default";

interface Props {
  children?: React.ReactNode;
  title: string | undefined;
  isOpen: boolean;
  size?: SizeType;
  close: () => void;
}

export const Modal = ({ children, title, isOpen, size, close }: Props) => {
  useEffect(() => {
    const closeScape = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", closeScape);
    return () => {
      document.removeEventListener("keydown", closeScape);
    };
  });

  const windowSize = {
    xs: "max-w-xs",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-5xl",
    default: "max-w-xl",
  };

  return (
    <div
      className={cn(
        { "visible bg-black/70": isOpen },
        { invisible: !isOpen },
        "fixed inset-0 z-50 flex size-full flex-col items-center transition-colors",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          { "scale-100 opacity-100": isOpen },
          { "scale-125 opacity-0": !isOpen },
          "mt-5 max-h-[90%] w-full overflow-auto rounded-md bg-white p-5 transition-all dark:bg-zinc-900",
          windowSize[size || "default"],
        )}
      >
        <div className="mb-3 flex items-center border-b border-gray-200 pb-2 dark:border-zinc-800">
          <p className="block text-xl">{title}</p>
          <button onClick={() => close()} className="ml-auto">
            <BsX size={30} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
