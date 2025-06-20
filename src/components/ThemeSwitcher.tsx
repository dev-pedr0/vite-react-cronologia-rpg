import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Sword, TreePine, Mountain } from "lucide-react";

const themes = [
    { id: "light", icon: <Sun />, label: "Tema Claro" },
    { id: "dark", icon: <Moon />, label: "Tema Escuro" },
    { id: "human", icon: <Sword />, label: "Tema Humano" },
    { id: "elf", icon: <TreePine />, label: "Tema Elfo" },
    { id: "dwarf", icon: <Mountain />, label: "Tema Anão" },
] as const;

export default function ThemeSwitcher() {
    const {theme, setTheme} =useTheme();

    return (
        <div className="fixed top-4 right-4 flex gap-2 z-50">
            {themes.map(({id, icon, label}) => (
                <button key={id} onClick={() => setTheme(id)}
                className={`w-10 h-10 flex items-center justify-center rounded-md shadow hover:scale-105 transition ${theme === id ? "ring-2 ring-blue-500" : ""}`}
                aria-label={label}
                title={label}>
                    {icon}
                </button>
            ))}

        </div>
    );
}

