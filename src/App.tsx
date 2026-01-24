import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import PhasesTabs from './components/PhasesTabs';
import BenefitFlyer from './components/BenefitFlyer';
import Footer from './components/Footer';
import { TabsProvider } from './context/TabsContext';

function App() {
  return (
    <TabsProvider>
      <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
        {/* Líneas láser maestras */}
        <div className="laser-line laser-master-independent"></div>
        <div className="laser-line laser-follow-1"></div>
        
        <Header />
        
        <main>
          <Hero />
          <Problem />
          <PhasesTabs />
          <BenefitFlyer />
        </main>
        
        <Footer />
      </div>
    </TabsProvider>
  );
}

export default App;