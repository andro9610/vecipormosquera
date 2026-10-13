import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "veeduria-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const getSystemTheme = (): Theme => {
    if (typeof window === "undefined" || !window.matchMedia) return "light";
    return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

const getStoredTheme = (): Theme | null => {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "light" || value === "dark" ? value : null;
    } catch {
        return null;
    }
};

const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
};

export const resolveInitialTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

export const initializeTheme = () => applyTheme(resolveInitialTheme());

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (getStoredTheme()) return;
        const media = window.matchMedia(DARK_QUERY);
        const handleChange = (event: MediaQueryListEvent) => {
            setTheme(event.matches ? "dark" : "light");
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((previous) => {
            const next: Theme = previous === "dark" ? "light" : "dark";
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch {
                void 0;
            }
            return next;
        });
    }, []);

    return { theme, toggleTheme };
};
