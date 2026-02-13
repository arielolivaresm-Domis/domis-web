import { useState } from 'react';
// Quitamos 'Info' que no se usaba para limpiar el error de TS
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, MessageCircle } from 'lucide-react';
import Section from './layout/Section';

// Declaración para que TypeScript acepte el sensor de Google
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function Sourcing() {
  const handleWhatsApp = (tipo: string, cantidad: number, meters: number, total: number) => {
    // --- Sensor de Google Analytics ---
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cotizacion_sourcing', {
        'event_category': 'Conversion',
        'event_label': `Sourcing ${tipo}`,
        'value': total,
        'cantidad_propiedades': cantidad,
        'metros_cuadrados': meters
      });
    }

    const telefono = "56929901343"; 
    const mensaje = `Hola DOMIS™, configuré un Pack Sourcing ${tipo} por ${cantidad} propiedades de ${meters}m². Inversión: $${total.toLocaleString()} + IVA. ¡Vamos por mí!`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <Section id="sourcing" className="py-0 md:py-12 lg:py-24 px-0 md:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="text-center mb-8 md:mb-16 relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
          <Search size={16} className="text-cyan-400" />
          <span className="text-[11px] md:text-[13px] font-mono text-cyan-400 uppercase tracking-widest font-black">
            Inteligencia de Mercado
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
          Buscamos <span className="text-cyan-400">por ti</span>
        </h2>
        <p className="text-lg md:text-2xl text-slate-300 font-light uppercase tracking-wide">
          Tu tiempo es <span className="text-cyan-500 font-bold italic">Dinero</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-20 items-stretch relative z-10">
        <SourcingNormal onSelect={handleWhatsApp} />
        <SourcingVIP onSelect={handleWhatsApp} />
      </div>

      <div className="max-w-2xl mx-auto text-center border-t border-slate-900 pt-8 md:pt-12 relative z-10 px-4">
        <div className="flex items-center justify-center gap-3 mb-6 text-slate-500">
          <Clock size={18} />
          <p className="text-sm md:text-base italic">
            "Si tu agenda se complica, <span className="text-slate-300 font-bold not-italic">DOMIS™ no se detiene.</span>"
          </p>
        </div>
        <div className="tracking-[0.4em] md:tracking-[0.6em] text-slate-500 text-[11px] md:text-[13px] font-black uppercase">
          VAMOS POR <span className="text-cyan-500">TI</span>
        </div>
      </div>
    </Section>
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
    <div className="bg-slate-900/40 border-y md:border border-white/5 p-4 md:p-6 lg:p-10 rounded-none md:rounded-[2.5rem] hover:border-slate-700 transition-all flex flex-col h-full">
      <div className="min-h-0 md:min-h-[280px]">
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <div className="p-3 bg-slate-800 rounded-xl"><Search className="text-slate-300 w-6 h-6" /></div>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic">Sourcing Normal</h3>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium mb-6 md:mb-8">
          Barremos la red por ti y depuramos opciones digitalmente. <span className="text-white italic">Se auditan las propiedades que selecciones de la terna presentada.</span>
        </p>
      </div>

      <div className="bg-slate-950/80 rounded-xl md:rounded-[2rem] p-4 md:p-6 lg:p-8 border border-slate-800 mb-6 md:mb-8 shadow-xl">
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="text-[12px] font-black uppercase text-slate-500 mb-3 md:mb-4 block tracking-widest flex items-center gap-2"><Calculator size={14} /> Pack Auditoría:</label>
            <div className="flex gap-2">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${cantidad === n ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-3 rounded-xl font-black border-2 text-sm ${cantidad === 3 ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" autoFocus value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 mt-3 md:mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest border border-white/5 text-slate-400">
              <span>Presentamos: <span className="text-white">{presentamos} Prop.</span></span>
              <span><CheckCircle size={12} className="inline mr-1 text-cyan-400" /> Auditamos: {efectiveCantidad}</span>
            </div>
          </div>
          <div>
            <label className="text-[12px] font-black uppercase text-slate-500 mb-3 block tracking-widest">Metraje m²:</label>
            <div className="relative">
                <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-base outline-none focus:border-cyan-500 transition-all" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-xs font-bold">M²</span>
            </div>
          </div>
          <div className="pt-3 md:pt-4 border-t border-slate-800 flex justify-between items-center text-cyan-400 font-mono font-black text-lg">
            <span className="text-[10px] text-slate-500 uppercase">Total Est:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('Normal', efectiveCantidad, effectiveMeters, total)} className="w-full mt-auto bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-4 md:py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3">
        <MessageCircle size={18} /> Seleccionar Normal
      </button>
    </div>
  );
}

function SourcingVIP({ onSelect }: { onSelect: any }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = Math.max(1, cantidad === 3 ? cantidadCustom : cantidad);
  const effectiveMeters = Math.max(100, meters);
  const visitamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const labels = efectiveCantidad === 1 ? "2" : efectiveCantidad === 2 ? "3 a 4" : "4 a 5";
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (visitamos * 50000);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-y-2 md:border-2 border-cyan-500/30 p-4 md:p-6 lg:p-10 rounded-none md:rounded-[2.5rem] relative flex flex-col shadow-2xl h-full">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] md:text-[12px] font-black px-6 md:px-8 py-2 md:py-3 rounded-bl-3xl uppercase tracking-widest z-20">Recomendado VIP</div>
      
      <div className="min-h-0 md:min-h-[280px]">
        <div className="flex items-center gap-4 mb-4 md:mb-6 mt-12 md:mt-6 lg:mt-0">
          <div className="p-3 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-7 h-7 animate-pulse" /></div>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic">Sourcing VIP</h3>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium mb-6 md:mb-8">
          Evaluamos en terreno cada opción. Recibes un <span className="text-white font-bold italic underline decoration-cyan-500/50">Informe FAST</span> para comparar estados reales antes de auditar.
        </p>
      </div>

      <div className="bg-slate-950/80 rounded-xl md:rounded-[2rem] p-4 md:p-6 lg:p-8 border border-cyan-900/30 mb-6 md:mb-8 shadow-inner">
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="text-[12px] font-black uppercase text-cyan-500 mb-3 md:mb-4 block tracking-widest flex items-center gap-2"><MapPin size={14} /> Pack Auditoría VIP:</label>
            <div className="flex gap-2">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${cantidad === n ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-3 rounded-xl font-black border-2 text-sm ${cantidad === 3 ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" autoFocus value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-3 md:p-4 mt-3 md:mt-4 space-y-2 md:space-y-3 text-[11px] font-bold uppercase text-slate-300">
              <div className="flex items-center gap-2 text-white">
                <MapPin size={14} className="text-cyan-400" />
                <span>Visitas FAST: <span className="text-cyan-400 font-black">{labels} Prop.</span></span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-cyan-400" />
                <span>Auditamos: <span className="text-white font-black">{efectiveCantidad}</span></span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[12px] font-black uppercase text-cyan-500 mb-3 block tracking-widest">Metraje m²:</label>
            <div className="relative">
                <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border-2 border-cyan-900/30 rounded-xl px-4 py-3 text-white font-mono text-base outline-none focus:border-cyan-400 transition-all" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-900 font-mono text-xs font-bold">M²</span>
            </div>
          </div>
          <div className="pt-3 md:pt-4 border-t border-cyan-900/20 flex justify-between items-center text-white font-mono font-black text-lg">
             <span className="text-[10px] text-cyan-500 uppercase">Total VIP:</span>
             <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('VIP', efectiveCantidad, effectiveMeters, total)} className="w-full mt-auto bg-cyan-500 hover:bg-white text-slate-950 py-4 md:py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
        <MessageCircle size={18} className="inline" /> Activar VIP
      </button>
    </div>
  );
}