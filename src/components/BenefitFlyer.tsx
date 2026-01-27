import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, ArrowRight, X, Building2 } from 'lucide-react';

export default function BenefitFlyer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [propCount, setPropCount] = useState(1);
  const [domisCodes, setDomisCodes] = useState(['']);
  const [mounted, setMounted] = useState(false);

  // Control de montaje y bloqueo de scroll para el Portal
  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  // Manejar el cambio de cantidad de propiedades (1, 2 o 3)
  const handleCountChange = (count: number) => {
    setPropCount(count);
    setDomisCodes(Array(count).fill(''));
  };

  // Manejar el cambio en los inputs de códigos DOMIS™
  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...domisCodes];
    newCodes[index] = value.toUpperCase();
    setDomisCodes(newCodes);
  };

  const whatsappNumber = "56929901343";
  
  const whatsappUrl = useMemo(() => {
    const codesString = domisCodes.filter(c => c.trim() !== '').join(', ');
    const message = `💎 *SOLICITUD FASE 2 - DOMIS™*\n\n• *Nombre:* ${nombre}\n• *Propiedades:* ${propCount}\n• *IDs DOMIS:* ${codesString}\n\nHola, quiero activar la negociación técnica para estas propiedades.`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  }, [nombre, propCount, domisCodes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  // --- PORTAL: Formulario centrado al Viewport (Celular y PC) ---
  const ModalPortal = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
      
      <div className="relative z-[100000] w-full max-w-md bg-slate-900 border-2 border-cyan-500 rounded-[2.5rem] p-8 shadow-[0_0_60px_rgba(34,211,238,0.3)] animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto font-sans">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <X size={24}/>
        </button>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Activar Fase 2</h3>
          <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">Negociación Estratégica</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* CAMPO: NOMBRE */}
          <div className="text-left">
            <label className="block text-[10px] uppercase text-slate-400 font-black mb-2 tracking-widest">Nombre Completo</label>
            <input 
              required 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500 transition-all font-sans" 
              placeholder="Ej: Ariel..." 
            />
          </div>

          {/* CAMPO: CANTIDAD DE PROPIEDADES */}
          <div className="text-left">
            <label className="block text-[10px] uppercase text-slate-400 font-black mb-2 tracking-widest">Propiedades a Negociar</label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleCountChange(num)}
                  className={`py-3 rounded-xl font-black transition-all border ${
                    propCount === num 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-500' 
                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-cyan-500/50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* CAMPOS DINÁMICOS: CÓDIGOS DOMIS™ */}
          <div className="space-y-3">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1 tracking-widest text-left">Códigos DOMIS™ (Fase 1)</label>
            {domisCodes.map((code, i) => (
              <div key={i} className="relative">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input 
                  required 
                  type="text" 
                  value={code} 
                  onChange={(e) => handleCodeChange(i, e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-xl text-white outline-none focus:border-cyan-500 uppercase font-mono text-sm" 
                  placeholder={`CÓDIGO PROPIEDAD ${i + 1}`} 
                />
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-cyan-500/20 hover:bg-white transition-all active:scale-95 mt-4"
          >
             Solicitar Plan Maestro
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <section id="beneficio-fase2" className="py-24 bg-slate-950 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* CONTENEDOR PRINCIPAL: Estética de Ingeniería */}
        <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)] min-h-[600px] flex items-center justify-center bg-slate-900">
          
          {/* IMAGEN DE FONDO: Familia y Estrategia */}
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_Negociacion.webp" 
              alt="Negociación Estratégica DOMIS" 
              className="w-full h-full object-cover opacity-80 grayscale-[0.2] contrast-110" 
            />
            {/* Gradiente para profundidad de texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center max-w-4xl w-full">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-cyan-500/20">
              Fase 2: Negociación Técnica
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl leading-tight">
              💰 CÓMO SE PAGA <br className="hidden md:block" /> LA FASE 2
            </h2>

            {/* TARJETAS DE PASOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12 text-left">
              <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">1️⃣</span>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Fee Inicial</h3>
                </div>
                <div className="text-3xl font-mono text-cyan-400 font-black mb-2">$500.000</div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">Plan Maestro Técnico + Estrategia.</p>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">2️⃣</span>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Éxito Final</h3>
                </div>
                <div className="text-3xl font-mono text-cyan-400 font-black mb-2">15% DEL AHORRO</div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">Sobre la baja de precio lograda.</p>
              </div>
            </div>

            {/* SECCIÓN 60% OFF */}
            <div className="mb-12">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-2xl">
                <span className="text-cyan-400">60% OFF</span>
              </h2>
              <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-90">En tu Auditoría al activar Fase 2</p>
            </div>

            {/* BOTÓN DE ACTIVACIÓN */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-950 font-black rounded-2xl uppercase tracking-[0.15em] text-sm hover:scale-105 transition-all shadow-2xl active:scale-95 touch-manipulation"
            >
              <MessageCircle size={22} className="fill-current" />
              Activar Negociación
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* RENDER DEL PORTAL DINÁMICO */}
      {mounted && isModalOpen && createPortal(ModalPortal, document.body)}
    </section>
  );
}