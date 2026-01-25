export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-slate-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden border-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)] min-h-[500px] flex items-center justify-center bg-slate-900">
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Error en compra inmobiliaria" 
              className="w-full h-full object-cover opacity-50 grayscale-[0.2] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.3em] font-black">
                Alerta de Riesgo Inmobiliario
              </span>
            </div>
            
            {/* 90% - Grande pero controlado */}
            <div className="mb-6">
              <span className="block text-7xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">
                EL 90%
              </span>
              {/* Texto intermedio - Tamaño uniforme y más pequeño */}
              <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
                de los compradores en Chile firma la promesa de compraventa <br className="hidden md:block" />
                sin saber realmente qué está comprando.
              </h2>
            </div>

            {/* ERROR MÁS CARO - Reducido para no competir con el 90% */}
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8 italic">
              EL ERROR <span className="text-red-500">MÁS CARO</span> ES NO AUDITAR
            </h3>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              Si ya tienes la propiedad, nosotros la auditamos para detectar fallas que <span className="text-white font-bold underline decoration-red-500 underline-offset-2">tú terminarás pagando</span>. Si aún no tienes la propiedad, nosotros la buscamos y auditamos por ti.
            </p>
            
            <p className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold border-t border-cyan-500/20 pt-6 inline-block">
              MÍNIMO TÉCNICO DE 100 M² POR PROPIEDAD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}