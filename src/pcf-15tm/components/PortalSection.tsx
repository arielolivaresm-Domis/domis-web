import React from 'react';
import { PORTAL_DATA } from '../constants.ts';

interface PortalSectionProps {
  toggles: Record<string, boolean>;
  setToggles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  desc: string;
  setDesc: (val: string) => void;
  onGenerateAi: () => void;
  isGenerating: boolean;
  className?: string;
}

export const PortalSection: React.FC<PortalSectionProps> = ({ toggles, setToggles, desc, setDesc, onGenerateAi, isGenerating, className = '' }) => {
  return (
    <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg animate-fade-in ${className}`}>
      <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">🔍 Ficha Portal Inmobiliario</h2>
      {['AMB', 'SER', 'SEG'].map(catKey => {
          const title = catKey === 'AMB' ? '🏠 AMBIENTES' : catKey === 'SER' ? '🔌 SERVICIOS' : '🛡️ SEGURIDAD & COMODIDADES';
          const data = catKey === 'AMB' ? PORTAL_DATA.amb : catKey === 'SER' ? PORTAL_DATA.ser : PORTAL_DATA.seg;
          return (
              <div key={catKey} className="mb-6">
                  <h4 className="text-sky-400 text-sm font-bold border-b border-slate-700 border-dashed pb-1 mb-3">{title}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {data.map(item => (
                          <button key={item} onClick={() => setToggles(prev => ({...prev, [item]: !prev[item]}))} className={`p-2 rounded text-xs transition-colors border ${toggles[item] ? 'bg-blue-600 text-white border-blue-500 font-bold' : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600'}`}>
                              {item}
                          </button>
                      ))}
                  </div>
              </div>
          )
      })}
      <h4 className="text-sky-400 text-sm font-bold border-b border-slate-700 border-dashed pb-1 mb-3 mt-6">📝 DESCRIPCIÓN</h4>
      <div className="relative">
         <textarea rows={6} className="w-full bg-slate-700 border border-slate-600 rounded p-3 text-white focus:border-emerald-500" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
         <button onClick={onGenerateAi} disabled={isGenerating} className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded flex items-center gap-2 disabled:opacity-50">{isGenerating ? 'Generando...' : '✨ Mejorar con Gemini AI'}</button>
      </div>
    </div>
  );
};