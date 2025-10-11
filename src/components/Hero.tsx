import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import heroEpoxyWarehouse from '@/assets/hero-epoxy-warehouse.jpg';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroEpoxyWarehouse}
          alt="Pavimento epoxi industrial en almacén de Valencia - JefeEpoxi especialistas en suelos epoxi profesionales"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-background/40"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-primary text-sm font-medium">
              Valencia, España
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              JefeEpoxi
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-normal text-muted-foreground">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg shadow-elegant hover:shadow-glow transition-all duration-300"
              asChild
            >
              <a href="#contact">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg border border-border hover:bg-card/50"
              asChild
            >
              <Link to="/ai-visualizer">
                <Wand2 className="mr-2 w-5 h-5" />
                {t('hero.cta.ai')}
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="lg"
              className="px-8 py-4 text-lg border border-border hover:bg-card/50"
              asChild
            >
              <a href="#projects">
                <Play className="mr-2 w-5 h-5" />
                {t('hero.cta.secondary')}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-border/30">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">70+</div>
              <div className="text-muted-foreground">Proyectos entregados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Satisfacción garantizada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
