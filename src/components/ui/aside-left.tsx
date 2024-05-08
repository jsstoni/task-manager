"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/libs/cn";
import Link from "next/link";
import { BsClipboardData } from "react-icons/bs";
import { Logo, SwitchTheme } from "@/components";

export function AsideLeft() {
  const pathname = usePathname();

  return (
    <aside className="aside fixed inset-y-0 left-0 border-r dark:border-zinc-900">
      <ul className="flex flex-col items-center justify-center p-2 h-full pb-5">
        <li className="mb-5">
          <Logo size={35} />
        </li>
        <li
          className={cn({
            "bg-zinc-200 dark:bg-zinc-900 p-2 rounded-md": pathname === "/",
          })}
        >
          <Link href="/">
            <BsClipboardData />
          </Link>
        </li>
        <li className="mt-auto">
          <SwitchTheme />
        </li>
      </ul>
    </aside>
  );
}
