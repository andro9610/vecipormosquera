import React from 'react';
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
  Layers
} from 'lucide-react';

interface NodePointProps {
  name: string;
  value: string;
  position: string;
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const NodePoint: React.FC<NodePointProps> = ({ name, value, position, icon, iconPosition = 'left' }) => {
  return (
    <div className={`absolute ${position} flex items-center space-x-3 text-xs text-neutral-400 z-10`}>
      {iconPosition === 'left' && (
        <div className="w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700/50 flex items-center justify-center text-neutral-200 shadow-lg backdrop-blur-md">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 inline-block"></span>
          <span className="font-semibold text-neutral-200">{name}</span>
        </div>
        <span className="text-[10px] text-neutral-500 pl-2.5">{value}</span>
      </div>
      {iconPosition === 'right' && (
        <div className="w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700/50 flex items-center justify-center text-neutral-200 shadow-lg backdrop-blur-md">
          {icon}
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-4 md:p-8 font-sans selection:bg-neutral-700">
      {/* Container Principal con bordes redondeados y fondo con gradiente suave */}
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl bg-neutral-950/80 border border-neutral-800/60 overflow-hidden flex flex-col justify-between min-h-[85vh] shadow-2xl">
        
        {/* Luces de fondo (Glow effects) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-slate-400/10 blur-[100px] pointer-events-none rounded-full" />

        {/* 1. Header / Navbar Superior */}
        <header className="relative z-20 flex items-center justify-between px-6 py-5">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin-slow" />
            </div>
          </div>

          {/* Nav Links + FlyonUI styling */}
          <nav className="hidden lg:flex items-center bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-1.5 backdrop-blur-md text-sm space-x-1">
            <a href="#home" className="btn btn-ghost btn-sm rounded-full text-white font-medium hover:bg-neutral-800">Home</a>
            <a href="#defi" className="btn btn-ghost btn-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">DeFi App</a>
            <a href="#assets" className="btn btn-ghost btn-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">Assets</a>
            <a href="#features" className="btn btn-ghost btn-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">Features</a>
            <a href="#pricing" className="btn btn-ghost btn-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">Pricing</a>
            <a href="#faq" className="btn btn-ghost btn-sm rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">FAQ</a>
            
            <div className="h-4 w-px bg-neutral-800 mx-1" />

            <button className="btn btn-xs rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-none px-3 font-normal">
              Protection <ArrowUpRight className="w-3 h-3 ml-1" />
            </button>
            <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </nav>

          {/* User Profile / Create Account */}
          <div className="flex items-center space-x-2">
            <button className="btn btn-ghost text-sm font-medium text-neutral-300 hover:text-white flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>
        </header>

        {/* 2. Hero Content Central */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 my-auto">
          
          {/* Botón superior Play / Video Indicator */}
          <div className="mb-6">
            <button className="w-10 h-10 rounded-full bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-white hover:scale-105 transition-transform backdrop-blur-md">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </button>
          </div>

          {/* Badge 'Unlock Your Assets' */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 mb-8 backdrop-blur-md cursor-pointer hover:border-neutral-700 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Unlock Your Assets Spark!</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white max-w-4xl leading-tight">
            One-click for <span className="text-neutral-400">Asset Defense</span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-sm md:text-base text-neutral-400 max-w-xl font-normal leading-relaxed">
            Dive into the art assets, where innovative blockchain technology meets financial expertise
          </p>

          {/* Botones de Acción (CTAs) */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="btn btn-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white rounded-full px-6 font-medium text-sm flex items-center gap-2">
              Open App <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="btn btn-md bg-white hover:bg-neutral-200 text-black rounded-full px-6 font-semibold text-sm border-none">
              Discover More
            </button>
          </div>
        </main>

        {/* Nodos flotantes decorativos (Layout con líneas imaginarias) */}
        <div className="hidden md:block pointer-events-none">
          <NodePoint 
            name="Cortex" 
            value="20.945" 
            position="top-[25%] left-[10%]" 
            icon={<Triangle className="w-4 h-4" />} 
          />
          <NodePoint 
            name="Quant" 
            value="2.945" 
            position="top-[28%] right-[12%]" 
            icon={<ArrowUpRight className="w-4 h-4" />}
            iconPosition="right" 
          />
          <NodePoint 
            name="Aelf" 
            value="19.346" 
            position="bottom-[30%] left-[8%]" 
            icon={<Share2 className="w-4 h-4" />} 
          />
          <NodePoint 
            name="Meeton" 
            value="440" 
            position="bottom-[32%] right-[10%]" 
            icon={<Hexagon className="w-4 h-4" />}
            iconPosition="right" 
          />
        </div>

        {/* Lines Vertical Accent Lines */}
        <div className="absolute inset-x-0 bottom-20 flex justify-center items-end space-x-12 opacity-30 pointer-events-none h-32">
          <div className="w-[1px] h-24 bg-gradient-to-t from-white to-transparent" />
          <div className="w-[1px] h-16 bg-gradient-to-t from-white to-transparent" />
          <div className="w-[1px] h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* 3. Footer Interno del Hero */}
        <footer className="relative z-20 flex items-center justify-between px-8 py-6">
          {/* Scroll Down Pill */}
          <div className="flex items-center space-x-3 bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 rounded-full text-xs text-neutral-400 backdrop-blur-md">
            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowDown className="w-3 h-3" />
            </div>
            <span>02/03 . Scroll down</span>
          </div>

          {/* Carousel / Indicator bar */}
          <div className="flex flex-col items-end space-y-1">
            <span className="text-xs text-amber-200/90 font-medium">DeFi horizons</span>
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-1 rounded-full bg-white" />
              <div className="w-6 h-1 rounded-full bg-neutral-800" />
              <div className="w-6 h-1 rounded-full bg-neutral-800" />
            </div>
          </div>
        </footer>

      </div>

      {/* 4. Logos de Integraciones (Sponsors/Partners Bar) */}
      <section className="w-full max-w-6xl mx-auto mt-8 px-4 py-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 opacity-60 text-neutral-400 text-sm font-semibold tracking-wider">
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <Triangle className="w-4 h-4 fill-current" />
            <span className="text-base font-bold tracking-tight text-white">Vercel</span>
          </div>
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <span className="text-base font-medium">loom</span>
          </div>
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <span className="bg-white text-black text-xs font-bold px-1.5 py-0.5 rounded">$</span>
            <span className="text-base font-medium">Cash App</span>
          </div>
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <span className="text-base font-medium">Loops</span>
          </div>
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <span className="text-base font-bold">_zapier</span>
          </div>
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <span className="text-base font-semibold italic">ramp</span>
          </div>
          <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity">
            <Layers className="w-4 h-4" />
            <span className="text-base font-medium">Raycast</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layout;