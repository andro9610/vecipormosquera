import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            aria-pressed={isDark}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-black/20 bg-black/5 text-secondary-content backdrop-blur transition hover:bg-black/10 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
            <MaterialIcon icon={isDark ? "light_mode" : "dark_mode"} />
        </button>
    );
};
