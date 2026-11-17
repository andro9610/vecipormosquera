import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { useTheme } from "../../hooks/useTheme";

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      aria-pressed={isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={className}
    >
      <MaterialIcon icon={isDark ? "light_mode" : "dark_mode"} />
    </button>
  );
};
