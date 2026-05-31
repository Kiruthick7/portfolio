"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Read the current theme class on mount
    const isDark = document.documentElement.classList.contains("dark");
    const timeoutId = setTimeout(() => {
      setTheme(isDark ? "dark" : "light");
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-border bg-secondary/35 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all focus:outline-none"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <Sun size={15} className="transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon size={15} className="transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
