export default function FinalCTA() {
  return (
    <section id="contacto" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] min-h-[600px] flex items-center justify-center">
          
          {/* IMAGEN DE FONDO: LA SOLUCIÓN Y TRANQUILIDAD */}
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_finak.webp" 
              alt="Familia disfrutando hogar seguro" 
              className="w-full h-full object-cover scale-105"
            />
            {/* Overlay gradiente para legibilidad extrema */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40"></div>
          </div>

          {/* CONTENIDO DE CONVERSIÓN */}
          <div className="relative z-10 p-8 md:p-20 w-full">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8">
                <span className="text-[10px] md:text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] font-black">
                  Tu tranquilidad es nuestra métrica
                </span>
              </div>

              {/* Título: El Gancho de Datos Reales */}
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
                CONSTRUYE TU <span className="text-cyan-400">FUTURO</span> SOBRE <br />
                DATOS REALES
              </h2>

              {/* Descripción: Blindaje de Patrimonio */}
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-12 font-medium max-w-xl">
                No dejes tu patrimonio al azar. Blindamos la inversión más importante de tu vida con la claridad técnica del <strong className="text-white">Protocolo PCF-15™</strong> para que compres, negocies o remodeles con total seguridad.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="https://wa.me/56982348089?text=Hola%20Ariel,%20necesito%20una%20auditoría%20técnica%20para%20mi%20próxima%20propiedad."
                  target="_blank"
                  rel="noreferrer"
                  className="group relative px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase rounded-2xl transition-all duration-300 text-center shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Agendar Auditoría Técnica
                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* MARCA TÉCNICA SUTIL ACTUALIZADA */}
          <div className="absolute bottom-8 right-12 hidden md:block">
            <div className="text-right">
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-1">Certificación de Ingeniería</p>
              <p className="text-white font-black text-xl italic tracking-tighter uppercase">PCF-15™ Protocol</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}