"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun  } from "lucide-react";


export function ThemeToggle() {
    const { isDark, toggleTheme } = useDarkMode();

    return (
        <button
            onClick={toggleTheme}
        >
            {isDark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
        </button>
    )
}