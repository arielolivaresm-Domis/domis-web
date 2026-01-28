import { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

export default function AuditPacks({ onNext }: { onNext?: () => void }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
   
  // Calcular precio por m² según cantidad
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const discount = cantidad === 1 ? 0 : cantidad === 2 ? 10 : 20;
   
  // Calcular costo total
  const totalCost = efectiveCantidad * effectiveMeters * pricePerM2;

  // Generar mensaje de WhatsApp
  const whatsappMessage = `Hola, equipo DOMIS™. Quiero información sobre auditoría de ${efectiveCantidad} ${efectiveCantidad === 1 ? 'propiedad' : 'propiedades'} de ${effectiveMeters}m² cada una. Total estimado: $${totalCost.toLocaleString()} + IVA`;
  const whatsappUrl = `https://wa.me/56929901343?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="py-12 animate-fadeIn bg-slate-950">
      <div className="text-center mb-16">
        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
          Selección de <span className="text-cyan-400">Protocolo de Auditoría</span>
        </h3>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2 italic">
          Mínimo técnico de 100 m² por propiedad.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-slate-950 border-2 border-cyan-500 rounded-3xl p-8 shadow-2xl">
           
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-3xl">🔍</span>
            </div>
            <div className="text-right">
              <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">
                Auditoría PCF-15™
              </h4>
              {discount > 0 && (
                <p className="bg-red-950/60 text-red-400 border-2 border-red-500 px-3 py-1 rounded-full animate-pulse text-xs shadow-[0_0_20px_rgba(239,68,68,0.5)] inline-block mt-2 font-mono uppercase tracking-widest font-bold">
                  {discount}% OFF
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Auditoría técnica profesional para {efectiveCantidad === 1 ? 'tu propiedad' : `${efectiveCantidad} propiedades`}. 
            Sistema PCF-15™ con scoring 0-7 y entrega en máximo 3 días.
          </p>

          {/* CALCULADORA */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator size={16} className="text-cyan-400" />
              <span className="text-xs uppercase text-cyan-400 font-bold tracking-widest">Calculadora de Inversión</span>
            </div>

            {/* SELECTOR DE CANTIDAD */}
            <div className="mb-5">
              <label className="block text-xs uppercase text-slate-400 mb-3 font-bold">
                Propiedades a auditar:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCantidad(1)}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all font-black text-lg ${
                    cantidad === 1
                      ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setCantidad(2)}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all font-black text-lg ${
                    cantidad === 2
                      ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  2
                </button>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setCantidad(3)}
                    className={`w-full h-full py-3 rounded-lg border-2 transition-all font-black text-lg ${
                      cantidad === 3
                        ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {cantidad === 3 ? (
                      <input
                        type="number"
                        value={cantidadCustom}
                        onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-transparent text-center outline-none font-black"
                        min="3"
                      />
                    ) : (
                      '3+'
                    )}
                  </button>
                  {cantidad === 3 && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center">
                      <span className="text-[9px] text-cyan-400 font-bold">editable</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[10px] text-slate-500">
                <Info size={10} />
                <span>
                  {cantidad === 1 && 'Pack Individual: $1.900/m²'}
                  {cantidad === 2 && 'Pack Dupla: $1.710/m² (10% OFF)'}
                  {cantidad === 3 && `Pack Inversionista: $1.520/m² (20% OFF) - ${efectiveCantidad} ${efectiveCantidad === 3 ? 'propiedades' : 'propiedades'}`}
                </span>
              </div>
            </div>

            {/* INPUT DE METRAJE */}
            <div className="mb-5">
              <label className="block text-xs uppercase text-slate-400 mb-3 font-bold">
                Metraje por propiedad:
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={meters}
                  onChange={(e) => setMeters(Number(e.target.value))}
                  onBlur={() => setMeters(Math.max(100, meters))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-lg font-mono text-white focus:border-cyan-400 outline-none pr-12"
                  min="100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">m²</span>
              </div>
              {meters < 100 && (
                <p className="text-[10px] text-orange-400 mt-1">Mínimo técnico: 100m² por propiedad</p>
              )}
            </div>

            {/* RESULTADO */}
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Precio por m²:</span>
                <span className="font-mono font-bold text-slate-300">${pricePerM2.toLocaleString()}/m²</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal ({efectiveCantidad}×{effectiveMeters}m²):</span>
                <span className="font-mono font-bold text-slate-300">${totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700 font-black text-cyan-400">
                <span>TOTAL:</span>
                <span className="font-mono text-lg">${totalCost.toLocaleString()} + IVA</span>
              </div>
            </div>
          </div>

          {/* BOTÓN DE ACCIÓN */}
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noreferrer" 
            className="block w-full py-4 font-black uppercase rounded-xl transition-all text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_4px_15px_rgba(6,182,212,0.2)] text-center"
            onClick={() => {
              if (onNext) onNext();
            }}
          >
            Seleccionar Pack
          </a>
        </div>

        {/* INFORMACIÓN ADICIONAL */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs leading-relaxed">
            <span className="text-cyan-400 font-bold">💡 Incluye:</span> Scoring técnico 0-7, escaneo de entorno 3km, 
            informe digital completo en PDF, y asesoría post-auditoría.
          </p>
        </div>
      </div>
    </div>
  );
}