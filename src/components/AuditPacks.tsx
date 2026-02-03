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
        {/* HEADER - TEXTOS INCREMENTADOS */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full bg-cyan-500 text-slate-950 text-[14px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg shadow-cyan-500/20">
            Fase 1: Auditoría Directa
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter drop-shadow-2xl leading-tight">
            ¿Ya elegiste tu propiedad? <br/>
            <span className="text-cyan-400">Nosotros la Auditamos</span>
          </h2>
          <p className="text-white/80 font-mono text-[13px] uppercase tracking-widest mt-8 italic bg-white/5 border border-white/10 inline-block px-10 py-4 rounded-full backdrop-blur-md">
            Inspección técnica para propiedades ya seleccionadas por el cliente.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* CAJA CENTRAL */}
          <div className="bg-slate-950/5 backdrop-blur-3xl border-2 border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-12">
              <div className="bg-cyan-500 p-5 rounded-2xl shadow-lg shadow-cyan-500/20">
                <Calculator size={32} className="text-slate-950" />
              </div>
              <div className="text-right">
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter drop-shadow-md">
                  PCF-15™ Engine
                </h4>
                {discount > 0 && (
                  <p className="text-cyan-400 text-[14px] font-black uppercase tracking-widest mt-1">
                    Beneficio: {discount}% OFF Aplicado
                  </p>
                )}
              </div>
            </div>

            {/* GRILLA DE ITEMS - MÁS GRANDES Y SEPARADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 border-b border-white/10 pb-12">
              {[
                { icon: <CheckCircle size={18}/>, text: `Pack: ${efectiveCantidad} unidades` },
                { icon: <MapPin size={18}/>, text: 'Radio 3km Escaneado' },
                { icon: <FileText size={18}/>, text: 'Certificación 72h' },
                { icon: <Info size={18}/>, text: 'Asesoría Post-Informe' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-white font-bold uppercase text-[13px] tracking-widest">
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[14px] uppercase text-cyan-500 mb-5 font-black tracking-widest">Unidades Auditoría:</label>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCantidad(num)}
                        className={`flex-1 py-5 rounded-xl border-2 transition-all font-black text-base ${
                          cantidad === num ? 'bg-white border-white text-slate-950' : 'bg-slate-950/40 border-white/10 text-white hover:border-cyan-500/50'
                        }`}
                      >
                        {num === 3 ? (cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} className="w-full bg-transparent text-center outline-none" /> : '3+') : num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] uppercase text-cyan-500 mb-5 font-black tracking-widest">Superficie (m²):</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={meters}
                      onChange={(e) => setMeters(Number(e.target.value))}
                      onBlur={() => setMeters(Math.max(100, meters))}
                      className="w-full bg-slate-950/40 border-2 border-white/10 rounded-xl px-6 py-5 text-lg font-mono text-white focus:border-cyan-400 outline-none transition-all"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm font-bold uppercase">m²</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 rounded-[2rem] p-8 border-2 border-cyan-500/20 text-center shadow-inner">
                <span className="text-[14px] uppercase text-cyan-400 font-black tracking-[0.2em] mb-3 block">Inversión Estimada Auditoría</span>
                <div className="text-5xl md:text-6xl font-mono text-white font-black tracking-tighter drop-shadow-xl">
                  ${totalCost.toLocaleString()} <span className="text-lg opacity-50 ml-2">+ IVA</span>
                </div>
              </div>

              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center gap-5 w-full py-8 font-black uppercase rounded-[1.5rem] text-[15px] bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-[0_20px_40px_rgba(34,211,238,0.2)] tracking-[0.2em] active:scale-95"
                onClick={() => onNext && onNext()}
              >
                Configurar Pack Técnico
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          <p className="mt-12 text-center text-white/50 text-[13px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xl mx-auto italic">
            * Mínimo técnico 100 m² por unidad. El informe final se entrega en formato digital cifrado para validez legal en negociación.
          </p>
        </div>
      </div>
    </div>
  );
}