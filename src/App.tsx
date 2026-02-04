import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import AuditTechnicalDetails from './components/AuditTechnicalDetails';
import PhasesTabs from './components/PhasesTabs';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { TabsProvider } from './context/TabsContext';

// Importación del Portal Técnico PCF-15™
// Nota: Importamos el App del portal desde su carpeta específica
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
        <AuditTechnicalDetails />
        <PhasesTabs />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  </TabsProvider>
);

/**
 * COMPONENTE MAESTRO: APP
 * Director de tráfico de domis.cl
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* RUTA RAÍZ: Web de Ventas y Autoridad */}
        <Route path="/" element={<LandingPage />} />

        {/* RUTA TÉCNICA: Portal PCF-15™ */}
        {/* El asterisco (*) permite que el portal maneje sus propias rutas internas */}
        <Route path="/pcf-15tm/*" element={<PortalApp />} />
      </Routes>
    </Router>
  );
}

export default App;