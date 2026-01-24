import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import PhasesTabs from './components/PhasesTabs';
import BenefitFlyer from './components/BenefitFlyer';
import Footer from './components/Footer';
import { TabsProvider, useTabs } from './context/TabsContext';

/**
 * AppContent: Componente interno que permite acceder al contexto de las pestañas.
 * Controla que la sección de inversión solo sea visible en la Fase 2.
 */
const AppContent = () => {
  const { activeTab } = useTabs();

  return (
    <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
      
      {/* SISTEMA DE TRIPLE ESCANEO DOMIS™ */}
      <div className="laser-line laser-master-independent"></div>
      <div className="laser-line laser-follow-1"></div>
      <div className="laser-line laser-follow-2"></div>

      <Header />

      <main>
        <Hero />
        <Problem />
        <PhasesTabs />
        
        {/* LÓGICA DE CONTROL: 
            BenefitFlyer solo se renderiza si la pestaña activa tiene el ID 'fase2' */}
        {activeTab === 'fase2' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <BenefitFlyer />
          </div>
        )}
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