import { AlertTriangle, Home, Droplets, Zap, ShieldAlert } from 'lucide-react';

const Problem = () => {
  const painPoints = [
    {
      icon: <Droplets className="text-cyan-500" size={24} />,
      title: "Humedades Fantasmas",
      description: "Filtraciones ocultas tras el papel tapiz o pintura fresca que destruyen el valor de reventa en meses."
    },
    {
      icon: <Zap className="text-cyan-500" size={24} />,
      title: "Redes Eléctricas Fuera de Norma",
      description: "Tableros obsoletos o cableado artesanal que representan un riesgo de incendio y un gasto millonario no previsto."
    },
    {
      icon: <Home className="text-cyan-500" size={24} />,
      title: "Vicios Estructurales",
      description: "Asentamientos o grietas maquilladas que comprometen la seguridad y la plusvalía real de la propiedad."
    },
    {
      icon: <ShieldAlert className="text-cyan-500" size={24} />,
      title: "Entornos de Riesgo",
      description: "Comprar sin saber que a 2 cuadras hay factores que devalúan tu inversión un 30% inmediatamente."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
      {/* Luz de advertencia de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest">
              <AlertTriangle size={16} />
              El riesgo del inversionista
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none tracking-tighter">
              EL COSTO DE <br />
              <span className="text-red-500">NO AUDITAR</span>
            </h2>
            
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              En el mundo del <strong className="text-white">Flipping</strong> y la inversión inmobiliaria, lo que no ves es lo que te quita la utilidad. Una remodelación estética no sirve si la base técnica está podrida.
            </p>

            <div className="p-6 bg-slate-900/50 border-l-4 border-red-500 rounded-r-2xl">
              <p className="text-slate-300 italic text-sm">
                "El 70% de las propiedades en venta ocultan al menos un vicio técnico que cuesta más de $3.000.000 reparar."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {painPoints.map((point, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-red-500/30 transition-all group"
              >
                <div className="mb-4 p-3 bg-slate-950 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  {point.icon}
                </div>
                <h3 className="text-white font-black uppercase text-sm mb-2 tracking-tight">
                  {point.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Problem;