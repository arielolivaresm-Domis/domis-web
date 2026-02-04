import React from 'react';
import { PORTAL_DATA } from '../constants';

interface PortalSectionProps {
  toggles: Record<string, boolean>;
  setToggles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  desc: string;
  setDesc: (val: string) => void;
  onGenerateAi: () => void;
  isGenerating: boolean;
  className?: string;
}

export const PortalSection: React.FC<PortalSectionProps> = ({
  toggles,
  setToggles,
  desc,
  setDesc,
  onGenerateAi,
  isGenerating,
  className = ''
}) => {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-6 shadow-2xl animate-fade-in ${className}`}>
      {/* Título de Sección Técnica */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-cyan-400 text-sm font-black uppercase tracking-[0.2em] italic">
          🔍 Atributos del Activo Inmobiliario
        </h2>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Módulo de Publicación
        </span>
      </div>
      
      {/* Selección de Categorías (Ambientes, Servicios, Seguridad) */}
      {['AMB', 'SER', 'SEG'].map(catKey => {
          const title = catKey === 'AMB' ? '🏠 Distribución y Ambientes' : catKey === 'SER' ? '🔌 Suministros y Servicios' : '🛡️ Seguridad & Equipamiento';
          const data = catKey === 'AMB' ? PORTAL_DATA.amb : catKey === 'SER' ? PORTAL_DATA.ser : PORTAL_DATA.seg;
          
          return (
              <div key={catKey} className="mb-8 last:mb-0">
                  <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-slate-800"></span> {title}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {data.map(item => (
                          <button
                             key={item}
                             onClick={() => setToggles(prev => ({...prev, [item]: !prev[item]}))}
                             className={`p-2.5 rounded-xl text-[10px] uppercase font-bold tracking-tighter transition-all border ${
                               toggles[item] 
                               ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]' 
                               : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300'
                             }`}
                          >
                              {item}
                          </button>
                      ))}
                  </div>
              </div>
          )
      })}
      
      {/* Área de Redacción Técnica con Soporte IA */}
      <div className="mt-10 pt-8 border-t border-slate-800">
        <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
          📝 Descripción del Auditor (Observaciones Técnicas)
        </h4>
        <div className="relative group">
           <textarea 
               rows={6} 
               className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-slate-200 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none resize-none placeholder:text-slate-800" 
               placeholder="Ingresa los detalles técnicos relevantes para el informe..."
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
           ></textarea>
           
           {/* Botón de IA de Gemini */}
           <button 
               onClick={onGenerateAi}
               disabled={isGenerating}
               className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-black px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-purple-500/20 uppercase tracking-widest"
           >
               {isGenerating ? (
                 <>
                   <span className="animate-spin text-xs">🌀</span> Generando...
                 </>
               ) : (
                 <>
                   <span className="text-xs">✨</span> Perfeccionar con Gemini AI
                 </>
               )}
           </button>
        </div>
        <p className="text-[9px] text-slate-600 mt-3 italic">
          * La IA analizará los puntos marcados y tu descripción para crear un texto profesional de venta.
        </p>
      </div>
    </div>
  );
};