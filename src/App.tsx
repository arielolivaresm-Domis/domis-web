import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import AuditTechnicalDetails from './components/AuditTechnicalDetails';
import PhasesTabs from './components/PhasesTabs';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { TabsProvider } from './context/TabsContext';

function App() {
  return (
    <TabsProvider>
      <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
        {/* SISTEMA DE TRIPLE ESCANEO DOMIS™ */}
        <div className="laser-line laser-master-independent"></div>
        <div className="laser-line laser-follow-1"></div>
        <div className="laser-line laser-follow-2"></div>

        <Header />

        <main>
          <Hero />
          <Problem />
          {/* Integración del Protocolo de Auditoría PCF-15™ */}
          <AuditTechnicalDetails />
          <PhasesTabs />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </TabsProvider>
  );
}

export default App;