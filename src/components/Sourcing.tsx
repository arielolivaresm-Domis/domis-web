import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info, MessageCircle } from 'lucide-react';

export default function Sourcing() {
  const handleWhatsApp = (tipo: string, cantidad: number, meters: number, total: number) => {
    const telefono = "56929901343"; 
    const mensaje = `Hola DOMIS™, configuré un Pack Sourcing ${tipo} por ${cantidad} propiedades de ${meters}m². Inversión: $${total.toLocaleString()} + IVA. ¡Vamos por mí!`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={16} className="text-cyan-400" />
            <span className="text-[13px] font-mono text-cyan-400 uppercase tracking-widest font-black">Inteligencia de Mercado</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            Buscamos <span className="text-cyan-400">por ti</span>
          </h2>
          <p className="text-2xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold italic">Dinero</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          <SourcingNormal onSelect={handleWhatsApp} />
          <SourcingVIP onSelect={handleWhatsApp} />
        </div>

        {/* PIE DE PÁGINA */}
        <div className="max-w-2xl mx-auto text-center border-t border-slate-900 pt-12">
          <div className="flex items-center justify-center gap-3 mb-6 text-slate-500">
            <Clock size={18} />
            <p className="text-base italic">
              "Si tu agenda se complica, <span className="text-slate-300 font-bold not-italic">DOMIS™ no se detiene.</span>"
            </p>
          </div>
          <div className="tracking-[0.6em] text-slate-500 text-[13px] font-black uppercase">
            VAMOS POR <span className="text-cyan-500">TI</span>
          </div>
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
  const presentamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (efectiveCantidad * 60000);

  return (
    <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-slate-700 transition-all flex flex-col group">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-slate-800 rounded-xl"><Search className="text-slate-300 w-7 h-7" /></div>
        <h3 className="text-3xl font-black text-white uppercase italic">Sourcing Normal</h3>
      </div>
      
      {/* TEXTO ACTUALIZADO FASE 1 NORMAL */}
      <p className="text-slate-300 text-base mb-10 leading-relaxed font-medium">
        Barremos la red por ti y depuramos opciones digitalmente. Tú decides qué auditamos a fondo con nuestro respaldo técnico. <span className="text-white italic">En esta modalidad, se auditan únicamente las propiedades que selecciones de la terna presentada.</span>
      </p>

      <div className="bg-slate-950/80 rounded-[2.5rem] p-10 border border-slate-800 mb-8 mt-auto shadow-xl">
        <div className="space-y-8">
          <div>
            <label className="text-[14px] font-black uppercase text-slate-500 mb-5 block tracking-widest flex items-center gap-2"><Calculator size={14} /> Pack Auditoría:</label>
            <div className="flex gap-3">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-4 rounded-xl font-black text-base transition-all border-2 ${cantidad === n ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-4 rounded-xl font-black border-2 text-base ${cantidad === 3 ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-4 mt-6 flex items-center justify-between text-[11px] font-black uppercase tracking-widest border border-white/5 text-slate-400">
              <span>Presentamos: <span className="text-white">{presentamos} Propiedades</span></span>
              <span><CheckCircle size={14} className="inline mr-1 text-cyan-400" /> Auditamos: {efectiveCantidad}</span>
            </div>
          </div>
          <div>
            <label className="text-[14px] font-black uppercase text-slate-500 mb-4 block tracking-widest">Metraje (m²):</label>
            <div className="relative">
                <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl px-6 py-4 text-white font-mono text-lg focus:border-cyan-500 outline-none transition-all" />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-sm font-bold">M²</span>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-cyan-400 font-mono font-black text-xl">
            <span className="text-[12px] text-slate-500 uppercase flex items-center gap-1"><Info size={14} /> Total Est:</span>
            <span>${total.toLocaleString()} <span className="text-xs opacity-50">+ IVA</span></span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('Normal', efectiveCantidad, effectiveMeters, total)} className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-6 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg">
        <MessageCircle size={18} /> Seleccionar Pack Normal
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
  const visitamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const labels = efectiveCantidad === 1 ? "2" : efectiveCantidad === 2 ? "3 a 4" : "4 a 5";
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (visitamos * 50000);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/30 p-10 rounded-[2.5rem] relative flex flex-col shadow-2xl overflow-hidden group">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[12px] font-black px-8 py-3 rounded-bl-3xl uppercase tracking-widest shadow-xl">Recomendado VIP</div>
      <div className="flex items-center gap-4 mb-6 mt-4 md:mt-0">
        <div className="p-4 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-8 h-8 animate-pulse" /></div>
        <h3 className="text-3xl font-black text-white uppercase italic">Sourcing VIP</h3>
      </div>
      
      {/* TEXTO ACTUALIZADO FASE 1 VIP */}
      <p className="text-slate-300 text-base mb-10 leading-relaxed font-medium">
        Evaluamos en terreno cada opción. Recibes un <span className="text-white font-bold italic underline decoration-cyan-500/50">Informe FAST</span> para comparar estados reales y decidir con total certeza cuáles auditamos. <span className="text-white italic">Visitamos todas las propiedades presentadas y creamos un Informe FAST de cada una para que elijas las que se auditan.</span>
      </p>

      <div className="bg-slate-950/80 rounded-[2.5rem] p-10 border border-cyan-900/30 mb-8 mt-auto shadow-inner">
        <div className="space-y-8">
          <div>
            <label className="text-[14px] font-black uppercase text-cyan-500 mb-5 block tracking-widest flex items-center gap-2"><MapPin size={14} /> Pack Auditoría VIP:</label>
            <div className="flex gap-3">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-4 rounded-xl font-black text-base transition-all border-2 ${cantidad === n ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500 hover:border-cyan-500/30'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-4 rounded-xl font-black border-2 text-base ${cantidad === 3 ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 mt-6 space-y-4 text-[12px] font-bold uppercase tracking-wider text-slate-300">
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center"><MapPin size={14} className="text-cyan-400" /></div>
                <span>Visitas FAST: <span className="text-cyan-400 font-black">{labels} Propiedades</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center"><FileText size={14} className="text-cyan-400" /></div>
                <span>Auditamos a fondo: <span className="text-white font-black">{efectiveCantidad}</span></span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[14px] font-black uppercase text-cyan-500 mb-4 block tracking-widest">Metraje (m²):</label>
            <div className="relative">
                <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border-2 border-cyan-900/30 rounded-xl px-6 py-4 text-white font-mono text-lg focus:border-cyan-400 outline-none transition-all" />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-900 font-mono text-sm font-bold">M²</span>
            </div>
          </div>
          <div className="pt-6 border-t border-cyan-900/20 flex justify-between items-center text-white font-mono font-black text-xl">
             <span className="text-[12px] text-cyan-500 uppercase flex items-center gap-1"><Crown size={14} /> Total VIP:</span>
             <span>${total.toLocaleString()} <span className="text-xs opacity-50 ml-1">+ IVA</span></span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('VIP', efectiveCantidad, effectiveMeters, total)} className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-6 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 active:scale-95">
        <Crown size={18} /> Activar Seguridad VIP
      </button>
    </div>
  );
}