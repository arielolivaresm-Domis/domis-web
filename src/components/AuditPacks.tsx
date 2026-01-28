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
    <div className="py-24 animate-fadeIn bg-slate-950 relative overflow-hidden">
      
      {/* IMAGEN DE FONDO: DOMIS_audi.webp */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/DOMIS_audi.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Selección de <span className="text-cyan-400">Protocolo de Auditoría</span>
          </h3>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2 italic">
            Mínimo técnico de 100 m² por propiedad.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-cyan-500 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
             
            {/* HEADER CON DESCUENTO DINÁMICO */}
            <div className="flex items-center justify-between mb-8">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-3xl">🔍</span>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  Auditoría PCF-15™
                </h4>
                {discount > 0 && (
                  <p className="bg-red-950/60 text-red-400 border-2 border-red-500 px-3 py-1 rounded-full animate-pulse text-xs font-bold uppercase tracking-widest mt-2 inline-block">
                    {discount}% OFF
                  </p>
                )}
              </div>
            </div>

            {/* LISTADO TÉCNICO (Usando los iconos para limpiar warnings) */}
            <div className="space-y-3 mb-8 text-sm text-slate-300 border-b border-slate-800/50 pb-6">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-cyan-400" />
                <span>Análisis para <strong className="text-white">{efectiveCantidad} {efectiveCantidad === 1 ? 'propiedad' : 'propiedades'}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-cyan-400" />
                <span>Escaneo de entorno (Radio 3km) incluido</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-cyan-400" />
                <span>Entrega de Informe PCF-15™ en <strong className="text-white">72 horas</strong></span>
              </div>
            </div>

            {/* CALCULADORA */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Calculator size={16} className="text-cyan-400" />
                <span className="text-xs uppercase text-cyan-400 font-bold tracking-widest">Calculadora de Inversión</span>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase text-slate-400 mb-3 font-bold">Unidades a Auditar:</label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCantidad(num)}
                      className={`flex-1 py-3 rounded-lg border-2 transition-all font-black text-lg ${
                        cantidad === num ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {num === 3 ? (cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} className="w-full bg-transparent text-center outline-none" /> : '3+') : num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase text-slate-400 mb-3 font-bold">Superficie (m²):</label>
                <input
                  type="number"
                  value={meters}
                  onChange={(e) => setMeters(Number(e.target.value))}
                  onBlur={() => setMeters(Math.max(100, meters))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-lg font-mono text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="bg-slate-950/50 rounded-xl p-4 space-y-2 border border-slate-800">
                <div className="flex justify-between text-sm text-slate-400 italic">
                  <span>Inversión por m²:</span>
                  <span>${pricePerM2.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700 font-black text-cyan-400">
                  <span>TOTAL ESTIMADO:</span>
                  <span className="font-mono text-xl">${totalCost.toLocaleString()} + IVA</span>
                </div>
              </div>
            </div>

            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noreferrer" 
              className="block w-full py-5 font-black uppercase rounded-xl text-sm bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-lg text-center tracking-widest"
              onClick={() => onNext && onNext()}
            >
              Seleccionar Pack
            </a>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-slate-400 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <Info size={14} className="text-cyan-500" />
              <p>Asesoría post-auditoría incluida para interpretación de resultados técnicos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}