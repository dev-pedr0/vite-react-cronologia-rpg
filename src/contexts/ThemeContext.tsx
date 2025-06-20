import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = 'light' | 'dark' | 'human' | 'elf' | 'dwarf';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}