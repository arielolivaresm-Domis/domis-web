import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import AuditTechnicalDetails from './components/AuditTechnicalDetails';
import Phase2 from './components/Phase2'; // Asegúrate de que este archivo exista
import BenefitFlyer from './components/BenefitFlyer'; // Asegúrate de que este archivo exista
// import Phase3 from './components/Phase3'; // Lo dejamos comentado por ahora para evitar errores si no existe
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { TabsProvider } from './context/TabsContext';

function App() {
  return (
    <TabsProvider>
      <div className="min-h-screen bg-slate-950 relative font-sans scroll-smooth">
        
        {/* SISTEMA DE TRIPLE ESCANEO DOMIS™ - Restaurado */}
        <div className="laser-line laser-master-independent"></div>
        <div className="laser-line laser-follow-1"></div>
        <div className="laser-line laser-follow-2"></div>

        <Header />

        <main>
          <Hero />
          
          <Problem />
          
          {/* FASE 1: Detalles Técnicos de Auditoría */}
          <AuditTechnicalDetails />

          {/* FASE 2: Estrategia de Negociación */}
          <section id="fase2-tecnica" className="mt-12">
            <div className="max-w-7xl mx-auto px-6">
              <Phase2 onNext={() => document.getElementById('benefit-cta')?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
          </section>

          {/* BENEFIT FLYER: Cobros de Fase 2 (Justo debajo) */}
          <section id="benefit-cta">
            <BenefitFlyer />
          </section>

          {/* FASE 3: Si tienes el componente Phase3, descoméntalo abajo */}
          {/* <Phase3 /> */}

          <FinalCTA />
        </main>

        <Footer />
      </div>
    </TabsProvider>
  );
}

export default App;