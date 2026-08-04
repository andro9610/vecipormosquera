import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export const Layout = () => {
  return (
    <>
      <div className="relative mx-auto flex min-h-[calc(100vh-1.5rem)] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-100 h-75 bg-amber-400/10 blur-[100px] pointer-events-none rounded-full" />
        <main className="relative z-10 flex min-h-0 flex-1 flex-col">
          <Navbar />
          <section className="flex-1 min-h-0 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;
