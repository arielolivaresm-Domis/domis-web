import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info, MessageCircle } from 'lucide-react';

export default function Sourcing() {
  const handleWhatsApp = (tipo: string, cantidad: number, meters: number, total: number) => {
    const telefono = "569XXXXXXXX"; 
    const mensaje = `Hola DOMIS™, configuré un Pack Sourcing ${tipo} para ${cantidad} propiedades de ${meters}m². Inversión: $${total.toLocaleString()} + IVA. Solicito activar Protocolo de Agilidad.`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Módulo Sourcing</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Buscamos <span className="text-cyan-400">por ti</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold">Dinero</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <SourcingNormal onSelect={handleWhatsApp} />
          <SourcingVIP onSelect={handleWhatsApp} />
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 shadow-xl">
          <Clock className="text-slate-500 w-6 h-6 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400 leading-relaxed italic">
            <span className="text-slate-300 font-bold not-italic">Nota de Eficiencia:</span> Para asegurar oportunidades de mercado, si no es posible coordinar visita conjunta, 
            <span className="mx-1 font-bold not-italic text-white"> DOMIS™ realizará la inspección técnica de forma autónoma</span> 
            presentando los informes para no detener la velocidad de la negociación.
          </p>
        </div>
      </div>
    </section>
  );
}

function SourcingNormal({ onSelect }: { onSelect: any }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (efectiveCantidad * 60000);

  return (
    <div className="bg-slate-900/50 border border-white/10 p-10 rounded-3xl hover:border-slate-600 transition-all flex flex-col group">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-slate-800 rounded-xl"><Search className="text-slate-300 w-6 h-6" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing Normal</h3>
      </div>
      <p className="text-slate-400 text-sm mb-8 leading-relaxed">Filtramos el mercado digitalmente. Eliges tu favorita y nosotros la auditamos. <span className="text-slate-200">Ideal para control total y eficiencia técnica.</span></p>

      <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 mb-8 mt-auto">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block tracking-widest flex items-center gap-1"><Calculator size={10} /> Propiedades:</label>
            <div className="flex gap-2">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
              <div className="flex-1 relative">
                <button onClick={() => setCantidad(3)} className={`w-full py-3 rounded-xl font-black border-2 ${cantidad === 3 ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>
                   {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block">Metraje (m²):</label>
            <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono" />
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest"><Info size={10} className="inline mr-1" /> Inversión:</span>
            <span className="text-cyan-400 font-mono font-black text-xl">${total.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('Normal', efectiveCantidad, effectiveMeters, total)} className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
        <MessageCircle size={14} /> Seleccionar Pack
      </button>
    </div>
  );
}

function SourcingVIP({ onSelect }: { onSelect: any }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  const visitamos = efectiveCantidad + 1;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (visitamos * 50000);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/30 p-10 rounded-3xl relative overflow-hidden flex flex-col shadow-2xl">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-5 py-2 rounded-bl-xl uppercase tracking-widest">Recomendado</div>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-6 h-6" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing VIP</h3>
      </div>
      <p className="text-slate-400 text-sm mb-8 leading-relaxed">Visitamos físicamente cada opción y entregamos <span className="text-white">Informe FAST</span>. Tomas decisiones basadas en evidencia real.</p>

      <div className="bg-slate-950/80 rounded-2xl p-6 border border-cyan-900/20 mb-8 mt-auto shadow-inner">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-cyan-500 mb-3 block tracking-widest"><Calculator size={10} className="inline mr-1" /> Propiedades:</label>
            <div className="flex gap-2">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-3 rounded-xl font-black border-2 ${cantidad === 3 ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none font-black" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 mt-4 space-y-1 text-[9px] uppercase font-bold text-slate-300">
              <div className="flex items-center gap-2"><MapPin size={10} className="text-cyan-400" /><span>Visitamos: {visitamos} propiedades</span></div>
              <div className="flex items-center gap-2"><CheckCircle size={10} className="text-cyan-400" /><span>Tú eliges: {efectiveCantidad}</span></div>
              <div className="flex items-center gap-2"><FileText size={10} className="text-cyan-400" /><span>Auditoría completa: {efectiveCantidad}</span></div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-cyan-500 mb-3 block">Metraje (m²):</label>
            <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border border-cyan-900/30 rounded-xl px-4 py-3 text-white font-mono" />
          </div>
          <div className="pt-4 border-t border-cyan-900/20 flex justify-between items-center">
            <span className="text-xs font-black text-cyan-500 uppercase">Inversión VIP:</span>
            <span className="text-white font-mono font-black text-xl">${total.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('VIP', efectiveCantidad, effectiveMeters, total)} className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
        <Crown size={14} /> Seguridad VIP
      </button>
    </div>
  );
}