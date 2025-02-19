"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  if (isDark === null) {
    return <div className="w-5 h-5 p-2" />; // Placeholder while theme loads
  }

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
