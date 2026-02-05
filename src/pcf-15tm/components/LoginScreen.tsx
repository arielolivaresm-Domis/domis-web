import React from 'react';

interface LoginScreenProps {
  password: string;
  setPassword: (pass: string) => void;
  handleLogin: () => void;
  loginError: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ password, setPassword, handleLogin, loginError }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-600 p-10 rounded-xl text-center shadow-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2 flex justify-center items-center gap-2 text-white">
          PCF-15™ <span className="font-light text-emerald-400">Protected</span>
        </h1>
        <p className="text-slate-400 text-sm mb-6">SISTEMA PRIVADO - INGRESO RESTRINGIDO</p>
        <input
          type="password"
          className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white text-center text-xl tracking-[0.3em] mb-4 focus:border-emerald-500 outline-none"
          placeholder="A1234z"
          maxLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-emerald-950 font-bold rounded-lg transition-colors"
        >
          DESBLOQUEAR
        </button>
        {loginError && <p className="text-red-500 font-bold mt-4">{loginError}</p>}
        
        <div className="mt-6 pt-6 border-t border-slate-700 w-full">
          <a href="/" className="text-slate-500 hover:text-emerald-400 text-xs transition-colors flex items-center justify-center gap-2">
               ⬅ Volver a Sitio Web Domis.cl
          </a>
        </div>
      </div>
    </div>
  );
};