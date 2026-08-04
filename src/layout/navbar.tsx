import { NavLink } from "react-router-dom";
import { MaterialIcon } from "../fragments/MaterialIcon";
import { navBarRoutes as navItems } from "./const/navBarRoutes";
import { useDropdownMenu } from "./hooks/useDropdownMenu";

export const Navbar: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, getNavClassName } = useDropdownMenu();

  return (
    <header className="px-6 py-5">
      <nav className="navbar relative rounded-box shadow-base-300/20 shadow-sm">
        <div className="navbar-start md:hidden">
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

        <div className="navbar-center absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <ul className="menu menu-horizontal gap-2 p-0 text-base rtl:ml-20">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={getNavClassName}>
                  <MaterialIcon icon={item.icon} className="mr-1 text-base" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end ml-auto items-center">
          <button className="btn btn-outline my-2 ms-1 me-2 flex items-center gap-1">
            <NavLink to="/contact" className="flex items-center gap-1">
              <span>Contáctanos</span>
              <MaterialIcon icon="arrow_outward" />
            </NavLink>
          </button>
        </div>
      </nav>
    </header>
  );
};
