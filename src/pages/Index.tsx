import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import IndustrialSolutions from '@/components/IndustrialSolutions';
import About from '@/components/About';
import ProjectsGallery from '@/components/ProjectsGallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pavimentos Epoxy Profesionales Valencia | Suelos Industriales"
        description="Especialistas en pavimentos epoxy en Valencia. Más de 5 años de experiencia en suelos industriales, alimentarios y decorativos. Presupuesto gratuito en 24h. ☎️ +34 622 313 855"
        canonical="https://jefeepoxi.com/"
        keywords="pavimentos epoxy valencia, suelos epoxy valencia, resina epoxy valencia, pavimentos industriales valencia, suelos industriales, pavimentos alimentarios, suelos decorativos epoxy, aplicadores epoxy valencia"
        ogType="website"
      />
      <StructuredData
        type="LocalBusiness"
        name="JefeEpoxi - Pavimentos Epoxy Valencia"
        description="Especialistas en pavimentos de resina epoxi en Valencia. Más de 5 años de experiencia en suelos industriales, alimentarios, decorativos y técnicos."
        telephone="+34622313855"
        email="contacto@jefeepoxi.com"
        priceRange="€€"
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <IndustrialSolutions />
        <About />
        <ProjectsGallery />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

