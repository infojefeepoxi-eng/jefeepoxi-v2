import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Palette, Wrench, Sparkles, Building } from 'lucide-react';
import vlogHeroImage from '@/assets/vlog-epoxy-hero.jpg';

const VlogSection = () => {
  const { t } = useLanguage();

  const advantages = [
    { key: 'chemical', icon: Shield },
    { key: 'waterproof', icon: CheckCircle },
    { key: 'design', icon: Palette },
    { key: 'durability', icon: Wrench },
    { key: 'decorative', icon: Sparkles },
    { key: 'versatile', icon: Building },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div 
          className="relative h-96 rounded-2xl mb-16 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 15, 18, 0.7), rgba(11, 15, 18, 0.5)), url(${vlogHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('vlog.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('vlog.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-foreground leading-relaxed">
              {t('vlog.content.intro')}
            </p>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {t('vlog.content.durability.title')}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {t('vlog.content.durability.text')}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {t('vlog.content.chemical.title')}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {t('vlog.content.chemical.text')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {t('vlog.content.maintenance.title')}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {t('vlog.content.maintenance.text')}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {t('vlog.content.design.title')}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {t('vlog.content.design.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Advantages List */}
          <div className="bg-card rounded-2xl p-8 mb-12">
            <h3 className="text-3xl font-bold text-primary mb-8 text-center">
              {t('vlog.advantages.title')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {t(`vlog.advantages.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-elegant hover:shadow-glow"
              asChild
            >
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('vlog.cta')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VlogSection;
