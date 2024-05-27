"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, SwitchTheme } from "@/components";
import { BsKanbanFill, BsPeople } from "react-icons/bs";
import { cn } from "@/utils/libs/cn";

export function AsideLeft() {
  const pathname = usePathname();

  return (
    <aside className="aside fixed inset-y-0 left-0 w-[60px] border-r dark:border-zinc-900">
      <ul className="flex h-full flex-col items-center gap-2 p-2 py-4 pb-5">
        <li className="mb-4">
          <Logo size={30} />
        </li>
        <li
          className={cn("p-2", {
            "rounded-md bg-zinc-200 dark:bg-zinc-900": pathname === "/",
          })}
        >
          <Link href="/">
            <BsKanbanFill />
          </Link>
        </li>

        <li
          className={cn("p-2", {
            "rounded-md bg-zinc-200 dark:bg-zinc-900": pathname === "/contacts",
          })}
        >
          <Link href="/contacts">
            <BsPeople />
          </Link>
        </li>
        <li className="mt-auto">
          <SwitchTheme />
        </li>
      </ul>
    </aside>
  );
}
