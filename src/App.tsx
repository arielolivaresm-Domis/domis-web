import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import AuditTechnicalDetails from './components/AuditTechnicalDetails'; // Fase 1
import Phase2 from './components/Phase2';                             // Fase 2 (Estrategia)
import BenefitFlyer from './components/BenefitFlyer';                 // Fase 2 (Cobro/CTA)
import Phase3 from './components/Phase3';                             // Fase 3 (Remodelación)
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
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
        
        {/* FASE 1: PROTOCOLO TÉCNICO PCF-15™ */}
        <div id="fase1">
          <AuditTechnicalDetails />
        </div>

        {/* FASE 2: INGENIERÍA DE PRECIOS & BIG DATA */}
        <div id="fase2" className="mt-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* onNext mueve al usuario al cobro automáticamente */}
            <Phase2 onNext={() => document.getElementById('benefit-cta')?.scrollIntoView({ behavior: 'smooth' })} />
          </div>
        </div>

        {/* COMPONENTE DE COBRO: JUSTO DEBAJO DE LA FASE 2 */}
        <div id="benefit-cta" className="mt-[-2rem]">
          <BenefitFlyer />
        </div>

        {/* FASE 3: PUESTA EN VALOR (REMODELACIÓN) */}
        <div id="fase3" className="mt-24">
          <Phase3 />
        </div>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;