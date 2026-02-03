import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, ArrowRight, X, Check, AlertCircle } from 'lucide-react';

export default function BenefitFlyer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const whatsappNumber = "56929901343";
  
  const whatsappUrl = useMemo(() => {
    const message = `💎 *SOLICITUD FASE 2 - DOMIS™*\n\n• *Nombre:* ${nombre}\n\nHola, quiero activar la negociación técnica con la estructura de pago por éxito (Fase 2).`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  }, [nombre]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  const ModalPortal = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
      <div className="relative z-[100000] w-full max-w-md bg-slate-900 border-2 border-cyan-500 rounded-[2.5rem] p-8 shadow-[0_0_60px_rgba(34,211,238,0.3)] animate-in fade-in zoom-in duration-300">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <X size={24}/>
        </button>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Activar Fase 2</h3>
          <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">Negociación Estratégica</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500 transition-all font-sans" placeholder="Tu Nombre..." />
          <button type="submit" className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-cyan-500/20 hover:bg-white transition-all active:scale-95 mt-4">
             Solicitar Plan Maestro
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <section id="beneficio-fase2" className="py-24 bg-slate-950 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden border-2 border-cyan-500 shadow-[0_0_50px_rgba(34,211,238,0.15)] bg-slate-900 min-h-[850px] flex items-center justify-center">
          
          <div className="absolute inset-0">
            <img src="/DOMIS_Negociacion.webp" alt="Negociación DOMIS" className="w-full h-full object-cover opacity-90 grayscale-[0.4] contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-slate-950/90"></div>
          </div>

          <div className="relative z-10 p-6 md:p-16 w-full max-w-4xl">
            {/* HEADER */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg shadow-cyan-500/20">Fase 2: Negociación Técnica</div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                Estructura de Pago <br/><span className="text-cyan-400 italic">por Éxito</span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* BLOQUE DE PAGOS (CRYSTAL GLASS) */}
              <div className="bg-slate-950/5 backdrop-blur-2xl border-2 border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-4">Fee Activación</h4>
                    <div className="text-5xl font-mono text-white font-black mb-4">$400.000</div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-[11px] text-slate-200 font-bold uppercase tracking-widest">
                        <Check size={14} className="text-cyan-500"/> No reembolsable
                      </li>
                      <li className="flex items-center gap-2 text-[11px] text-slate-200 font-bold uppercase tracking-widest">
                        <Check size={14} className="text-cyan-500"/> Descontable del total
                      </li>
                    </ul>
                  </div>
                  <div className="border-l border-white/10 md:pl-12">
                    <h4 className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-4">Comisión Éxito</h4>
                    <div className="text-5xl font-mono text-white font-black mb-2">10%</div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6 italic">Del ahorro total logrado</p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-[11px] text-slate-200 font-bold uppercase tracking-widest leading-tight">
                        <Check size={14} className="text-cyan-500"/> 20% al firmar Promesa
                      </li>
                      <li className="flex items-center gap-2 text-[11px] text-slate-200 font-bold uppercase tracking-widest leading-tight">
                        <Check size={14} className="text-cyan-500"/> 80% al firmar Escritura
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* BLOQUE DEVOLUCIÓN (CYAN GLASS) - CAMBIO DE TEXTO AQUÍ */}
              <div className="bg-cyan-500/5 backdrop-blur-2xl border-2 border-cyan-500/20 p-10 rounded-[2.5rem]">
                <div className="flex items-center gap-4 mb-8">
                  <AlertCircle className="text-cyan-400" size={28} />
                  <h3 className="text-white font-black uppercase tracking-tighter text-2xl italic">Devolución Condicional (20% Firma Promesa)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Cliente comprueba caída con documentos',
                    'DOMIS devuelve el 20% en 30 días hábiles',
                    'Monitoreo 120 días sobre ROL específico',
                    'Si ROL cambia → Cliente paga completo'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-950/30 p-4 rounded-2xl border border-white/5">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0" />
                      <span className="text-[10px] text-slate-100 font-black uppercase tracking-[0.15em] leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTÓN FINAL */}
            <div className="mt-16 flex flex-col items-center">
              <div className="mb-8 text-center">
                <span className="text-5xl font-black text-white italic tracking-tighter drop-shadow-lg">40% OFF</span>
                <p className="text-cyan-400 font-black text-[11px] uppercase tracking-[0.4em] mt-2">AUDITORÍA AL ACTIVAR FASE 2</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-center gap-6 px-16 py-8 bg-cyan-500 text-slate-950 font-black rounded-[2rem] uppercase tracking-[0.2em] text-sm hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(34,211,238,0.4)] active:scale-95"
              >
                <MessageCircle size={24} className="fill-current" />
                Activar Negociación Técnica
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
      {mounted && isModalOpen && createPortal(ModalPortal, document.body)}
    </section>
  );
}