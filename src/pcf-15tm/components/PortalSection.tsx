import { Sparkles } from 'lucide-react';
import { PORTAL_DATA } from '../constants';

interface PortalSectionProps {
  toggles: Record<string, boolean>;
  setToggles: (val: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
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
    <div className={`bg-slate-900 border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl animate-fade-in ${className}`}>
      
      {/* HEADER DE SECCIÓN */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
        <div className="bg-cyan-500/10 p-2 rounded-lg">
          <Sparkles size={18} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="text-white text-sm font-black uppercase tracking-widest italic">Ficha Portal Inmobiliario</h2>
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tight">Generación de contenido para comercialización</p>
        </div>
      </div>

      {/* MATRIZ DE CARACTERÍSTICAS */}
      {['AMB', 'SER', 'SEG'].map(catKey => {
          const title = catKey === 'AMB' ? 'Ambientes' : catKey === 'SER' ? 'Servicios' : 'Seguridad & Comodidades';
          const data = catKey === 'AMB' ? PORTAL_DATA.amb : catKey === 'SER' ? PORTAL_DATA.ser : PORTAL_DATA.seg;
          
          return (
              <div key={catKey} className="mb-8 last:mb-4">
                  <h4 className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-1 h-3 bg-cyan-500 rounded-full"></span>
                    {title}
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {data.map(item => (
                          <button 
                            key={item} 
                            onClick={() => setToggles(prev => ({...prev, [item]: !prev[item]}))} 
                            className={`px-3 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border ${
                              toggles[item] 
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                              : 'bg-slate-950 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300'
                            }`}
                          >
                              {item}
                          </button>
                      ))}
                  </div>
              </div>
          )
      })}

      {/* EDITOR DE DESCRIPCIÓN CON GEMINI AI */}
      <div className="mt-8">
        <h4 className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          Descripción Técnica & Marketing
        </h4>
        
        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
           
           <textarea 
             rows={6} 
             className="relative w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-slate-300 text-xs leading-relaxed font-medium focus:border-cyan-500/50 outline-none transition-all resize-none" 
             placeholder="Describe los puntos fuertes de la propiedad..."
             value={desc} 
             onChange={(e) => setDesc(e.target.value)}
           />
           
           <button 
             onClick={onGenerateAi} 
             disabled={isGenerating} 
             className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-all shadow-lg active:scale-95"
           >
             {isGenerating ? (
               <>
                 <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                 Procesando...
               </>
             ) : (
               <>
                 <Sparkles size={12} />
                 Mejorar con Gemini AI™
               </>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};