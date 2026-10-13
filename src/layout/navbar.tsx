import { NavLink } from "react-router-dom";
import { MaterialIcon } from "../fragments/materialIcon/MaterialIcon";
import { navBarRoutes as navItems } from "./const/navBarRoutes";
import { useDropdownMenu } from "./hooks/useDropdownMenu";
import { ThemeToggle } from "./components/themeToggle";

const navShell =
  "mx-auto flex w-full max-w-7xl items-center gap-2 rounded-2xl border border-black/10 bg-secondary px-3 py-2 text-secondary-content shadow-lg shadow-secondary/25 backdrop-blur-md transition-colors dark:border-white/15 dark:bg-black/30 dark:text-white dark:shadow-black/30";
const linkBase = "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition";
const linkIdle =
  "text-secondary-content/80 hover:bg-black/10 hover:text-secondary-content dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white";
const linkActive = "bg-black/15 text-secondary-content dark:bg-white/20 dark:text-white";
const iconButton =
  "inline-flex size-9 items-center justify-center rounded-full border border-black/20 bg-black/5 text-secondary-content backdrop-blur transition hover:bg-black/10 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20";
const contactButton =
  "inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/5 px-2.5 py-1.5 text-sm font-medium text-secondary-content backdrop-blur transition hover:bg-black/10 sm:px-3 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20";

type NavbarProps = {
  isContactOpen: boolean;
  onOpenContact: () => void;
};

export const Navbar = ({ isContactOpen, onOpenContact }: NavbarProps) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useDropdownMenu();

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 pt-3 md:px-6 md:pt-4">
      <nav className={navShell}>
        <NavLink to="/" aria-label="Ir al inicio" className="flex flex-1 items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}logo_vector.svg`}
            alt="Veeduría Ciudadana por el pueblo de Mosquera"
            className="h-8 w-auto brightness-0 dark:invert"
          />
          <span className="hidden text-xs font-bold uppercase leading-tight tracking-wide xl:block">
            Veeduría Ciudadana
            <br />
            por el pueblo de Mosquera
          </span>
        </NavLink>

        <div className="relative ml-1 sm:hidden">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menú"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            className={iconButton}
          >
            <MaterialIcon icon={isMobileMenuOpen ? "close" : "menu"} />
          </button>
          {isMobileMenuOpen && (
            <ul className="absolute left-0 top-full z-50 mt-2 min-w-60 space-y-1 rounded-2xl border border-base-300/70 bg-base-100/95 p-2 text-base-content shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-black/70 dark:text-white">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
                  >
                    <MaterialIcon icon={item.icon} className="text-base" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="mx-auto hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                <MaterialIcon icon={item.icon} className="text-base" />
                <span className="hidden xl:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isContactOpen}
            aria-controls="contact-drawer"
            onClick={onOpenContact}
            className={contactButton}
          >
            <span className="hidden md:inline">Contáctanos</span>
            <img
              src={`${import.meta.env.BASE_URL}images/social/whatsapp.svg`}
              alt="WhatsApp"
              className="h-5 w-5 brightness-0 dark:invert"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};
