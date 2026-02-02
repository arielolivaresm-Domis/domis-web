import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info } from 'lucide-react';

export default function Sourcing() {
  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Inteligencia de Mercado</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 italic">Buscamos por ti</h2>
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold">Dinero</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <SourcingNormal />
          <SourcingVIP />
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <Clock className="text-cyan-500 w-6 h-6 flex-shrink-0 mt-0.5" />
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
  const totalCost = (efectiveCantidad * effectiveMeters * (cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520)) + (efectiveCantidad * 60000);

  return (
    <div className="bg-slate-900/50 border border-white/10 p-6 md:p-10 rounded-2xl hover:border-slate-600 transition-all flex flex-col">
      <div className="flex items-center gap-5 mb-6">
        <div className="p-4 bg-slate-800 rounded-xl"><Search className="text-slate-300 w-8 h-8" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing Normal</h3>
      </div>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">Optimizamos tu búsqueda mediante el análisis de datos. Depuramos las opciones digitalmente; tú seleccionas tu favorita y nosotros la auditamos. <span className="text-white font-bold">Ideal para liderar tu selección inicial con respaldo de élite.</span></p>

      <div className="bg-slate-950/80 rounded-xl p-6 border border-slate-800 mb-6 mt-auto">
        <div className="flex items-center gap-2 mb-4"><Calculator size={14} className="text-cyan-400" /><span className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest">Calculadora</span></div>
        <div className="mb-4">
          <div className="flex gap-2">
            {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-2 rounded-lg border-2 font-black ${cantidad === n ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
            <button onClick={() => setCantidad(3)} className={`flex-1 py-2 rounded-lg border-2 font-black ${cantidad === 3 ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-800 text-slate-500'}`}>
              {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" /> : '3+'}
            </button>
          </div>
        </div>
        <div className="relative mb-4">
          <input type="number" value={meters} onChange={(e) => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white font-mono text-sm" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">m²</span>
        </div>
        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-500 uppercase font-black"><Info size={10} className="inline mr-1" /> Total:</span>
          <span className="text-cyan-400 font-black text-lg">${totalCost.toLocaleString()} + IVA</span>
        </div>
      </div>
      <button className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Seleccionar Pack</button>
    </div>
  );
}

function SourcingVIP() {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const visitamos = efectiveCantidad + 1;
  const totalCost = (efectiveCantidad * Math.max(100, meters) * (cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520)) + (visitamos * 50000);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/30 p-6 md:p-10 rounded-2xl relative flex flex-col shadow-2xl">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase">Recomendado</div>
      <div className="flex items-center gap-5 mb-6">
        <div className="p-4 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-8 h-8" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing VIP</h3>
      </div>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">Delegación técnica total en terreno. Visitamos físicamente cada opción y entregamos <span className="text-white font-bold">Informe FAST</span>. Tomas decisiones basadas en evidencia real, no en fotos.</p>

      <div className="bg-slate-950/80 rounded-xl p-6 border border-cyan-900/20 mb-6 mt-auto">
        <div className="flex items-center gap-2 mb-4"><Calculator size={14} className="text-cyan-400" /><span className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest">Inversión VIP</span></div>
        <div className="flex gap-2 mb-4">
          {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-2 rounded-lg border-2 font-black ${cantidad === n ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
          <button onClick={() => setCantidad(3)} className={`flex-1 py-2 rounded-lg border-2 font-black ${cantidad === 3 ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>
            {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" /> : '3+'}
          </button>
        </div>
        <input type="number" value={meters} onChange={(e) => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border border-cyan-900/30 rounded-lg px-4 py-2 text-white font-mono text-sm mb-4" />
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 mb-4 space-y-1 text-[10px] uppercase font-bold text-slate-300">
          <div className="flex items-center gap-2"><MapPin size={12} className="text-cyan-400" /><span>Visitamos: {visitamos} propiedades</span></div>
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-cyan-400" /><span>Tú eliges: {efectiveCantidad}</span></div>
          <div className="flex items-center gap-2"><FileText size={12} className="text-cyan-400" /><span>Auditoría completa: {efectiveCantidad}</span></div>
        </div>
        <div className="pt-3 border-t border-cyan-900/30 flex justify-between items-center">
          <span className="text-white font-black text-lg">${totalCost.toLocaleString()} + IVA</span>
        </div>
      </div>
      <button className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20">Quiero Seguridad VIP</button>
    </div>
  );
}