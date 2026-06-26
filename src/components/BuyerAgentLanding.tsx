import { useState, useEffect } from 'react';
import { ShieldCheck, TrendingDown, Hammer, CheckCircle, ArrowRight, Globe } from 'lucide-react';

const whatsappUrl = 'https://wa.me/56929901343?text=Hi, I found DOMIS™ online and I am interested in a technical property inspection in Santiago.';
const whatsappUrlES = 'https://wa.me/56929901343?text=Hola, encontré DOMIS™ y me interesa una auditoría técnica de propiedad en Santiago.';

const content = {
  en: {
    meta: {
      title: "Buyer's Agent in Santiago Chile | Technical Property Inspection | DOMIS™",
      description: "DOMIS™ is Chile's first Technical Buyer's Agent. We inspect properties with FLIR thermal camera, DJI drone and professional tools, then negotiate the best price exclusively for you.",
    },
    nav: { back: '← domis.cl', lang: 'ES' },
    badge: "Chile's First Technical Buyer's Agent",
    hero: ["Every agent in Chile", "works for the seller.", "We work for you."],
    heroSub: "DOMIS™ inspects your property with professional instruments, documents every defect in UF value, and negotiates the best price — exclusively on your behalf.",
    cta: "Get a Free Consultation",
    problem: {
      title: "The problem with Chilean real estate",
      body: "In Chile, real estate agents are paid by the seller. Their commission is tied to the sale price — the higher the price, the more they earn. Even when they appear to represent both sides, their financial incentive is always to close the deal at the listed price.",
      highlight: "You arrive at one of the most important financial decisions of your life with no technical representation, no inspection, and no negotiating power.",
    },
    how: {
      title: "How DOMIS™ works",
      phases: [
        {
          badge: 'Phase 1',
          title: 'Technical Audit — PCF-15™',
          desc: 'Non-destructive inspection with FLIR thermal camera (moisture & hidden leaks), DJI drone (rooftop & facade), RIDGID gas detector, Bosch laser leveler. 15-point protocol. Full written report with every finding valued in UF.',
        },
        {
          badge: 'Phase 2',
          title: 'Strategic Negotiation',
          desc: 'Every technical finding is priced and crossed against real market comparables. We deliver 3 negotiation scenarios (aggressive, moderate, conservative) so you enter the negotiation with documented evidence, not guesswork.',
        },
        {
          badge: 'Phase 3',
          title: 'Post-Purchase Remodeling',
          desc: 'Since we know every technical detail of the property from Phase 1, we can execute the remodel without surprises. No hidden costs — real budget from day one.',
        },
      ],
    },
    cases: {
      title: 'Real results',
      sub: 'Reference cases from DOMIS™ operations in Santiago',
      items: [
        { location: 'La Reina', saving: '~$141M CLP', pct: '18%', desc: 'Structural damage, active leaks, and inconsistent documentation not disclosed by seller.' },
        { location: 'Providencia', saving: '~$68M CLP', pct: '11%', desc: 'Real surface smaller than declared in title deed. Electrical out of code. Hidden moisture.' },
        { location: 'Las Condes', saving: '~$39M CLP', pct: '9%', desc: 'Roof damage, active leaks, and a rejected building permit not disclosed to buyer.' },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Do I need to speak Spanish?', a: 'No. Ariel, founder of DOMIS™, communicates in English. Reports are delivered in Spanish with English summaries upon request.' },
        { q: 'Can foreigners buy property in Chile?', a: 'Yes. Chile has no restrictions on foreign property ownership. DOMIS™ works with international buyers and coordinates with your legal team for the title study and notary process.' },
        { q: 'Which areas do you cover?', a: 'All of the Región Metropolitana: Las Condes, Providencia, La Reina, Vitacura, Lo Barnechea, Ñuñoa, Macul, La Florida and Peñalolén. Properties outside Santiago are evaluated case by case with a travel surcharge.' },
        { q: 'How much does a buyer\'s agent cost in Chile?', a: 'DOMIS™ has a fee structure differentiated by phase. Phase 1 (technical audit) is priced per square meter with a 100m² minimum. Phase 2 (negotiation) is structured on results. Contact us for your specific case.' },
        { q: 'When should I contact you in the buying process?', a: 'Before signing the promesa de compraventa (purchase promise). Once signed, the price is set and you lose your main negotiating leverage. Contact us as soon as you identify a property you like.' },
      ],
    },
    footer: { text: 'Ready to buy in Santiago with certainty?', cta: 'Talk to DOMIS™' },
  },
  es: {
    meta: {
      title: "Buyer's Agent en Santiago Chile | Auditoría Técnica de Propiedades | DOMIS™",
      description: "DOMIS™ es el primer Buyer's Agent Técnico de Chile. Inspeccionamos tu propiedad con cámara térmica FLIR, dron DJI e instrumentos profesionales, y negociamos el mejor precio exclusivamente para ti.",
    },
    nav: { back: '← domis.cl', lang: 'EN' },
    badge: 'El primer Buyer\'s Agent Técnico de Chile',
    hero: ['Todos los corredores', 'trabajan para el vendedor.', 'Nosotros trabajamos para ti.'],
    heroSub: 'DOMIS™ audita tu propiedad con instrumentos profesionales, documenta cada falla en UF y negocia el mejor precio — exclusivamente a tu favor.',
    cta: 'Solicitar información',
    problem: {
      title: 'El problema del mercado inmobiliario chileno',
      body: 'En Chile, los corredores son pagados por el vendedor. Su comisión está ligada al precio de venta — a mayor precio, mayor comisión. Aunque aparenten representar a ambas partes, su incentivo financiero siempre es cerrar al precio publicado.',
      highlight: 'Llegas a una de las decisiones financieras más importantes de tu vida sin representación técnica, sin inspección y sin poder de negociación.',
    },
    how: {
      title: 'Cómo funciona DOMIS™',
      phases: [
        {
          badge: 'Fase 1',
          title: 'Auditoría Técnica PCF-15™',
          desc: 'Inspección no destructiva con cámara térmica FLIR (humedad y filtraciones ocultas), dron DJI (techumbre y fachada), detector de gas RIDGID, nivelador láser Bosch. Protocolo de 15 puntos. Informe completo con cada hallazgo valorizado en UF.',
        },
        {
          badge: 'Fase 2',
          title: 'Negociación Estratégica',
          desc: 'Cada hallazgo técnico se valoriza y se cruza con comparables de mercado reales. Entregamos 3 escenarios de negociación (agresivo, moderado, conservador) para que entres a la mesa con evidencia técnica documentada.',
        },
        {
          badge: 'Fase 3',
          title: 'Remodelación Post-Compra',
          desc: 'Al conocer cada detalle técnico de la propiedad desde la Fase 1, ejecutamos la remodelación sin sorpresas. Sin costos ocultos — presupuesto real desde el primer día.',
        },
      ],
    },
    cases: {
      title: 'Resultados reales',
      sub: 'Casos de referencia de operaciones DOMIS™ en Santiago',
      items: [
        { location: 'La Reina', saving: '~$141M CLP', pct: '18%', desc: 'Daños estructurales, filtraciones activas y documentación inconsistente no declarados por el vendedor.' },
        { location: 'Providencia', saving: '~$68M CLP', pct: '11%', desc: 'Superficie real menor a la declarada en escritura. Instalaciones eléctricas fuera de norma. Humedad oculta.' },
        { location: 'Las Condes', saving: '~$39M CLP', pct: '9%', desc: 'Daños en techumbre, filtraciones activas y proyecto de ampliación rechazado no informado al comprador.' },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Trabajan con extranjeros que compran en Chile?', a: 'Sí. DOMIS™ trabaja con compradores internacionales y coordina con tu equipo legal para el estudio de títulos y el proceso notarial. Ariel se comunica en inglés.' },
        { q: '¿Cuándo debo contactarlos en el proceso de compra?', a: 'Antes de firmar la promesa de compraventa. Una vez firmada, el precio está acordado y pierdes tu principal argumento de negociación. Contáctanos en cuanto identifiques una propiedad.' },
        { q: '¿En qué comunas operan?', a: 'Toda la Región Metropolitana: Las Condes, Providencia, La Reina, Vitacura, Lo Barnechea, Ñuñoa, Macul, La Florida y Peñalolén. Propiedades fuera de Santiago se evalúan con recargo.' },
        { q: '¿Cuánto cuesta el servicio?', a: 'DOMIS™ tiene estructura de honorarios por fase. La Fase 1 (auditoría) se cotiza por metro cuadrado con mínimo de 100m². La Fase 2 (negociación) se estructura sobre el resultado. Escríbenos para cotizar tu caso.' },
        { q: '¿DOMIS™ reemplaza al abogado o notario?', a: 'No. El buyer\'s agent actúa en la etapa técnica y comercial, antes de la promesa. El notario y el abogado gestionan el estudio de títulos y los aspectos legales. Trabajamos de forma complementaria.' },
      ],
    },
    footer: { text: '¿Listo para comprar en Santiago con certeza?', cta: 'Hablar con DOMIS™' },
  },
};

export default function BuyerAgentLanding() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const t = content[lang];

  useEffect(() => {
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.domis.cl/buyer-agent-chile');

    const prev = document.getElementById('buyer-agent-schema');
    if (prev) prev.remove();
    const script = document.createElement('script');
    script.id = 'buyer-agent-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.domis.cl/buyer-agent-chile',
          url: 'https://www.domis.cl/buyer-agent-chile',
          name: "Buyer's Agent in Santiago Chile | DOMIS™",
          description: content.en.meta.description,
          inLanguage: ['es-CL', 'en'],
          isPartOf: { '@id': 'https://www.domis.cl/#website' },
          about: { '@id': 'https://www.domis.cl/#business' },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'DOMIS™', item: 'https://www.domis.cl' },
            { '@type': 'ListItem', position: 2, name: "Buyer's Agent Chile", item: 'https://www.domis.cl/buyer-agent-chile' },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: content.en.faq.items.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    });
    document.head.appendChild(script);
    return () => { document.getElementById('buyer-agent-schema')?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">

      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 bg-slate-950/95 backdrop-blur-md z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none group">
            <div className="flex items-start">
              <span className="text-xl font-black text-white tracking-tight uppercase leading-none group-hover:text-cyan-50 transition-colors">DOMIS</span>
              <span className="text-cyan-500 text-sm font-bold ml-1 relative top-[-2px]">™</span>
            </div>
            <span className="text-[9px] text-cyan-500 font-bold tracking-[0.35em] uppercase leading-none mt-0.5">PROPERTY-AUDIT</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(l => l === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors text-xs font-black uppercase tracking-widest border border-slate-700 hover:border-cyan-500/50 px-3 py-1.5 rounded-lg"
            >
              <Globe size={12} />
              {t.nav.lang}
            </button>
            <a
              href={lang === 'en' ? whatsappUrl : whatsappUrlES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
          <ShieldCheck size={10} />
          {t.badge}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
          {t.hero[0]}<br />
          <span className="text-slate-400">{t.hero[1]}</span><br />
          <span className="text-cyan-400 italic">{t.hero[2]}</span>
        </h1>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
          {t.heroSub}
        </p>
        <a
          href={lang === 'en' ? whatsappUrl : whatsappUrlES}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-colors shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          {t.cta} <ArrowRight size={16} />
        </a>
      </section>

      {/* Problem */}
      <section className="border-t border-white/10 py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-6">{t.problem.title}</h2>
          <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">{t.problem.body}</p>
          <div className="bg-slate-900 border-l-4 border-cyan-500 p-6 rounded-r-2xl">
            <p className="text-white font-bold leading-relaxed">{t.problem.highlight}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-10">{t.how.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.how.phases.map((phase, i) => (
              <div key={i} className="p-6 bg-slate-900 border border-white/10 rounded-2xl">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  {phase.badge}
                </div>
                <h3 className="text-white font-black uppercase tracking-tight text-sm mb-3">{phase.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="border-t border-white/10 py-14 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">{t.cases.title}</h2>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-10">{t.cases.sub}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.cases.items.map((c, i) => (
              <div key={i} className="p-6 bg-slate-900 border border-white/10 rounded-2xl">
                <div className="text-4xl font-black font-mono text-cyan-400 mb-1">{c.pct}</div>
                <div className="text-white font-black uppercase tracking-widest text-xs mb-1">{c.location}</div>
                <div className="text-slate-500 text-xs mb-3">{c.saving}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="border-t border-white/10 py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">
            {lang === 'en' ? 'Professional-grade instruments' : 'Instrumental profesional'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'FLIR E6', role: lang === 'en' ? 'Thermal camera' : 'Cámara térmica' },
              { name: 'DJI Mini', role: lang === 'en' ? 'Inspection drone' : 'Dron de inspección' },
              { name: 'RIDGID', role: lang === 'en' ? 'Gas detector' : 'Detector de gas' },
              { name: 'Bosch', role: lang === 'en' ? 'Laser leveler' : 'Nivelador láser' },
            ].map((inst, i) => (
              <div key={i} className="p-4 border border-cyan-500/20 rounded-xl text-center">
                <CheckCircle size={20} className="text-cyan-500 mx-auto mb-2" />
                <div className="text-white font-black text-sm">{inst.name}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{inst.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-8">{t.faq.title}</h2>
          <div className="space-y-4">
            {t.faq.items.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-black text-sm mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-white/10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingDown size={40} className="text-cyan-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
            {t.footer.text}
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
            {lang === 'en'
              ? 'Write to us on WhatsApp. We respond in English.'
              : 'Escríbenos por WhatsApp. Respondemos en minutos.'}
          </p>
          <a
            href={lang === 'en' ? whatsappUrl : whatsappUrlES}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-10 py-5 rounded-full transition-colors shadow-[0_0_40px_rgba(34,211,238,0.25)]"
          >
            {t.footer.cta} <ArrowRight size={16} />
          </a>
          <p className="text-slate-600 text-xs mt-6 uppercase tracking-widest">
            {lang === 'en' ? 'Santiago, Chile · Región Metropolitana' : 'Santiago, Chile · Región Metropolitana'}
          </p>
        </div>
      </section>

    </div>
  );
}
