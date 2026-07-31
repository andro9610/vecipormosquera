import React from "react";
import { Link } from "react-router-dom";
import { MaterialIcon } from "../fragments/materialIcon";
import { Partners } from "./partners";

interface LayoutProps {
  children: React.ReactNode;
}
import {
  ArrowUpRight,
  Play,
  ShieldCheck,
  User,
  ArrowDown,
  Sparkles,
  Share2,
  Triangle,
  Hexagon,
  Layers,
} from "lucide-react";

interface NodePointProps {
  name: string;
  value: string;
  position: string;
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
}

const NodePoint: React.FC<NodePointProps> = ({
  name,
  value,
  position,
  icon,
  iconPosition = "left",
}) => {
  return (
    <div
      className={`absolute ${position} flex items-center space-x-3 text-xs text-slate-500 z-10`}
    >
      {iconPosition === "left" && (
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-lg backdrop-blur-md">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
          <span className="font-semibold text-slate-700">{name}</span>
        </div>
        <span className="text-[10px] text-slate-500 pl-2.5">{value}</span>
      </div>
      {iconPosition === "right" && (
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-lg backdrop-blur-md">
          {icon}
        </div>
      )}
    </div>
  );
};

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
                Contactanos <ArrowUpRight className="w-3 h-3 ml-1" />
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
