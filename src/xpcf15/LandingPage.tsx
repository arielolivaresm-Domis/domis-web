import React from 'react';

interface LandingProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-6 font-mono">
      
      {/* Fondo de Seguridad (Líneas rojas sutiles) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10 pointer-events-none"></div>

      <div className="max-w-2xl w-full z-10 text-center space-y-10 animate-fade-in border border-slate-800 bg-slate-900/80 p-12 rounded-3xl shadow-2xl backdrop-blur-sm">
        
        {/* Badge de Seguridad */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Restricted Access • Internal Use Only
        </div>

        {/* Título Industrial */}
        <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
            DOMIS <span className="text-slate-500">///</span> PCF-15™
            </h1>
            <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">Property Cash Flow System v3.0</p>
        </div>
        
        {/* Advertencia Legal */}
        <div className="text-left bg-slate-950 p-6 rounded-xl border-l-4 border-amber-600">
            <h3 className="text-amber-500 font-bold text-xs uppercase mb-2">⚠ Aviso de Confidencialidad</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
            Este software contiene algoritmos financieros propietarios y secretos comerciales de <strong>DOMIS Engineering</strong>. 
            El acceso está estrictamente limitado a auditores certificados. Cualquier intento de acceso no autorizado, copia o ingeniería inversa será perseguido legalmente.
            </p>
        </div>

        {/* Botón de Acceso */}
        <div className="pt-4">
          <button 
            onClick={onEnter}
            className="w-full group relative px-8 py-5 bg-white hover:bg-slate-200 text-slate-950 font-black text-sm uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
          >
            <span className="text-xl">🔐</span> Iniciar Sesión Segura
          </button>
          <p className="mt-4 text-[10px] text-slate-600">
            ID de Sesión: {new Date().getTime().toString(36).toUpperCase()} • IP Logged
          </p>
        </div>

      </div>

      <footer className="absolute bottom-6 text-[10px] text-slate-700 uppercase tracking-widest text-center w-full">
        © 2026 Domis Engineering • Santiago, Chile • <span className="text-red-900">Propiedad Privada</span>
      </footer>
    </div>
  );
};