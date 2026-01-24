import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const FinalCTA = () => {
  const cases = [
    { 
      title: "Saneamiento Estructural", 
      icon: <ShieldCheck className="text-cyan-400 w-5 h-5" />,
      ahorro: "$12.000.000",
      desc: "Vicios ocultos detectados."
    },
    { 
      title: "Peritaje Eléctrico", 
      icon: <Zap className="text-cyan-400 w-5 h-5" />,
      ahorro: "$4.500.000",
      desc: "Prevención de siniestros."
    }
  ];

  return (
    <section className="py-32 bg-slate-950 px-6 relative overflow-hidden border-t border-slate-900">
      {/* Efecto de resplandor central (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge: Último Llamado */}
        <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
          ÚLTIMO LLAMADO
        </div>

        {/* Título con resplandor */}
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-8 leading-tight tracking-tighter">
          COMPRA CON <br />
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
            CERTEZA ABSOLUTA
          </span>
        </h2>

        <p className="text-slate-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
          Solicita tu auditoría técnica con {' '}
          <span className="font-bold text-slate-200">
            DOMIS<span className="text-cyan-500 text-[10px] relative -top-1.5 ml-0.5">™</span>
          </span>{' '}
          hoy. Datos reales. Cero sorpresas.
        </p>

        {/* PRUEBA SOCIAL COMPACTA (Fusión de Casos Reales) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
          {cases.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl text-left hover:border-cyan-500/30 transition-colors group">
              <div className="bg-cyan-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1">
                  Ahorro: {item.ahorro}
                </div>
                <div className="text-white font-bold text-sm uppercase">{item.title}</div>
                <div className="text-slate-500 text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de Acción Estilo Ghost */}
        <div className="flex justify-center">
          <a 
            href="https://wa.me/56982348089?text=Hola Ariel, quiero solicitar una auditoría técnica con DOMIS™."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-12 py-5 rounded-full border-2 border-cyan-400/50 text-cyan-400 font-black uppercase tracking-widest text-xs transition-all hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
          >
            <span className="flex items-center gap-2">
              SOLICITAR AUDITORÍA
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </span>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;