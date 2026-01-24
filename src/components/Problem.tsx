export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-slate-950 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER DE IMPACTO CON ESTILO GLOW */}
        <div className="relative rounded-[2rem] overflow-hidden border-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)] min-h-[500px] flex items-center justify-center bg-slate-900">
          {/* FONDO: Imagen optimizada con overlay */}
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Error en compra inmobiliaria" 
              className="w-full h-full object-cover opacity-60 grayscale-[0.2] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50"></div>
          </div>

          {/* CONTENIDO TEXTUAL */}
          <div className="relative z-10 p-8 md:p-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
              <span className="text-[10px] md:text-xs font-mono text-red-500 uppercase tracking-[0.3em] font-black">
                Alerta de Riesgo Inmobiliario
              </span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              90% EL ERROR <span className="text-red-500">MÁS CARO</span><br className="hidden md:block" />
              ES NO AUDITAR
            </h2>
            
            <p className="text-slate-200 text-lg md:text-2xl leading-relaxed font-semibold drop-shadow-lg mb-8">
              Si ya tienes la propiedad, nosotros la auditamos para detectar fallas que <span className="text-white font-black underline decoration-red-500 underline-offset-4">tú terminarás pagando</span>.
            </p>
            
            <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold">
              MÍNIMO TÉCNICO DE 100 M² POR PROPIEDAD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}