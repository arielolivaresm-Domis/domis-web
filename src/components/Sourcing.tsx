import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info } from 'lucide-react';

export default function Sourcing() {
  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER - REPLICA FOTO 1 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            BUSCAMOS <span className="text-white">POR TI</span>
          </h2>
          <p className="text-2xl md:text-3xl text-cyan-400 font-bold uppercase tracking-wide mb-6">
            TU TIEMPO ES DINERO
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Optimiza tu proceso de compra. Elige el nivel de profundidad técnica que necesitas para tomar una decisión inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <SourcingNormal />
          <SourcingVIP />
        </div>

        {/* NOTA DE EFICIENCIA GLOBAL */}
        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <Clock className="text-slate-500 w-6 h-6 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400 leading-relaxed italic">
            <span className="text-slate-300 font-bold not-italic">Protocolo de Agilidad Operativa:</span> Para no perder oportunidades de mercado, si no es posible coordinar una visita conjunta, 
            <span className="mx-1 font-bold not-italic text-white"> DOMIS™</span> realizará la inspección técnica de forma autónoma.
          </p>
        </div>
      </div>
    </section>
  );
}

function SourcingNormal() {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  
  const auditCost = efectiveCantidad * effectiveMeters * pricePerM2;
  const sourcingFee = efectiveCantidad * 60000;
  const totalCost = auditCost + sourcingFee;

  return (
    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-2xl flex flex-col relative">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-slate-800 rounded-lg"><Search className="text-slate-300 w-6 h-6" /></div>
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Sourcing Normal</h3>
          <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Solo auditas la que eliges</p>
        </div>
      </div>
      
      <p className="text-slate-400 text-xs mb-8 leading-relaxed">
        Optimizamos tu búsqueda mediante el análisis de datos. Depuramos las opciones digitalmente; tú seleccionas tu favorita y nosotros la auditamos. <span className="text-white">Ideal para liderar tu selección inicial con respaldo de élite.</span>
      </p>

      <div className="bg-slate-950/80 rounded-xl p-6 border border-slate-800 mb-6 mt-auto">
        <div className="flex items-center gap-2 mb-4 text-cyan-400">
          <Calculator size={14} />
          <span className="text-[10px] uppercase font-black tracking-widest">Calculadora de Inversión</span>
        </div>

        <div className="mb-4">
          <label className="text-[9px] uppercase text-slate-500 font-bold mb-2 block">Propiedades a auditar:</label>
          <div className="flex gap-2">
            {[1, 2].map(n => (
              <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-2 rounded-lg border-2 font-black transition-all ${cantidad === n ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-800 text-slate-500'}`}>{n}</button>
            ))}
            <button onClick={() => setCantidad(3)} className={`flex-1 py-2 rounded-lg border-2 font-black transition-all ${cantidad === 3 ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-800 text-slate-500'}`}>
              {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-[9px] uppercase text-slate-500 font-bold mb-2 block">Metraje por propiedad:</label>
          <div className="relative">
            <input type="number" value={meters} onChange={(e) => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white font-mono text-sm" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-mono">m²</span>
          </div>
        </div>

        <div className="space-y-2 text-xs pt-4 border-t border-slate-800">
          <div className="flex justify-between text-slate-400 font-medium">
            <span>Auditoría ({efectiveCantidad}x{effectiveMeters}m²):</span>
            <span className="font-mono text-white">${auditCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-400 font-medium">
            <span>Sourcing ({efectiveCantidad} props):</span>
            <span className="font-mono text-white">${sourcingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 font-black text-cyan-400 text-base">
            <span>TOTAL:</span>
            <span>${totalCost.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all">
        Seleccionar Pack
      </button>
    </div>
  );
}

function SourcingVIP() {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const visitamos = efectiveCantidad + 1;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  
  const auditCost = efectiveCantidad * Math.max(100, meters) * pricePerM2;
  const sourcingFee = visitamos * 50000;
  const totalCost = auditCost + sourcingFee;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/30 p-8 rounded-2xl relative flex flex-col shadow-2xl">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[9px] font-black px-4 py-1.5 rounded-bl-xl uppercase">RECOMENDADO</div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-6 h-6" /></div>
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Sourcing VIP</h3>
          <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Visitamos todas, eliges con datos reales</p>
        </div>
      </div>

      <p className="text-slate-400 text-xs mb-8 leading-relaxed">
        <span className="text-white font-bold italic">Delegación técnica total en terreno.</span> Visitamos físicamente cada opción y entregamos <span className="text-white font-bold">Informe FAST</span>. Tomas decisiones basadas en evidencia real, no en fotos. Con tus informes en mano, seleccionas cuáles auditamos.
      </p>

      <div className="bg-slate-950/80 rounded-xl p-6 border border-cyan-900/20 mb-6 mt-auto">
        <div className="flex items-center gap-2 mb-4 text-cyan-400"><Calculator size={14} /><span className="text-[10px] uppercase font-black tracking-widest">Calculadora de Inversión</span></div>
        
        <div className="mb-4 flex gap-2">
          {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-2 rounded-lg border-2 font-black transition-all ${cantidad === n ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
          <button onClick={() => setCantidad(3)} className={`flex-1 py-2 rounded-lg border-2 font-black transition-all ${cantidad === 3 ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>
            {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
          </button>
        </div>

        <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border border-cyan-900/30 rounded-lg px-4 py-2 text-white font-mono text-sm mb-4" />

        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 mb-4 space-y-2 text-[10px] uppercase font-bold text-slate-300">
          <div className="flex items-center gap-2"><MapPin size={12} className="text-cyan-400" /><span>Visitamos: {visitamos} propiedades (con Informe FAST)</span></div>
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-cyan-400" /><span>Tú eliges: {efectiveCantidad}</span></div>
          <div className="flex items-center gap-2"><FileText size={12} className="text-cyan-400" /><span>Auditoría completa: {efectiveCantidad}</span></div>
        </div>

        <div className="space-y-2 text-xs pt-4 border-t border-cyan-900/20">
          <div className="flex justify-between text-slate-300"><span>Auditoría:</span><span className="font-mono text-white">${auditCost.toLocaleString()}</span></div>
          <div className="flex justify-between text-slate-300"><span>Sourcing ({visitamos} visitas):</span><span className="font-mono text-white">${sourcingFee.toLocaleString()}</span></div>
          <div className="flex justify-between pt-2 font-black text-white text-base"><span>TOTAL:</span><span className="text-cyan-400">${totalCost.toLocaleString()} + IVA</span></div>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 mb-6 text-[10px] text-slate-300 italic">
        <Info size={12} className="inline mr-1 text-cyan-400" /> <span className="text-cyan-400 font-bold">Informe FAST:</span> Nota rápida (scoring) de cada propiedad para que compares y elijas la mejor.
      </div>

      <button className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-cyan-500/20">
        Quiero Seguridad VIP
      </button>
    </div>
  );
}