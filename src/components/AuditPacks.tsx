import { useState } from 'react';
import { Calculator, Info, MapPin, CheckCircle, FileText, ArrowRight } from 'lucide-react';
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
    <Section id="auditoria-directa" className="py-0 md:py-24 bg-slate-950">
      
      {/* CONTENEDOR MAESTRO:
          - En Móvil: rounded-none, border-x-0 (Cero margen).
          - En Mac: rounded-[4rem], border (Elegancia).
      */}
      <div className="relative overflow-hidden rounded-none md:rounded-[4rem] bg-slate-950 border-y md:border border-white/10 shadow-2xl">
        
        {/* CAPA DE IMAGEN TÉCNICA */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/DOMIS_audi.webp" 
            alt="Auditoría Técnica DOMIS" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        {/* CONTENIDO INTERNO:
            - py-12 px-0 en móvil para que el contenido toque los bordes.
        */}
        <div className="relative z-10 py-12 px-0 md:p-16">
          
          {/* HEADER: px-4 para que el texto no toque el borde del cristal */}
          <div className="text-center mb-12 px-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] md:text-[14px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg shadow-cyan-500/20">
              Fase 2: Auditoría Directa
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              ¿Ya elegiste propiedad? <br/>
              <span className="text-cyan-400">Nosotros la Auditamos</span>
            </h2>
            <p className="text-white/80 font-mono text-[10px] md:text-[13px] uppercase tracking-widest italic bg-white/5 border border-white/10 inline-block px-6 md:px-10 py-3 md:py-4 rounded-full backdrop-blur-md">
              Inspección técnica con instrumental de precisión.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* CARD DEL MOTOR PCF-15™:
                - rounded-none y border-x-0 en móvil.
            */}
            <div className="bg-slate-950/60 backdrop-blur-3xl border-y md:border border-white/10 rounded-none md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
              
              <div className="flex items-center justify-between mb-10">
                <div className="bg-cyan-500 p-4 rounded-xl shadow-lg shadow-cyan-500/20">
                  <Calculator size={28} className="text-slate-950" />
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

              {/* GRILLA DE CARACTERÍSTICAS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 border-b border-white/10 pb-10">
                {[
                  { icon: <CheckCircle size={16}/>, text: `${efectiveCantidad} unidades` },
                  { icon: <MapPin size={16}/>, text: 'Radio 3km Escaneado' },
                  { icon: <FileText size={16}/>, text: 'Certificación 72h' },
                  { icon: <Info size={16}/>, text: 'Asesoría Post-Informe' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-bold uppercase text-[10px] md:text-[11px] tracking-widest">
                    <span className="text-cyan-400">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* INPUTS DE CÁLCULO */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] uppercase text-cyan-500 mb-4 font-black tracking-widest">Unidades Auditoría:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCantidad(num)}
                          className={`py-4 rounded-xl border-2 transition-all font-black text-sm ${
                            cantidad === num ? 'bg-white border-white text-slate-950' : 'bg-slate-900/50 border-white/10 text-white hover:border-cyan-500/50'
                          }`}
                        >
                          {num === 3 ? (cantidad === 3 ? 
                            <input 
                              type="number" 
                              autoFocus
                              value={cantidadCustom} 
                              onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} 
                              className="w-full bg-transparent text-center outline-none" 
                            /> : '3+') : num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-cyan-500 mb-4 font-black tracking-widest">Superficie Total m²:</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={meters}
                        onChange={(e) => setMeters(Number(e.target.value))}
                        onBlur={() => setMeters(Math.max(100, meters))}
                        className="w-full bg-slate-900/50 border-2 border-white/10 rounded-xl px-4 py-4 text-base font-mono text-white focus:border-cyan-400 outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-xs font-bold uppercase">m²</span>
                    </div>
                  </div>
                </div>

                {/* BLOQUE DE PRECIO */}
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
                  className="group flex items-center justify-center gap-4 w-full py-6 font-black uppercase rounded-2xl text-[13px] bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-xl tracking-widest active:scale-95"
                  onClick={() => onNext && onNext()}
                >
                  Configurar Pack Técnico
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>

            <p className="mt-10 px-4 text-center text-white/40 text-[9px] md:text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed italic max-w-lg mx-auto">
              * Mínimo técnico 100 m² por unidad. El informe final se entrega cifrado para validez legal en negociación.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}