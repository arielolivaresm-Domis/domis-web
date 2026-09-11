import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import AuditTechnicalDetails from './components/AuditTechnicalDetails';
import AuditPacks from './components/AuditPacks';
import Sourcing from './components/Sourcing';
import BenefitFlyer from './components/BenefitFlyer';
import Deliverable from './components/Deliverable';
import Phase2 from './components/Phase2';
import Phase3 from './components/Phase3';
// import RealCases from './components/RealCases'; // CORFO — oculto hasta agosto 2026
import GarantiaFAQ from './components/GarantiaFAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Lazy loading — rutas secundarias no bloquean la landing
const PortalApp = lazy(() => import('./pcf-15tm/App'));
const CasoCarolinaLaReina = lazy(() => import('./components/casos/CasoCarolinaLaReina'));
const CasoAndreaProvidencia = lazy(() => import('./components/casos/CasoAndreaProvidencia'));
const CasoFelipeLasCondes = lazy(() => import('./components/casos/CasoFelipeLasCondes'));
const CotizacionRecibida = lazy(() => import('./components/CotizacionRecibida'));
const ArticuloChecklistUsada = lazy(() => import('./components/blog/ArticuloChecklistUsada'));
const ArticuloGarantias = lazy(() => import('./components/blog/ArticuloGarantias'));
const ArticuloBuyerAgent = lazy(() => import('./components/blog/ArticuloBuyerAgent'));
const BlogIndex = lazy(() => import('./components/blog/BlogIndex'));
const BuyerAgentLanding = lazy(() => import('./components/BuyerAgentLanding'));
const ArticuloNegociacion = lazy(() => import('./components/blog/ArticuloNegociacion'));
const ArticuloCuantoCuesta = lazy(() => import('./components/blog/ArticuloCuantoCuesta'));
const ArticuloFallasOcultas = lazy(() => import('./components/blog/ArticuloFallasOcultas'));
const ArticuloAmpliacione = lazy(() => import('./components/blog/ArticuloAmpliacione'));
const ArticuloCamaraTermica = lazy(() => import('./components/blog/ArticuloCamaraTermica'));
const ArticuloErrores = lazy(() => import('./components/blog/ArticuloErrores'));
const ArticuloInspector = lazy(() => import('./components/blog/ArticuloInspector'));
const ArticuloViciosOcultos = lazy(() => import('./components/blog/ArticuloViciosOcultos'));
const ArticuloDepartamento = lazy(() => import('./components/blog/ArticuloDepartamento'));
const NotFound = lazy(() => import('./components/NotFound'));

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': 'https://www.domis.cl/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es una auditoría técnica inmobiliaria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Es una inspección profesional no destructiva que evalúa el estado real de una propiedad antes de comprarla. DOMIS™ usa cámara térmica FLIR, dron DJI, detector de gas RIDGID y medidor láser Bosch para detectar fallas ocultas, valorizarlas en UF y convertirlas en argumentos de negociación reales.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué es un vicio oculto en una propiedad?',
          acceptedAnswer: { '@type': 'Answer', text: 'Un vicio oculto es una falla o defecto de la propiedad que no es visible al ojo humano durante una visita normal. Puede ser humedad detrás de los muros, instalaciones eléctricas deficientes, fugas de gas invisibles o problemas estructurales. La auditoría PCF-15™ de DOMIS™ los detecta con herramientas profesionales antes de que firmes la promesa de compra.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto puedo negociar al comprar una propiedad en Santiago?',
          acceptedAnswer: { '@type': 'Answer', text: 'El mercado promedio sin asesoría técnica logra descuentos de 5 a 7%. Con DOMIS™, que cruza hallazgos técnicos valorizados en UF con tasaciones de mercado reales, los casos documentados muestran descuentos de 9% en Las Condes ($39.5M ahorrados), 11% en Providencia ($68M ahorrados) y 18% en La Reina ($141M ahorrados).' },
        },
        {
          '@type': 'Question',
          name: '¿Vale la pena contratar inspección técnica antes de comprar una propiedad?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. El precio publicado de una propiedad usada en Santiago viene inflado entre 5% y 10% sobre el valor real de cierre. Sin una inspección técnica profesional, el comprador no tiene argumentos para negociar. DOMIS™ no solo detecta las fallas, sino que las valoriza en UF y genera una estrategia de negociación documentada para lograr el mejor precio posible.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué incluye el análisis de entorno de DOMIS™?',
          acceptedAnswer: { '@type': 'Answer', text: 'DOMIS™ incluye en cada auditoría un análisis completo del entorno en radio de 3 km: colegios con puntaje PAES, estaciones de metro, paraderos, servicios de seguridad, bancos, parques, supermercados, malls, farmacias, centros médicos y urgencias. Toda esta información se entrega en el informe para que el comprador evalúe no solo la propiedad sino el barrio completo.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta una auditoría técnica de propiedad en Santiago?',
          acceptedAnswer: { '@type': 'Answer', text: 'La auditoría PCF-15™ de DOMIS™ cuesta $1.600/m² + IVA para propiedades usadas y $1.500/m² + IVA para propiedades nuevas. El mínimo facturable es $70.000 + IVA, aplicable desde 35m². Para propiedad con sourcing incluido: $2.200/m² + IVA. Región Metropolitana, Santiago.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué es un buyer\'s agent en Chile?',
          acceptedAnswer: { '@type': 'Answer', text: 'Un buyer\'s agent o agente del comprador es un profesional que representa exclusivamente al comprador en una transacción inmobiliaria, sin conflicto de interés con el vendedor. DOMIS™ es el primer Buyer\'s Agent Técnico de Chile: combina inspección técnica profesional con asesoría de negociación para que el comprador tome decisiones con información real y no con la versión del vendedor.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cobra un buyer\'s agent en Chile?',
          acceptedAnswer: { '@type': 'Answer', text: 'DOMIS™ tiene estructura de honorarios diferenciada por fase de servicio. El valor exacto se cotiza según la superficie y tipo de propiedad. Contacto: arielom@domis.cl o @domis.chile en Instagram.' },
        },
        {
          '@type': 'Question',
          name: '¿Cómo negociar el precio de una propiedad usada en Chile?',
          acceptedAnswer: { '@type': 'Answer', text: 'La forma más efectiva de negociar el precio de una propiedad usada es con evidencia técnica documentada: fallas detectadas con instrumentos profesionales, valorizadas en UF y comparadas con el mercado real. DOMIS™ genera tres informes de negociación con el rango real de precio que el comprador puede ofrecer con respaldo técnico. Los casos documentados muestran descuentos de 9% a 18% sobre el precio de publicación.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué revisa una inspección técnica de vivienda?',
          acceptedAnswer: { '@type': 'Answer', text: 'La auditoría PCF-15™ de DOMIS™ revisa 15 dimensiones técnicas: estructura y cimentación, muros y tabiques, techumbre e impermeabilización, instalaciones eléctricas, agua potable y alcantarillado, gas, ventilación, humedad y filtraciones (con cámara térmica FLIR), niveles y plomadas (con nivelador Bosch), dimensiones reales versus escritura (con medidor láser), terminaciones, daños por sismos, documentación técnica y de permisos, y análisis de entorno en radio de 3 km.' },
        },
        {
          '@type': 'Question',
          name: '¿Vale la pena auditar una propiedad antes de firmar la promesa de compra?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí, y el momento correcto es antes de firmar la promesa, no después. Una vez firmada la promesa con precio acordado, el comprador pierde el principal argumento de negociación. DOMIS™ audita antes de la promesa para que el comprador entre a la negociación con evidencia técnica real. En los tres casos documentados, la auditoría previa permitió descuentos de 9%, 11% y 18% sobre el precio de publicación.' },
        },
        {
          '@type': 'Question',
          name: '¿DOMIS™ trabaja en Las Condes, Providencia, Vitacura, Lo Barnechea, La Reina y Ñuñoa?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. DOMIS™ opera en todas las comunas del sector oriente de Santiago: Las Condes, Providencia, La Reina, Vitacura, Lo Barnechea, Ñuñoa, Macul, La Florida y Peñalolén. Los tres casos documentados corresponden a propiedades en Las Condes ($39.550.715 ahorrados, 9%), Providencia ($68.218.952 ahorrados, 11%) y La Reina ($141.710.795 ahorrados, 18%). Para agendar una auditoría escribir a arielom@domis.cl o por Instagram @domis.chile.' },
        },
      ],
    },
  ],
};

const LandingPage = () => (
  <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(homeFaqSchema)}</script>
    </Helmet>
    <div className="laser-line laser-master-independent"></div>
    <div className="laser-line laser-follow-1"></div>
    <div className="laser-line laser-follow-2"></div>

    <Header />

    <main>
      <Hero />
      <Problem />
      {/* CORFO — casos reales ocultos hasta agosto 2026 */}
      {/* <RealCases /> */}
      <Solution />
      <AuditTechnicalDetails />

      {/* FASE 1 — Auditoría */}
      <AuditPacks />
      <Sourcing />

      {/* FASE 2 — Negociación */}
      <BenefitFlyer />
      <Deliverable />
      <Phase2 />

      {/* FASE 3 — Remodelación */}
      <Phase3 />

      <GarantiaFAQ />
      <FinalCTA />
    </main>

    <Footer />
  </div>
);

function App() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor?.href?.includes('wa.me')) {
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pcf-15tm" element={<PortalApp />} />
        <Route path="/casos/carolina-la-reina" element={<CasoCarolinaLaReina />} />
        <Route path="/casos/andrea-providencia" element={<CasoAndreaProvidencia />} />
        <Route path="/casos/felipe-las-condes" element={<CasoFelipeLasCondes />} />
        <Route path="/cotizacion-recibida" element={<CotizacionRecibida />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/que-revisar-al-comprar-propiedad-usada-santiago" element={<ArticuloChecklistUsada />} />
        <Route path="/blog/garantia-propiedades-nuevas-chile" element={<ArticuloGarantias />} />
        <Route path="/blog/buyer-agent-chile" element={<ArticuloBuyerAgent />} />
        <Route path="/buyer-agent-chile" element={<BuyerAgentLanding />} />
        <Route path="/blog/como-negociar-precio-propiedad-usada-santiago" element={<ArticuloNegociacion />} />
        <Route path="/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago" element={<ArticuloCuantoCuesta />} />
        <Route path="/blog/fallas-ocultas-casas-usadas-santiago" element={<ArticuloFallasOcultas />} />
        <Route path="/blog/ampliaciones-sin-permiso-chile" element={<ArticuloAmpliacione />} />
        <Route path="/blog/camara-termica-inspeccion-inmobiliaria" element={<ArticuloCamaraTermica />} />
        <Route path="/blog/errores-comprar-propiedad-usada-santiago" element={<ArticuloErrores />} />
        <Route path="/blog/inspector-de-propiedades-santiago" element={<ArticuloInspector />} />
        <Route path="/blog/vicios-ocultos-propiedad-chile" element={<ArticuloViciosOcultos />} />
        <Route path="/blog/como-inspeccionar-departamento-antes-de-comprar-santiago" element={<ArticuloDepartamento />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
