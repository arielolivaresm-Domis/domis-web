export default function Problem() {
 return (
   <section id="problema" className="py-16 bg-slate-950 relative overflow-hidden flex items-center justify-center">
     <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-900/10 blur-[80px] rounded-full"></div>
     </div>

     <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
       <div className="relative w-full bg-gradient-to-r from-slate-900/90 to-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden group hover:border-slate-700 transition-all duration-500">
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
               <div className="flex-shrink-0 flex items-center justify-center">
                   <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-600 leading-none select-none drop-shadow-sm">
                       90%
                   </span>
               </div>

               <div className="flex-1 text-center md:text-left">
                   <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                       El Error <span className="text-cyan-400">Más Caro</span>
                   </h2>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                       El 90% de los compradores en Chile firma la promesa de compraventa sin saber realmente qué está comprando.
                   </p>
               </div>

               <div className="flex-shrink-0 bg-slate-950/60 border border-slate-800/50 rounded-xl p-5 md:px-8 md:py-4 flex flex-col items-center justify-center shadow-inner min-w-[200px]">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                       Resultado
                   </span>
                   <span className="text-xl md:text-2xl font-black text-white whitespace-nowrap">
                       $20-50 Millones
                   </span>
                   <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide mt-1 animate-pulse">
                       Perdidos
                   </span>
               </div>
           </div>
       </div>
     </div>
   </section>
 );
}