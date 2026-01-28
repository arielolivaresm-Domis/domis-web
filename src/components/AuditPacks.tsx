import { useState } from 'react';
import { Calculator, Info, MapPin, CheckCircle, FileText } from 'lucide-react';

export default function AuditPacks({ onNext }: { onNext?: () => void }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
   
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const discount = cantidad === 1 ? 0 : cantidad === 2 ? 10 : 20;
   
  const totalCost = efectiveCantidad * effectiveMeters * pricePerM2;

  const whatsappMessage = `Hola, equipo DOMIS™. Quiero información sobre auditoría de ${efectiveCantidad} ${efectiveCantidad === 1 ? 'propiedad' : 'propiedades'} de ${effectiveMeters}m² cada una. Total estimado: $${totalCost.toLocaleString()} + IVA`;
  const whatsappUrl = `https://wa.me/56929901343?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="py-24 mx-4 md:mx-8 my-8 animate-fadeIn bg-slate-950 relative overflow-hidden rounded-[40px]">
      
      {/* CAPA DE FONDO: DOMIS_audi.webp */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/DOMIS_audi.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* FONDO ULTRA-CLARO (5%) */}
        <div className="absolute inset-0 bg-slate-950/5 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-2xl">
            Selección de <span className="text-cyan-400">Protocolo de Auditoría</span>
          </h3>
          <p className="text-slate-100 font-mono text-xs uppercase tracking-widest mt-2 italic bg-black/40 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            Mínimo técnico de 100 m² por propiedad.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          {/* CAJA CENTRAL ULTRA-TRANSPARENTE (10%) */}
          <div className="bg-slate-950/10 backdrop-blur-xl border-2 border-cyan-500 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
             
            <div className="flex items-center justify-between mb-8">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-3xl">🔍</span>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  Auditoría PCF-15™
                </h4>
                {discount > 0 && (
                  <p className="bg-red-950/60 text-red-400 border-2 border-red-500 px-3 py-1 rounded-full animate-pulse text-[10px] font-bold uppercase tracking-widest mt-2 inline-block">
                    {discount}% OFF
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-8 text-sm text-slate-100 border-b border-slate-500/30 pb-6 font-medium shadow-black drop-shadow-md">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-cyan-400" />
                <span>Protocolo para <strong className="text-white">{efectiveCantidad} {efectiveCantidad === 1 ? 'propiedad' : 'propiedades'}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-cyan-400" />
                <span>Escaneo de entorno (Radio 3km) incluido</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-cyan-400" />
                <span>Informe digital certificado en 72h</span>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-6">
                <Calculator size={16} className="text-cyan-400" />
                <span className="text-xs uppercase text-cyan-400 font-bold tracking-widest">Calculadora de Inversión</span>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase text-slate-300 mb-3 font-bold italic tracking-tighter">Unidades:</label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCantidad(num)}
                      className={`flex-1 py-3 rounded-lg border-2 transition-all font-black text-lg ${
                        cantidad === num ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {num === 3 ? (cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} className="w-full bg-transparent text-center outline-none" /> : '3+') : num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase text-slate-300 mb-3 font-bold italic tracking-tighter">Superficie (m²):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={meters}
                    onChange={(e) => setMeters(Number(e.target.value))}
                    onBlur={() => setMeters(Math.max(100, meters))}
                    className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-lg font-mono text-white focus:border-cyan-400 outline-none placeholder-slate-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">m²</span>
                </div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-700">
                <div className="flex justify-between pt-2 font-black text-cyan-400">
                  <span className="text-xs uppercase tracking-widest">Inversión Estimada:</span>
                  <span className="font-mono text-xl">${totalCost.toLocaleString()} + IVA</span>
                </div>
              </div>
            </div>

            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noreferrer" 
              className="block w-full py-5 font-black uppercase rounded-xl text-sm bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-lg text-center tracking-widest hover:scale-[1.02]"
              onClick={() => onNext && onNext()}
            >
              Seleccionar Pack
            </a>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-slate-100 text-[10px] bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-slate-800 shadow-xl">
              <Info size={12} className="text-cyan-500" />
              <p>Asesoría técnica post-auditoría incluida para la interpretación de resultados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}