import { Users, Award, Clock, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const About = () => {
  const { t, language } = useLanguage();

  const stats = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      number: "5+",
      label: { es: "Años de experiencia", en: "Years of experience" }
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      number: "70+",
      label: { es: "Proyectos completados", en: "Completed projects" }
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      number: "100%",
      label: { es: "Clientes satisfechos", en: "Satisfied clients" }
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      number: "2",
      label: { es: "Países europeos", en: "European countries" }
    }
  ];

  const values = [
    {
      title: { es: "Calidad Premium", en: "Premium Quality" },
      description: { 
        es: "Utilizamos únicamente materiales de primera calidad y técnicas probadas para garantizar resultados duraderos.",
        en: "We use only top-quality materials and proven techniques to guarantee long-lasting results."
      }
    },
    {
      title: { es: "Experiencia Técnica", en: "Technical Expertise" },
      description: { 
        es: "Nuestro equipo cuenta con certificaciones específicas en sistemas Epoxi y cumplimiento normativo.",
        en: "Our team has specific certifications in Epoxy systems and regulatory compliance."
      }
    },
    {
      title: { es: "Servicio Integral", en: "Comprehensive Service" },
      description: { 
        es: "Desde el diseño hasta el mantenimiento, ofrecemos un servicio completo para cada proyecto.",
        en: "From design to maintenance, we offer complete service for every project."
      }
    },
    {
      title: { es: "Compromiso de Calidad", en: "Quality Commitment" },
      description: { 
        es: "Desplazamiento por toda España con los mismos estándares de calidad y puntualidad.",
        en: "Service throughout Spain with the same quality standards and punctuality."
      }
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'es' ? 'Sobre JefeEpoxi' : 'About JefeEpoxi'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Especialistas en pavimentos Epoxi con más de 5 años de experiencia transformando espacios industriales, comerciales y residenciales. Nuestro compromiso es ofrecer soluciones de pavimentación que combinen durabilidad, estética y funcionalidad.'
              : 'Epoxy flooring specialists with over 5 years of experience transforming industrial, commercial and residential spaces. Our commitment is to offer flooring solutions that combine durability, aesthetics and functionality.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-gradient-card border-border/50 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label[language]}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {language === 'es' ? 'Nuestra Historia' : 'Our Story'}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {language === 'es' 
                  ? 'JefeEpoxi nació de la pasión por transformar espacios mediante soluciones de pavimentación innovadoras y duraderas. Comenzamos nuestro recorrido en Valencia, especializándonos en pavimentos Epoxi para la industria local.'
                  : 'JefeEpoxi was born from a passion for transforming spaces through innovative and durable flooring solutions. We began our journey in Valencia, specializing in Epoxy flooring for local industry.'}
              </p>
              <p>
                {language === 'es' 
                  ? 'Con el tiempo, nuestra reputación de excelencia y compromiso nos ha llevado a expandir nuestros servicios por toda España, manteniendo siempre los más altos estándares de calidad en cada proyecto.'
                  : 'Over time, our reputation for excellence and commitment has led us to expand our services throughout Spain, always maintaining the highest quality standards in every project.'}
              </p>
              <p>
                {language === 'es' 
                  ? 'Hoy somos reconocidos como líderes en el sector, ofreciendo desde pavimentos industriales de alta resistencia hasta acabados decorativos únicos que combinan funcionalidad y diseño.'
                  : 'Today we are recognized as leaders in the sector, offering from high-resistance industrial floors to unique decorative finishes that combine functionality and design.'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {language === 'es' ? 'Nuestro Compromiso' : 'Our Commitment'}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {language === 'es' 
                  ? 'En JefeEpoxi entendemos que cada proyecto es único. Por eso, trabajamos estrechamente con nuestros clientes para desarrollar soluciones personalizadas que superen sus expectativas.'
                  : 'At JefeEpoxi we understand that each project is unique. That\'s why we work closely with our clients to develop customized solutions that exceed their expectations.'}
              </p>
              <p>
                {language === 'es' 
                  ? 'Nuestro equipo técnico está en constante formación, manteniéndose actualizado con las últimas tecnologías y normativas del sector, especialmente en áreas críticas como la industria alimentaria y sistemas ESD.'
                  : 'Our technical team is constantly training, staying updated with the latest technologies and industry regulations, especially in critical areas such as the food industry and ESD systems.'}
              </p>
              <p>
                {language === 'es' 
                  ? 'La satisfacción del cliente es nuestra prioridad absoluta, y nos enorgullece mantener una tasa de satisfacción del 100% en todos nuestros proyectos completados.'
                  : 'Customer satisfaction is our absolute priority, and we are proud to maintain a 100% satisfaction rate on all our completed projects.'}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            {language === 'es' ? 'Nuestros Valores' : 'Our Values'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-foreground mb-3">
                    {value.title[language]}
                  </h4>
                  <p className="text-muted-foreground">
                    {value.description[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {language === 'es' ? '¿Listo para transformar tu espacio?' : 'Ready to transform your space?'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'es' 
                ? 'Contacta con nosotros para una consulta personalizada y descubre cómo podemos hacer realidad tu proyecto de pavimentación.'
                : 'Contact us for a personalized consultation and discover how we can make your flooring project a reality.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+34622313855"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {language === 'es' ? 'Llamar ahora' : 'Call now'}
              </a>
              <a 
                href="https://wa.me/34622313855"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-md hover:bg-accent transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
