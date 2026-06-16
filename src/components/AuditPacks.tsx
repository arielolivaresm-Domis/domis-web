import { useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, FileText } from 'lucide-react';
import Section from './layout/Section';

type Modalidad = 'nueva' | 'usada';

const MODALIDADES = [
  { key: 'nueva' as Modalidad, label: 'Propiedad Nueva', desc: 'Pre-recepción / garantía', price: 1800 },
  { key: 'usada' as Modalidad, label: 'Propiedad Usada', desc: 'Compra / venta',           price: 1900 },
];

export default function AuditPacks({ onNext }: { onNext?: () => void }) {
  const [modalidad, setModalidad] = useState<Modalidad>('usada');
  const [meters, setMeters]       = useState(100);

  const effectiveMeters = Math.max(100, meters);
  const currentMod      = MODALIDADES.find(m => m.key === modalidad)!;
  const totalCost       = effectiveMeters * currentMod.price;

  const whatsappMessage = `Hola, equipo DOMIS™. Tengo una propiedad ${modalidad === 'nueva' ? 'nueva (pre-recepción/garantía)' : 'usada'} de ~${effectiveMeters}m² y quiero auditarla. Total estimado: $${totalCost.toLocaleString()} + IVA`;

  const whatsappUrl = `https://wa.me/56929901343?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Section id="auditoria-directa" className="py-0 md:py-14 bg-slate-950 relative z-30">

      <div className="relative overflow-hidden w-full rounded-none md:rounded-[4rem] bg-slate-950 border-y md:border border-white/10 shadow-2xl">

        <div className="absolute inset-0 bg-slate-950 z-0"></div>

        <div className="absolute inset-0 z-[1]">
          <img
            src="/DOMIS_audi.webp"
            alt="Auditoría"
            className="w-full h-full object-cover opacity-15 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950"></div>
        </div>

        <div className="relative z-10 py-8 px-0 md:p-8">

          <div className="text-center mb-6 px-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] md:text-[14px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg">
              Fase 1: Auditoría Técnica PCF-15™
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              ¿Ya elegiste propiedad? <br/>
              <span className="text-cyan-400">Nosotros la Auditamos</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900 border-y md:border border-white/10 rounded-none md:rounded-[2.5rem] p-5 md:p-7 shadow-2xl">

              <div className="flex items-center justify-between mb-5">
                <div className="bg-cyan-500 p-4 rounded-xl shadow-lg">
                  <div className="w-7 h-7 flex items-center justify-center text-slate-950 font-black text-xl">#</div>
                </div>
                <div className="text-right">
                  <h4 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                    PCF-15™ by Domis™
                  </h4>
                </div>
              </div>

              <div className="mb-4 space-y-3 px-1">
                <div className="flex items-start gap-3 text-white/90 text-sm">
                  <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Informe técnico PCF-15™ con hallazgos valorizados en UF</span>
                </div>
                <div className="flex items-start gap-3 text-white/90 text-sm">
                  <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Escenario de entorno (Radio 3km) incluido</span>
                </div>
                <div className="flex items-start gap-3 text-white/90 text-sm">
                  <FileText size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Entrega en 72 horas hábiles</span>
                </div>
              </div>

              <div className="space-y-5">

                {/* MODALIDAD */}
                <div className="px-1">
                  <label className="block text-[11px] uppercase text-cyan-500 mb-2 font-black tracking-widest">Modalidad:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MODALIDADES.map((m) => (
                      <button
                        key={m.key}
                        onClick={() => setModalidad(m.key)}
                        className={`py-2.5 px-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                          modalidad === m.key
                            ? 'bg-white border-white text-slate-950 shadow-xl'
                            : 'bg-slate-950 border-white/10 text-white hover:border-white/30'
                        }`}
                      >
                        <span className="font-black text-xs leading-tight text-center">{m.label}</span>
                        <span className={`text-[10px] leading-tight text-center ${modalidad === m.key ? 'text-slate-600' : 'text-slate-400'}`}>
                          ${m.price.toLocaleString()}/m²
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* M² + INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-1">
                    <label className="block text-[11px] uppercase text-cyan-500 mb-2 font-black tracking-widest">Superficie Total m²:</label>
                    <input
                      type="number"
                      value={meters}
                      onChange={(e) => setMeters(Number(e.target.value))}
                      className="w-full bg-slate-950 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none transition-all"
                    />
                  </div>
                  <div className="px-1 flex flex-col justify-end pb-1 gap-1">
                    <p className="text-amber-400/80 text-[10px] uppercase tracking-wide">⚠️ Mínimo facturable: 100m²</p>
                    <p className="text-slate-500 text-[10px]">${currentMod.price.toLocaleString()}/m² + IVA — {currentMod.desc}</p>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="bg-cyan-500/10 rounded-2xl p-4 border border-cyan-500/20 text-center">
                  <span className="text-[9px] uppercase text-cyan-400 font-black tracking-[0.2em] mb-1 block">
                    Inversión Estimada
                  </span>
                  <div className="text-3xl font-mono text-white font-black tracking-tighter">
                    ${totalCost.toLocaleString()} <span className="text-xs opacity-50 ml-1">+ IVA</span>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 w-full py-4 font-black uppercase rounded-2xl text-[13px] bg-cyan-500 text-slate-950 hover:bg-white transition-all shadow-xl tracking-widest active:scale-95"
                  onClick={() => onNext && onNext()}
                >
                  Agendar Auditoría Técnica
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            <p className="mt-8 text-center text-white/30 text-[10px] uppercase font-bold tracking-widest px-4">
              * Valores referenciales para Región Metropolitana.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
