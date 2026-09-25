// Logo DOMIS™ igual al del Header del sitio (versión estática, sin escaneo).
export default function MarcaDomis({ grande = false }: { grande?: boolean }) {
  return (
    <a href="/" className="inline-flex flex-col items-start select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm" aria-label="DOMIS™ — ir al inicio">
      <span className="flex items-start">
        <span className={`${grande ? 'text-3xl' : 'text-xl md:text-3xl'} font-black text-white tracking-tight uppercase leading-none group-hover:text-cyan-50 transition-colors`}>
          DOMIS
        </span>
        <span className={`text-cyan-500 ${grande ? 'text-lg' : 'text-sm md:text-lg'} font-bold ml-1 relative top-[-2px] md:top-[-4px]`}>™</span>
      </span>
      <span className={`${grande ? 'text-[10px] tracking-[0.35em]' : 'text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.35em]'} text-cyan-500 font-bold uppercase leading-none mt-1`}>
        PROPERTY-AUDIT
      </span>
    </a>
  );
}
