import { lazy, Suspense } from 'react';
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
      </Routes>
    </Suspense>
  );
}

export default App;
