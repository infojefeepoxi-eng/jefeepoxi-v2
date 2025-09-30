import { LanguageProvider } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';

import About from '@/components/About';
import ProjectsGallery from '@/components/ProjectsGallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <ProjectsGallery />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
