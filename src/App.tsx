import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import AuditTechnicalDetails from './components/AuditTechnicalDetails';
import Phase2 from './components/Phase2'; 
import BenefitFlyer from './components/BenefitFlyer';
// import Phase3 from './components/Phase3'; // Comentado por seguridad hasta confirmar archivo
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { TabsProvider } from './context/TabsContext';

function App() {
  return (
    /* RESTAURAMOS EL PROVIDER: Sin esto el Header y Footer pueden fallar */
    <TabsProvider>
      <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth text-white">
        
        {/* SISTEMA DE TRIPLE ESCANEO DOMIS™ */}
        <div className="laser-line laser-master-independent"></div>
        <div className="laser-line laser-follow-1"></div>
        <div className="laser-line laser-follow-2"></div>

        <Header />

        <main>
          <Hero />
          <Problem />
          
          {/* FASE 1 */}
          <section id="fase1">
            <AuditTechnicalDetails />
          </section>

          {/* FASE 2: ESTRATEGIA */}
          <section id="fase2" className="pt-24 px-6">
            <div className="max-w-7xl mx-auto">
              <Phase2 onNext={() => document.getElementById('benefit-cta')?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
          </section>

          {/* FASE 2: COBRO */}
          <section id="benefit-cta">
            <BenefitFlyer />
          </section>

          {/* FASE 3: DESCOMENTAR CUANDO TENGAS EL ARCHIVO Phase3.tsx */}
          {/* <section id="fase3" className="pt-24">
            <Phase3 />
          </section> */}

          <FinalCTA />
        </main>

        <Footer />
      </div>
    </TabsProvider>
  );
}

export default App;