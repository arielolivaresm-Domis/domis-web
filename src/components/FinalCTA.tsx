import { ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

/**
 * COMPONENTE: FinalCTA.tsx
 * Cierre de Venta Técnico - Proyecto DOMIS™
 */
export default function FinalCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-950">
      {/* DECORACIÓN DE FONDO: RADIACIÓN CIAN */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="engineering-frame p-12 md:p-20 rounded-3xl border border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl text-center relative overflow-hidden group">
          
          {/* LÍNEA LÁSER DE ESCANEO */}
          <div className="animate-scan opacity-30"></div>

          {/* ICONO DE SEGURIDAD TÉCNICA */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 mb-10 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <ShieldCheck className="w-10 h-10 text-cyan-400" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 tracking-tighter leading-tight">
            No compres a ciegas. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              Audita con Ingeniería.
            </span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Asegura tu inversión con el respaldo de una auditoría técnica forense. 
            Detectamos lo invisible para garantizar tu tranquilidad financiera.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* BOTÓN PRIMARIO: ACCIÓN DIRECTA */}
            <button className="w-full md:w-auto px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] flex items-center justify-center gap-3 group/btn">
              Solicitar Auditoría Ahora
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {/* BOTÓN SECUNDARIO: CONSULTA TÉCNICA */}
            <button className="w-full md:w-auto px-10 py-5 border border-slate-700 hover:border-cyan-500 text-white font-bold rounded-xl uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 bg-slate-950/50">
              <MessageSquare className="w-5 h-5 text-cyan-500" />
              Hablar con un Experto
            </button>
          </div>

          {/* FOOTER DEL CTA */}
          <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap justify-center gap-8 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              Disponibilidad Inmediata
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              Informes en 48 Horas
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              Respaldo Ingeniería Forense
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}