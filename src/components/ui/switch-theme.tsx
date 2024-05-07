"use client";

import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  return theme === "dark" ? (
    <BsSun onClick={() => setTheme("light")} />
  ) : (
    <BsMoon onClick={() => setTheme("dark")} />
  );
}
