import React from "react";
import { Link } from "react-router-dom";
import { MaterialIcon } from "../fragments/MaterialIcon";
import { Partners } from "./partners";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl bg-white/90 border border-slate-200 overflow-hidden flex flex-col justify-between min-h-[83vh] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-400/10 blur-[100px] pointer-events-none rounded-full" />
        <main className="relative z-10 flex flex-col justify-between min-h-[83vh]">
          <header className="flex items-center justify-between px-6 py-5">
            <nav className="flex items-center flex-wrap gap-2">
              <Link to="/" className="btn btn-outlined my-2 ms-5">
                Inicio
              </Link>
              <Link to="/tools" className="btn btn-outlined my-2 mx-1">
                Herramientas
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <button className="btn btn-outline my-2 ms-1 me-5 flex items-center gap-1">
                Contactanos
                <MaterialIcon icon="arrow_outward" />
              </button>
            </div>
          </header>

          <section className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
        </main>
      </div>
      <Partners />
    </>
  );
};

export default Layout;
