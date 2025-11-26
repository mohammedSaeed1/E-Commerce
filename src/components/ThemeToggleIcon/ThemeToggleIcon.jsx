import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleIcon() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer transition-transform duration-300 sm:hover:scale-110 "
    >
      {theme === "light" ? (
        <Sun className="text-yellow-500 w-7 h-7  transition-transform duration-500 hover:rotate-90" />
      ) : (
        <Moon className="text-blue-400  w-7 h-7 transition-transform duration-500 hover:-rotate-90" />
      )}
    </div>
  );
}
