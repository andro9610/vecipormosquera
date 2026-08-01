import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl bg-white/90 border border-slate-200 overflow-hidden flex flex-col justify-between min-h-[83vh] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-100 h-75 bg-amber-400/10 blur-[100px] pointer-events-none rounded-full" />
        <main className="relative z-10 flex flex-col justify-between min-h-[83vh]">
          <Navbar />
          <section className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl">
              {children}
              <Outlet />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;
