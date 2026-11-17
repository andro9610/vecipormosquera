import { NavLink } from "react-router-dom";
import { MaterialIcon } from "../fragments/materialIcon/MaterialIcon";
import { getPublicStorageUrl } from "../utilities/storageUtilities";
import { navBarRoutes as navItems } from "./const/navBarRoutes";
import { useDropdownMenu } from "./hooks/useDropdownMenu";
import { ThemeToggle } from "./components/themeToggle";

const notch =
  "flex items-center rounded-2xl border border-black/10 bg-secondary text-secondary-content shadow-lg shadow-secondary/25 backdrop-blur-md transition-colors dark:border-white/15 dark:bg-black/30 dark:text-white dark:shadow-black/30";
const itemBase =
  "flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition select-none";
const itemIdle =
  "text-secondary-content/80 hover:bg-black/10 hover:text-secondary-content dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white";
const itemActive = "bg-black/15 text-secondary-content dark:bg-white/20 dark:text-white";
const iconItem =
  "flex size-10 shrink-0 items-center justify-center rounded-xl transition";

type NavbarProps = {
  isContactOpen: boolean;
  onOpenContact: () => void;
};

export const Navbar = ({ isContactOpen, onOpenContact }: NavbarProps) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useDropdownMenu();

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 pt-3 md:px-6 md:pt-4">
      <nav className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3">
        <div className="flex min-w-0 justify-start">
          <NavLink
            to="/"
            aria-label="Ir al inicio"
            className="flex min-w-0 items-center gap-3 rounded-xl px-1 py-1 transition hover:opacity-90"
          >
            <img
              src={getPublicStorageUrl("assets/logo/logo_vector.svg")}
              alt="Veeduría Ciudadana por el pueblo de Mosquera"
              className="h-20 w-auto shrink-0 drop-shadow-md brightness-0 dark:invert"
            />
            <span className="hidden truncate text-xs font-bold uppercase leading-tight tracking-wide text-secondary-content drop-shadow-md xl:block dark:text-white">
              Veeduría Ciudadana
              <br />
              por el pueblo de Mosquera
            </span>
          </NavLink>
        </div>

        <div className="hidden justify-center sm:flex">
          <ul className={`${notch} gap-1 p-1.5`}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `${itemBase} ${isActive ? itemActive : itemIdle}`
                  }
                >
                  <MaterialIcon icon={item.icon} className="text-lg" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <div className={`${notch} gap-1 p-1.5`}>
            <ThemeToggle className={`${iconItem} ${itemIdle}`} />
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isContactOpen}
              aria-controls="contact-drawer"
              onClick={onOpenContact}
              className={`${itemBase} ${itemIdle}`}
            >
              <img
                src={getPublicStorageUrl("assets/social_networks/whatsapp.svg")}
                alt="WhatsApp"
                className="size-5 shrink-0 brightness-0 dark:invert"
              />
              <span className="hidden sm:inline">Contáctanos</span>
            </button>
            <div className="relative sm:hidden">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isMobileMenuOpen}
                aria-label="Abrir menú"
                onClick={() => setIsMobileMenuOpen((previous) => !previous)}
                className={`${iconItem} ${itemIdle}`}
              >
                <MaterialIcon icon={isMobileMenuOpen ? "close" : "menu"} className="text-lg" />
              </button>
              {isMobileMenuOpen && (
                <ul className="absolute right-0 top-full z-50 mt-2 min-w-60 space-y-1 rounded-2xl border border-base-300/70 bg-base-100/95 p-2 text-base-content shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-black/70 dark:text-white">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `${itemBase} ${isActive ? itemActive : itemIdle}`
                        }
                      >
                        <MaterialIcon icon={item.icon} className="text-lg" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
