import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const LandingPage = () => (
  <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
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
      </Routes>
    </Suspense>
  );
}

export default App;
