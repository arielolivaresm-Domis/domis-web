import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import AuditTechnicalDetails from './components/AuditTechnicalDetails';
import PhasesTabs from './components/PhasesTabs';
import RealCases from './components/RealCases';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { TabsProvider } from './context/TabsContext';

// Importación del Portal Técnico PCF-15™
import PortalApp from './pcf-15tm/App';

/**
 * COMPONENTE: LANDING PAGE DOMIS™
 * Encapsula toda la experiencia de usuario y autoridad de la web principal.
 */
const LandingPage = () => (
  <TabsProvider>
    <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
      {/* SISTEMA DE TRIPLE ESCANEO DOMIS™ (Exclusivo de Landing) */}
      <div className="laser-line laser-master-independent"></div>
      <div className="laser-line laser-follow-1"></div>
      <div className="laser-line laser-follow-2"></div>

      <Header />

      <main>
        <Hero />
        <Problem />
        <Solution />
        <AuditTechnicalDetails />
        <PhasesTabs />
        <RealCases />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  </TabsProvider>
);

/**
 * COMPONENTE MAESTRO: APP
 * Director de tráfico de domis.cl
 * BrowserRouter ya está en index.tsx
 */
function App() {
  return (
    <Routes>
      {/* RUTA RAÍZ: Web de Ventas y Autoridad */}
      <Route path="/" element={<LandingPage />} />

      {/* RUTA TÉCNICA: Portal PCF-15™ */}
      <Route path="/pcf-15tm" element={<PortalApp />} />
    </Routes>
  );
}

export default App;