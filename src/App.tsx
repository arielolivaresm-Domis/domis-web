import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import PhasesTabs from './components/PhasesTabs';
import BenefitFlyer from './components/BenefitFlyer';
import Footer from './components/Footer';
import { TabsProvider, useTabs } from './context/TabsContext';

/**
 * AppContent: Gestiona qué se ve y qué no.
 */
const AppContent = () => {
  const { activeTab } = useTabs();

  return (
    <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
      <div className="laser-line laser-master-independent"></div>
      <div className="laser-line laser-follow-1"></div>
      <div className="laser-line laser-follow-2"></div>

      <Header />

      <main>
        <Hero />
        <Problem />
        <PhasesTabs />
        
        {/* REGLA DE VISIBILIDAD: 
            Si estamos en Fase 1 o 3, este bloque desaparece por completo. */}
        {activeTab === 'fase2' && <BenefitFlyer />}
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <TabsProvider>
      <AppContent />
    </TabsProvider>
  );
}

export default App;