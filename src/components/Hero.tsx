export default function Hero() {
  return (
    <section className="bg-slate-950 pt-32 pb-20 px-6 border-b border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">
            NO COMPRES <br />
            <span className="text-white">PROMESAS.</span> <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">COMPRA DATOS.</span>
          </h1>
          
          <div className="space-y-6 mb-10">
            <div className="text-slate-200 text-xl font-bold leading-tight">
              <span>
                DOMIS<span className="text-cyan-500 text-xs relative -top-2 ml-0.5">™</span>
              </span>
              <span className="mx-2">|</span>
              <span>INTELIGENCIA TÉCNICA INMOBILIARIA.</span>
              <p className="mt-2 font-normal text-lg">
                Auditamos cada m² para que negocies con la verdad técnica.
              </p>
            </div>
            <p className="text-slate-400 text-base italic uppercase tracking-widest">
              El primer Buyer's Agent técnico de Chile. No más suerte. Solo ingeniería.
            </p>
          </div>

          <div className="space-y-3 mb-10">
            {/* ITEM 1: PCF-15 con TM pegado y elevado */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p>
                <span className="font-bold">
                  Auditoría PCF-15<span className="text-cyan-500 text-[10px] relative -top-1.5 ml-0.5">™</span>:
                </span> Scoring 0-100 en 7 días
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p><span className="font-bold">Valorización:</span> Si compras, auditoría 60% OFF</p>
            </div>

            {/* ITEM 3 */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p><span className="font-bold">ROI típico:</span> 900%+</p>
            </div>
          </div>
        </div>

        {/* FRAME TÉCNICO */}
        <div className="engineering-frame aspect-square">
          <div className="animate-scan"></div>
          <img 
            src="/hero-house.jpg" 
            alt="DOMIS™ Property-Audit" 
            className="w-full h-full object-cover opacity-80" 
          />
        </div>
      </div>
    </section>
  );
}