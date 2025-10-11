import { Users, Award, Clock, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      number: "5+",
      label: "Años de experiencia"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      number: "70+",
      label: "Proyectos completados"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      number: "100%",
      label: "Clientes satisfechos"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      number: "2",
      label: "Países europeos"
    }
  ];

  const values = [
    {
      title: "Calidad Premium",
      description: "Utilizamos únicamente materiales de primera calidad y técnicas probadas para garantizar resultados duraderos."
    },
    {
      title: "Experiencia Técnica",
      description: "Nuestro equipo cuenta con certificaciones específicas en sistemas Epoxi y cumplimiento normativo."
    },
    {
      title: "Servicio Integral",
      description: "Desde el diseño hasta el mantenimiento, ofrecemos un servicio completo para cada proyecto."
    },
    {
      title: "Compromiso de Calidad",
      description: "Desplazamiento por toda España con los mismos estándares de calidad y puntualidad."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre JefeEpoxi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Especialistas en pavimentos Epoxi con más de 5 años de experiencia transformando espacios industriales, 
            comerciales y residenciales. Nuestro compromiso es ofrecer soluciones de pavimentación 
            que combinen durabilidad, estética y funcionalidad.
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
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Nuestra Historia
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                JefeEpoxi nació de la pasión por transformar espacios mediante soluciones de pavimentación 
                innovadoras y duraderas. Comenzamos nuestro recorrido en Valencia, especializándonos en 
                pavimentos Epoxi para la industria local.
              </p>
              <p>
                Con el tiempo, nuestra reputación de excelencia y compromiso nos ha llevado a expandir 
                nuestros servicios por toda España, manteniendo siempre los más altos estándares 
                de calidad en cada proyecto.
              </p>
              <p>
                Hoy somos reconocidos como líderes en el sector, ofreciendo desde pavimentos industriales 
                de alta resistencia hasta acabados decorativos únicos que combinan funcionalidad y diseño.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Nuestro Compromiso
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                En JefeEpoxi entendemos que cada proyecto es único. Por eso, trabajamos estrechamente 
                con nuestros clientes para desarrollar soluciones personalizadas que superen sus expectativas.
              </p>
              <p>
                Nuestro equipo técnico está en constante formación, manteniéndose actualizado con las 
                últimas tecnologías y normativas del sector, especialmente en áreas críticas como la 
                industria alimentaria y sistemas ESD.
              </p>
              <p>
                La satisfacción del cliente es nuestra prioridad absoluta, y nos enorgullece mantener 
                una tasa de satisfacción del 100% en todos nuestros proyectos completados.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {value.description}
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
              ¿Listo para transformar tu espacio?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contacta con nosotros para una consulta personalizada y descubre cómo podemos 
              hacer realidad tu proyecto de pavimentación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+34622313855"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Llamar ahora
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
