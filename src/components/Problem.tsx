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
          <div className="relative z-10 p-8 md:p-16 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
              <span className="text-[10px] md:text-xs font-mono text-red-500 uppercase tracking-[0.3em] font-black">
                Alerta de Riesgo Inmobiliario
              </span>
            </div>
            
            {/* Título de impacto: El 90% */}
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
              El 90% de los compradores en Chile firma la promesa de compraventa <br className="hidden md:block" />
              sin saber realmente qué está comprando.
            </h2>

            {/* Subtítulo de alerta: El error más caro */}
            <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-tight italic">
              EL ERROR <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">MÁS CARO</span> ES NO AUDITAR
            </h3>
            
            {/* Descripción del servicio dual */}
            <p className="text-slate-200 text-lg md:text-2xl leading-relaxed font-semibold drop-shadow-lg mb-8 max-w-4xl mx-auto">
              Si ya tienes la propiedad, nosotros la auditamos para detectar fallas que <span className="text-white font-black underline decoration-red-500 underline-offset-4">tú terminarás pagando</span>. Si aún no tienes la propiedad, nosotros la buscamos y auditamos por ti.
            </p>
            
            {/* Nota de cobro mínimo */}
            <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold border-t border-cyan-500/20 pt-6">
              MÍNIMO TÉCNICO DE 100 M² POR PROPIEDAD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}