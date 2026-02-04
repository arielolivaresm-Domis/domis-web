import React from 'react';

interface LoginScreenProps {
  password: string;
  setPassword: (pass: string) => void;
  handleLogin: () => void;
  loginError: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ password, setPassword, handleLogin, loginError }) => {
  return (
    <div className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-sm relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        <h1 className="text-2xl font-black mb-1 flex justify-center items-center gap-2 text-white italic tracking-tighter uppercase">
          PCF-15™ <span className="font-light text-cyan-400 not-italic">Protected</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] mb-8 uppercase">
          Acceso Auditor Jefe • Aries
        </p>

        <div className="space-y-4">
          <input
            type="password"
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white text-center text-2xl tracking-[0.5em] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-900 placeholder:tracking-normal"
            placeholder="••••••"
            maxLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            autoFocus
          />

          <button
            onClick={handleLogin}
            className="w-full py-4 bg-white hover:bg-cyan-500 text-slate-950 font-black rounded-xl transition-all active:scale-95 uppercase tracking-widest text-[11px] shadow-lg shadow-cyan-500/5"
          >
            Validar Identidad
          </button>
        </div>

        {loginError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-500 text-xs font-bold uppercase tracking-tighter italic text-center">
              ⚠️ {loginError}
            </p>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-slate-800/50 w-full">
          <a 
            href="https://www.domis.cl" 
            className="text-slate-600 hover:text-cyan-400 text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 font-bold"
          >
            ← Cancelar y salir
          </a>
        </div>
      </div>

      <p className="mt-8 text-slate-800 text-[9px] uppercase tracking-[0.6em] font-black">
        DOMIS™ Engineering Division • Key: D2026s
      </p>
    </div>
  );
};