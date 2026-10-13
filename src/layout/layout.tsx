import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ContactDrawer } from "../components/contactUs/contactUs";
import { Navbar } from "./navbar";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export const Layout = () => {
  const { pathname } = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const normalized = pathname.replace(/\/$/, "");
  const isHome = normalized === "" || normalized === basename;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Navbar isContactOpen={isContactOpen} onOpenContact={() => setIsContactOpen(true)} />
      <main className="flex min-h-0 flex-1 flex-col">
        <section
          className={`flex-1 min-h-0 overflow-y-auto ${isHome ? "" : "px-4 pb-5 pt-24 md:px-6 md:pb-6 md:pt-28"}`}
        >
          <div className={isHome ? "w-full" : "mx-auto w-full max-w-7xl"}>
            <Outlet />
          </div>
        </section>
      </main>
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default Layout;
