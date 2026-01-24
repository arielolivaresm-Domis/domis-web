import { ShieldAlert, ArrowRight, Activity } from 'lucide-react';

const Hero = () => {
  // Configuración de contacto Fase 1
  const whatsappNumber = "56982348089"; 
  const message = "Hola Ariel, quiero proteger mi inversión. ¿Cómo empezamos con la Fase 1 de Auditoría Técnica y el Scanner de Vicios Ocultos?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden bg-slate-950">
      
      {/* Fondos de Ingeniería y Luces */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#22d3ee_0%,transparent_50%)] opacity-20"></div>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge de Estatus Técnico */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8 animate-pulse">
            <Activity size={14} />
            Ingeniería & Auditoría Inmobiliaria
          </div>

          {/* Título Principal Agresivo */}
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8">
            NO COMPRES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              VICIOS OCULTOS
            </span>
          </h1>

          {/* Bajada de Autoridad */}
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12">
            Somos <strong className="text-white">Constructores Civiles</strong> especializados en detectar fallas estructurales, eléctricas y sanitarias antes de que firmes. <br className="hidden md:block" />
            <span className="text-cyan-500/80 italic">Asegura tu plusvalía con auditoría técnica real.</span>
          </p>

          {/* CTAs de Acción Inmediata */}
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-cyan-500 hover:bg-white text-slate-950 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] group"
            >
              <ShieldAlert size={20} />
              Solicitar Auditoría F1
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#proceso"
              className="flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
            >
              Ver Packs y Fases
            </a>
          </div>

          {/* Estadísticas Rápidas (Efecto Plan Maestro) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-24 border-t border-slate-900 pt-12 w-full max-w-4xl">
            <div className="text-left">
              <div className="text-2xl font-mono text-cyan-400 font-black">+900%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">ROI en Negociación</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-mono text-cyan-400 font-black">60% OFF</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Reembolso Auditoría</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-mono text-cyan-400 font-black">RADIO 3KM</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Análisis Entorno</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-mono text-cyan-400 font-black">100% TECH</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Scanner de Humedad</div>
            </div>
          </div>

        </div>
      </div>

      {/* Efecto decorativo inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
};

export default Hero;