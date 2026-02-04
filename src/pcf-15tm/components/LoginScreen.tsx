interface LoginScreenProps {
  password: string;
  setPassword: (pass: string) => void;
  handleLogin: () => void;
  loginError: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ password, setPassword, handleLogin, loginError }) => {
  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md">
      {/* CARD DE ACCESO BÚNKER */}
      <div className="bg-slate-900 border border-white/10 p-10 rounded-2xl text-center shadow-2xl w-full max-w-sm relative overflow-hidden">
        
        {/* EFECTO DE LUZ DECORATIVO */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full"></div>
        
        <h1 className="text-3xl font-black mb-2 flex justify-center items-center gap-2 text-white uppercase italic tracking-tighter relative z-10">
          PCF-15™ <span className="text-emerald-500 not-italic font-medium">Protected</span>
        </h1>
        
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 relative z-10">
          Sistema de Auditoría Restringido
        </p>

        <div className="relative z-10 space-y-4">
          <input
            autoFocus
            type="password"
            className="w-full p-5 bg-slate-950 border border-white/10 rounded-xl text-white text-center text-2xl tracking-[0.5em] font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-800"
            placeholder="••••••"
            maxLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
          >
            Desbloquear Terminal
          </button>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
              <p className="text-red-500 text-[10px] font-black uppercase tracking-wider">
                {loginError}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/5 w-full relative z-10">
          <a 
            href="https://www.domis.cl" 
            className="text-slate-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            ← Volver a Domis.cl
          </a>
        </div>
      </div>
    </div>
  );
};