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

// Importación del Portal Técnico PCF-15™
import PortalApp from './pcf-15tm/App';

// Páginas de casos reales
import CasoCarolinaLaReina from './components/casos/CasoCarolinaLaReina';
import CasoAndreaProvidencia from './components/casos/CasoAndreaProvidencia';
import CasoFelipeLasCondes from './components/casos/CasoFelipeLasCondes';

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
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pcf-15tm" element={<PortalApp />} />
      <Route path="/casos/carolina-la-reina" element={<CasoCarolinaLaReina />} />
      <Route path="/casos/andrea-providencia" element={<CasoAndreaProvidencia />} />
      <Route path="/casos/felipe-las-condes" element={<CasoFelipeLasCondes />} />
    </Routes>
  );
}

export default App;
