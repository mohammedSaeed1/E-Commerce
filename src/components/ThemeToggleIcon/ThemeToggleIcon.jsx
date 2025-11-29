import { Moon, Sun } from "lucide-react";

export default function ThemeToggleIcon({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer transition-transform duration-300 sm:hover:scale-110"
    >
      {theme === "light" ? (
        <Sun className="text-yellow-500 w-7 h-7 transition-transform duration-500 hover:rotate-90" />
      ) : (
        <Moon className="text-blue-400 w-7 h-7 transition-transform duration-500 hover:-rotate-90" />
      )}
    </div>
  );
}
