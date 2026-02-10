import { AlertTriangle } from 'lucide-react';
import Section from './layout/Section';

export default function Problem() {
  return (
    <Section id="problema" className="py-12 md:py-24 bg-slate-950 relative z-10">
      
      <div className="relative rounded-none md:rounded-[2.5rem] overflow-hidden border-y md:border border-white/10 shadow-2xl min-h-[550px] md:min-h-[600px] flex items-center justify-center bg-slate-950">
        
        {/* CAPA DE IMAGEN */}
        <div className="absolute inset-0">
          <img 
            src="/DOMIS_error_mas_comun.webp" 
            alt="Asimetría de información inmobiliaria" 
            className="w-full h-full object-cover opacity-100 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 p-4 md:p-16 text-center max-w-4xl">
          
          {/* BADGE TÉCNICO */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200/10 border border-slate-200/30 rounded-full mb-8">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span className="text-[9px] md:text-[10px] font-mono text-slate-200 uppercase tracking-[0.2em] font-black">
              Alerta de Riesgo Inmobiliario
            </span>
          </div>
          
          <div className="mb-8">
            <span className="block text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
              EL 90%
            </span>
            <h2 className="text-[14px] md:text-xl font-bold text-white uppercase tracking-widest leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              de los compradores de <span className="text-[#F59E0B] font-black text-base md:text-2xl">PROPIEDADES</span> en Chile firma la promesa <br className="hidden md:block" />
              sin saber realmente qué está comprando.
            </h2>
          </div>

          <h3 className="text-xl md:text-4xl font-black text-white uppercase tracking-tighter mb-10 italic drop-shadow-md leading-tight">
            EL ERROR <span className="text-red-500">MÁS CARO</span> NO ES COMPRAR MAL. <br className="md:hidden" /> ES <span className="text-red-500">PAGAR DE MÁS</span>.
          </h3>
          
          <div className="space-y-6 md:space-y-8 mb-12 max-w-3xl mx-auto">
            {/* COMPARATIVA FINANCIERA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
              <div className="text-center md:text-right border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1">Descuento Estándar</p>
                <p className="text-xl md:text-2xl font-black text-slate-300">~6% Desc.</p>
              </div>
              <div className="text-center md:text-left pt-4 md:pt-0 md:pl-6">
                <p className="text-cyan-400 text-[9px] uppercase tracking-widest mb-1 font-bold">Rescate Domis™</p>
                <p className="text-xl md:text-3xl font-black text-cyan-400">8% al 20%</p>
              </div>
            </div>

            {/* TEXTO EXPLICATIVO */}
            <div className="bg-slate-900/40 p-4 md:p-5 rounded-xl border border-cyan-500/20 backdrop-blur-md">
              <p className="text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-wide leading-relaxed">
                +2 puntos porcentuales pueden significar<br />
                millones de pesos en tu bolsillo
              </p>
            </div>
          </div>
          
          <p className="text-cyan-400 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold border-t border-cyan-500/20 pt-8 inline-block">
            NEGOCIACIÓN TÉCNICA BASADA EN INGENIERÍA FORENSE.
          </p>
        </div>
      </div>
    </Section>
  );
}