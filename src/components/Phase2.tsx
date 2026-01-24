import { Handshake, FileCheck } from 'lucide-react';

export default function Phase2({ onNext }: { onNext: () => void }) {
  return (
    <section className="relative px-4 md:px-0">
      
      <div 
        onClick={() => onNext()}
        className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-slate-800 group transition-all duration-500 hover:border-cyan-500/50 shadow-2xl shadow-slate-950/50 cursor-pointer"
      >
        
        <img 
          src="/DOMIS_Final_Optimized.webp" 
          alt="Negociación Técnica DOMIS" 
          className="w-full h-full object-cover object-top md:object-center scale-100 md:scale-105 group-hover:scale-110 transition-transform duration-1000 filter saturate-[0.8] brightness-[0.7]" 
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-cyan-900/20 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.1] bg-repeat pointer-events-none mix-blend-overlay"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full mb-6 w-fit backdrop-blur-md">
            <Handshake className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-bold">
              Mesa de Negociación Técnica
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg leading-tight">
            El poder de los <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              Datos Duros
            </span>
          </h3>

          <p className="text-slate-300 text-sm md:text-lg max-w-xl leading-relaxed mb-8 drop-shadow-md font-medium">
            No negociamos con opiniones, sino con un informe de ingeniería forense en mano. Transformamos los hallazgos técnicos en argumentos financieros irrefutables.
          </p>
          
          <div className="flex items-center gap-3 text-white/80">
             <FileCheck className="w-5 h-5 text-cyan-500" />
             <span className="text-xs font-bold uppercase tracking-wider">Resultado: Ajuste de precio justo</span>
          </div>

        </div>

        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
      </div>

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

    </section>
  );
}