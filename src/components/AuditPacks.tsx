import { useState } from 'react';
import { Calculator, Info, MapPin, CheckCircle, FileText, ArrowRight } from 'lucide-react';

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
    <div className="py-24 mx-4 md:mx-8 my-8 animate-fadeIn bg-slate-950 relative overflow-hidden rounded-[3rem]">
      
      {/* CAPA DE FONDO: INTEGRACIÓN TOTAL */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/DOMIS_audi.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-slate-950/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        {/* HEADER DE SECCIÓN ACTUALIZADO */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg shadow-cyan-500/20">
            Fase 1: Auditoría Directa
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter drop-shadow-2xl leading-tight">
            ¿Ya elegiste tu propiedad? <br/>
            <span className="text-cyan-400">Nosotros la Auditamos</span>
          </h2>
          <p className="text-white/60 font-mono text-[10px] uppercase tracking-widest mt-4 italic bg-white/5 border border-white/10 inline-block px-6 py-2 rounded-full backdrop-blur-md">
            Inspección técnica para propiedades ya seleccionadas por el cliente.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* CAJA CENTRAL: CRYSTAL GLASS (5% OPACITY) */}
          <div className="bg-slate-950/5 backdrop-blur-2xl border-2 border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            
            <div className="flex items-center justify-between mb-10">
              <div className="bg-cyan-500 p-4 rounded-2xl shadow-lg shadow-cyan-500/20">
                <Calculator size={24} className="text-slate-950" />
              </div>
              <div className="text-right">
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-md">
                  PCF-15™ Engine
                </h4>
                {discount > 0 && (
                  <p className="text-cyan-400 text-[11px] font-black uppercase tracking-widest mt-1">
                    Beneficio: {discount}% OFF Aplicado
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 border-b border-white/10 pb-10">
              {[
                { icon: <CheckCircle size={14}/>, text: `Pack: ${efectiveCantidad} unidades` },
                { icon: <MapPin size={14}/>, text: 'Radio 3km Escaneado' },
                { icon: <FileText size={14}/>, text: 'Certificación 72h' },
                { icon: <Info size={14}/>, text: 'Asesoría Post-Informe' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80 font-bold uppercase text-[9px] tracking-widest">
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase text-cyan-500 mb-4 font-black tracking-widest">Unidades Auditoría:</label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCantidad(num)}
                        className={`flex-1 py-4 rounded-xl border-2 transition-all font-black text-sm ${
                          cantidad === num ? 'bg-white border-white text-slate-950' : 'bg-slate-950/40 border-white/10 text-white hover:border-cyan-500/50'
                        }`}
                      >
                        {num === 3 ? (cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} className="w-full bg-transparent text-center outline-none" /> : '3+') : num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-cyan-500 mb-4 font-black tracking-widest">Superficie (m²):</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={meters}
                      onChange={(e) => setMeters(Number(e.target.value))}
                      onBlur={() => setMeters(Math.max(100, meters))}
                      className="w-full bg-slate-950/40 border-2 border-white/10 rounded-xl px-4 py-4 text-sm font-mono text-white focus:border-cyan-400 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-xs font-bold uppercase">m²</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 rounded-2xl p-6 border-2 border-cyan-500/20 text-center">
                <span className="text-[10px] uppercase text-cyan-400 font-black tracking-[0.2em] mb-2 block">Inversión Estimada Auditoría</span>
                <div className="text-3xl md:text-4xl font-mono text-white font-black tracking-tighter drop-shadow-lg">
                  ${totalCost.toLocaleString()} <span className="text-sm opacity-50">+ IVA</span>
                </div>
              </div>

              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center gap-4 w-full py-6 font-black uppercase rounded-2xl text-xs bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-2xl tracking-[0.2em] active:scale-95"
                onClick={() => onNext && onNext()}
              >
                Configurar Pack Técnico
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-lg mx-auto italic">
            * Mínimo técnico 100 m² por unidad. El informe final se entrega en formato digital cifrado para validez legal en negociación.
          </p>
        </div>
      </div>
    </div>
  );
}