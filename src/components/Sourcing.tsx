import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info } from 'lucide-react';

export default function Sourcing() {
  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* FONDO TÉCNICO WIREFRAME */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Inteligencia de Mercado</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Buscamos por ti
          </h2>
          
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold">Dinero</span>
          </p>

          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mt-6">
            Optimiza tu proceso de compra. Elige el nivel de profundidad técnica que necesitas para tomar una decisión inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* OPCIÓN 1: SOURCING NORMAL */}
          <SourcingNormal />

          {/* OPCIÓN 2: SOURCING VIP */}
          <SourcingVIP />
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <Clock className="text-slate-500 w-6 h-6 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400 leading-relaxed italic">
            <span className="text-slate-300 font-bold not-italic">Nota de Eficiencia:</span> Para no perder oportunidades de mercado, si no es posible coordinar una visita conjunta, 
            <span className="mx-1 font-bold not-italic"> DOMIS™</span> realizará la inspección técnica de forma autónoma.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENTE INTERNO: SOURCING NORMAL
// ==========================================
function SourcingNormal() {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  
  // Calcular precio por m² según cantidad
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  
  // Calcular costos
  const auditCost = efectiveCantidad * effectiveMeters * pricePerM2;
  const sourcingFee = efectiveCantidad * 60000;
  const totalCost = auditCost + sourcingFee;

  return (
    <div className="bg-slate-900/50 border border-white/10 p-6 md:p-10 rounded-2xl hover:border-slate-600 transition-all group relative flex flex-col">
      <div className="flex items-center gap-5 mb-6">
        <div className="p-4 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
          <Search className="text-slate-300 w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">Sourcing Normal</h3>
          <p className="text-sm text-cyan-400 font-bold mt-1">Solo auditas la que eliges</p>
        </div>
      </div>
      
      <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
        Filtramos el mercado y te presentamos las mejores opciones <strong>digitalmente</strong>. Tú eliges tu favorita y nosotros la auditamos a fondo.
      </p>

      {/* CALCULADORA COMPACTA */}
      <div className="bg-slate-950/80 rounded-xl p-6 border border-slate-800 mb-6 mt-auto">
        <div className="flex items-center gap-2 mb-6">
          <Calculator size={16} className="text-cyan-400" />
          <span className="text-xs uppercase text-cyan-400 font-bold tracking-widest">Calculadora de Inversión</span>
        </div>

        {/* SELECTOR DE CANTIDAD */}
        <div className="mb-5">
          <label className="block text-xs uppercase text-slate-400 mb-3 font-bold">Propiedades a auditar:</label>
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
            <span>Descuentos: 1 prop = $1.900/m² | 2 props = $1.710/m² (10% OFF) | 3+ props = $1.520/m² (20% OFF)</span>
          </div>
        </div>

        {/* INPUT DE METRAJE */}
        <div className="mb-5">
          <label className="block text-xs uppercase text-slate-400 mb-3 font-bold">Metraje por propiedad:</label>
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

        {/* RESULTADOS */}
        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Auditoría ({efectiveCantidad}×{effectiveMeters}m²):</span>
            <span className="font-mono font-bold text-slate-300">${auditCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Sourcing ({efectiveCantidad} props):</span>
            <span className="font-mono font-bold text-slate-300">${sourcingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-700 font-black text-cyan-400">
            <span>TOTAL:</span>
            <span className="font-mono text-lg">${totalCost.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all">
        Seleccionar Pack
      </button>
    </div>
  );
}

// ==========================================
// COMPONENTE INTERNO: SOURCING VIP
// ==========================================
function SourcingVIP() {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  
  // Calcular precio por m² según cantidad
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  
  // Calcular visitas (siempre +1)
  const visitamos = efectiveCantidad + 1;
  
  // Calcular costos
  const auditCost = efectiveCantidad * effectiveMeters * pricePerM2;
  const sourcingFee = visitamos * 50000;
  const totalCost = auditCost + sourcingFee;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/50 p-6 md:p-10 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all flex flex-col">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
        Recomendado
      </div>

      <div className="flex items-center gap-5 mb-6">
        <div className="p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-xl">
          <Crown className="text-cyan-400 w-8 h-8 animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">Sourcing VIP</h3>
          <p className="text-sm text-cyan-400 font-bold mt-1">Visitamos todas, eliges con datos reales</p>
        </div>
      </div>

      {/* CALCULADORA COMPACTA VIP */}
      <div className="bg-slate-950/80 rounded-xl p-6 border border-cyan-900/50 mb-6 mt-auto">
        <div className="flex items-center gap-2 mb-6">
          <Calculator size={16} className="text-cyan-400" />
          <span className="text-xs uppercase text-cyan-400 font-bold tracking-widest">Calculadora de Inversión</span>
        </div>

        {/* SELECTOR DE CANTIDAD */}
        <div className="mb-5">
          <label className="block text-xs uppercase text-cyan-400 mb-3 font-bold">Propiedades a auditar:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setCantidad(1)}
              className={`flex-1 py-3 rounded-lg border-2 transition-all font-black text-lg ${
                cantidad === 1
                  ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 border-cyan-900 text-slate-400 hover:border-cyan-800'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCantidad(2)}
              className={`flex-1 py-3 rounded-lg border-2 transition-all font-black text-lg ${
                cantidad === 2
                  ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 border-cyan-900 text-slate-400 hover:border-cyan-800'
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
                    : 'bg-slate-800 border-cyan-900 text-slate-400 hover:border-cyan-800'
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
          <div className="flex items-center gap-1 mt-3 text-[10px] text-cyan-400/70">
            <Info size={10} />
            <span>Visitamos {visitamos} propiedades con Informe FAST | Tú eliges {efectiveCantidad} | Auditamos {efectiveCantidad}</span>
          </div>
        </div>

        {/* INPUT DE METRAJE */}
        <div className="mb-5">
          <label className="block text-xs uppercase text-cyan-400 mb-3 font-bold">Metraje por propiedad:</label>
          <div className="relative">
            <input
              type="number"
              value={meters}
              onChange={(e) => setMeters(Number(e.target.value))}
              onBlur={() => setMeters(Math.max(100, meters))}
              className="w-full bg-slate-800 border border-cyan-900 rounded-lg px-4 py-3 text-lg font-mono text-white focus:border-cyan-400 outline-none pr-12"
              min="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">m²</span>
          </div>
          {meters < 100 && (
            <p className="text-[10px] text-orange-400 mt-1">Mínimo técnico: 100m² por propiedad</p>
          )}
        </div>

        {/* DETALLES */}
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 mb-4 space-y-1 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-cyan-400" />
            <span>Visitamos: <strong className="text-white">{visitamos} propiedades</strong> (con Informe FAST)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-cyan-400" />
            <span>Tú eliges: <strong className="text-cyan-400">{efectiveCantidad}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-cyan-400" />
            <span>Auditoría completa: <strong className="text-white">{efectiveCantidad}</strong></span>
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm text-slate-300">
            <span>Auditoría ({efectiveCantidad}×{effectiveMeters}m²):</span>
            <span className="font-mono font-bold text-white">${auditCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-300">
            <span>Sourcing ({visitamos} visitas):</span>
            <span className="font-mono font-bold text-white">${sourcingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-cyan-500/20 font-black text-cyan-400">
            <span>TOTAL:</span>
            <span className="font-mono text-lg">${totalCost.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>

      {/* NOTA EXPLICATIVA */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-6 text-xs text-slate-300">
        <span className="text-cyan-400 font-bold">ℹ️ Informe FAST:</span> Nota rápida (scoring) de cada propiedad para que compares y elijas la mejor.
      </div>

      <button className="w-full bg-cyan-500 hover:bg-white text-slate-950 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]">
        Quiero Seguridad VIP
      </button>
    </div>
  );
}