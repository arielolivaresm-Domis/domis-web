import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Section from './layout/Section';

export default function AuditPacks({ onNext }: { onNext?: () => void }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const discount = cantidad === 1 ? 0 : cantidad === 2 ? 10 : 20;
  
  const totalCost = efectiveCantidad * effectiveMeters * pricePerM2;

  const whatsappMessage = `Hola, equipo DOMIS™. Ya elegí propiedad(es) y quiero auditarlas. Son ${efectiveCantidad} de ${effectiveMeters}m² cada una. Total estimado: $${totalCost.toLocaleString()} + IVA`;
  const whatsappUrl = `https://wa.me/56929901343?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Section id="auditoria-directa" className="py-0 md:py-24 bg-slate-950 relative z-30">
      
      <div className="relative overflow-hidden w-full rounded-none md:rounded-[4rem] bg-slate-950 border-y md:border border-white/10 shadow-2xl">
        
        <div className="absolute inset-0 bg-slate-950 z-0"></div>

        <div className="absolute inset-0 z-[1]">
          <img 
            src="/DOMIS_audi.webp" 
            alt="Auditoría" 
            className="w-full h-full object-cover opacity-15 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950"></div>
        </div>

        <div className="relative z-10 py-12 px-0 md:p-16">
          
          <div className="text-center mb-12 px-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] md:text-[14px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg">
              Fase 2: Auditoría Directa
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              ¿Ya elegiste propiedad? <br/>
              <span className="text-cyan-400">Nosotros la Auditamos</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900 border-y md:border border-white/10 rounded-none md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
              
              <div className="flex items-center justify-between mb-10">
                <div className="bg-cyan-500 p-4 rounded-xl shadow-lg">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-950 font-black text-xl">
                    #
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                    PCF-15™ Engine
                  </h4>
                  {discount > 0 && (
                    <p className="text-cyan-400 text-[11px] font-black uppercase tracking-widest mt-1">
                      {discount}% OFF Aplicado
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="px-1">
                    <label className="block text-[11px] uppercase text-cyan-500 mb-4 font-black tracking-widest">Unidades Auditoría:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCantidad(num)}
                          className={`py-4 rounded-xl border-2 transition-all font-black text-sm ${
                            cantidad === num ? 'bg-white border-white text-slate-950 shadow-xl' : 'bg-slate-950 border-white/10 text-white'
                          }`}
                        >
                          {num === 3 && cantidad === 3 ? (
                            <input 
                              type="number" 
                              value={cantidadCustom} 
                              onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} 
                              className="w-full bg-transparent text-center outline-none" 
                            />
                          ) : num === 3 ? '3+' : num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-1">
                    <label className="block text-[11px] uppercase text-cyan-500 mb-4 font-black tracking-widest">Superficie Total m²:</label>
                    <input
                      type="number"
                      value={meters}
                      onChange={(e) => setMeters(Number(e.target.value))}
                      className="w-full bg-slate-950 border-2 border-white/10 rounded-xl px-4 py-4 text-white focus:border-cyan-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="bg-cyan-500/10 rounded-2xl p-6 border border-cyan-500/20 text-center">
                  <span className="text-[9px] uppercase text-cyan-400 font-black tracking-[0.2em] mb-1 block">Inversión Estimada Auditoría</span>
                  <div className="text-3xl font-mono text-white font-black tracking-tighter">
                    ${totalCost.toLocaleString()} <span className="text-xs opacity-50 ml-1">+ IVA</span>
                  </div>
                </div>

                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-4 w-full py-6 font-black uppercase rounded-2xl text-[13px] bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-xl tracking-widest active:scale-95"
                  onClick={() => onNext && onNext()}
                >
                  Configurar Pack Técnico
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
            
            <p className="mt-8 text-center text-white/30 text-[10px] uppercase font-bold tracking-widest px-4">
              * Valores referenciales para Región Metropolitana.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}