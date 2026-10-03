import { NavLink } from "react-router-dom";
import { MaterialIcon } from "../fragments/materialIcon/MaterialIcon";
import { navBarRoutes as navItems } from "./const/navBarRoutes";
import { useDropdownMenu } from "./hooks/useDropdownMenu";

export const Navbar: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, getNavClassName } = useDropdownMenu();

  return (
    <header className="relative z-40 px-2 md:px-4 pt-5 pb-12">
      <nav className="navbar relative rounded-box shadow-base-300/20 shadow-sm bg-secondary backdrop-blur-md">
        <NavLink
          to="/"
          aria-label="Ir al inicio"
          className="logo-pennant absolute left-1/2 top-0 z-30 -translate-x-1/2 sm:left-20 sm:translate-x-0">
          <span className="logo-pennant__flag">
            <img
              src={`${import.meta.env.BASE_URL}logo_vector.svg`}
              alt="Veeduría Ciudadana por el pueblo de Mosquera"
              className="h-20 w-auto sm:h-22 brightness-0 invert"
            />
          </span>
        </NavLink>
        <div className="navbar-start sm:hidden">
          <div className="relative inline-flex">
            <button
              type="button"
              className="btn btn-outline btn-sm flex items-center py-5"
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Abrir menú"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
              <span className={`${isMobileMenuOpen ? "hidden" : "inline-flex"} items-center gap-1`}>
                <MaterialIcon icon="menu" />
              </span>
              <span className={`${isMobileMenuOpen ? "inline-flex" : "hidden"} items-center gap-1`}>
                <MaterialIcon icon="close" />
              </span>
            </button>
            {isMobileMenuOpen && (
              <ul
                className="menu absolute top-full left-0 z-50 mt-2 min-w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-sm"
                role="menu">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={getNavClassName}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      <MaterialIcon icon={item.icon} className="mr-1 text-base" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="navbar-center absolute left-1/2 hidden sm:flex transform -translate-x-1/2">
          <ul className="menu menu-horizontal gap-2 p-0 text-base rtl:ml-20">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={getNavClassName}>
                  <MaterialIcon icon={item.icon} className="mr-1 text-base" />
                  <span className="hidden xl:inline">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end ml-auto items-center">
          <button className="btn btn-outline border-secondary-content border my-2 ms-1 me-2 flex items-center gap-2">
            <NavLink to="/contact" className="flex items-center gap-1">
              <span className="hidden md:inline me-1 text-secondary-content">Contáctanos</span>
              <img
                  src={`${import.meta.env.BASE_URL}images/social/whatsapp.svg`}
                  alt="Whatever"
                  className="h-5 w-5 text-primary my-auto"
              />
            </NavLink>
          </button>
        </div>
      </nav>
    </header>
  );
};

