import { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const StructuredData = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // JefeEpoxi Business Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://jefeepoxi.com/#business",
      "name": "JefeEpoxi",
      "alternateName": "Jefe Epoxi Valencia",
      "description": language === 'es' 
        ? "Especialistas en pavimentos epoxi en Valencia. Más de 5 años de experiencia en suelos industriales, alimentarios y decorativos. Presupuesto gratuito."
        : "Epoxy flooring specialists in Valencia. Over 5 years of experience in industrial, food-grade and decorative floors. Free quote.",
      "url": "https://jefeepoxi.com",
      "logo": "https://jefeepoxi.com/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.png",
      "image": [
        "https://jefeepoxi.com/src/assets/hero-epoxy-warehouse.jpg",
        "https://jefeepoxi.com/src/assets/project-industrial-blue-gray.jpg",
        "https://jefeepoxi.com/src/assets/project-decorative-metallic-gray.jpg"
      ],
      "telephone": "+34622313855",
      "email": "info@jefeepoxi.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Valencia",
        "addressRegion": "Comunidad Valenciana",
        "addressCountry": "ES",
        "streetAddress": "Valencia, España"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "39.4699",
        "longitude": "-0.3763"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Valencia"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Comunidad Valenciana"
        },
        {
          "@type": "Country",
          "name": "España"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "39.4699",
          "longitude": "-0.3763"
        },
        "geoRadius": "100000"
      },
      "priceRange": "€€€",
      "openingHours": "Mo-Fr 08:00-18:00",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "currenciesAccepted": "EUR",
      "foundingDate": "2019",
      "numberOfEmployees": "2-10",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "30",
        "bestRating": "5",
        "worstRating": "4"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Carlos Martinez"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "reviewBody": "Excelente trabajo en nuestro almacén. Pavimento epoxi de alta calidad y servicio profesional."
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Pavimentos Epoxi",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pavimentos Industriales",
              "description": "Soluciones para naves industriales y logística"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Pavimentos Alimentarios",
              "description": "Pavimentos higiénicos certificados para industria alimentaria"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Pavimentos Decorativos",
              "description": "Efectos metálicos y diseños únicos para espacios comerciales"
            }
          }
        ]
      },
      "sameAs": [
        "https://www.facebook.com/jefeepoxi",
        "https://www.instagram.com/jefeepoxi", 
        "https://wa.me/34622313855"
      ]
    };

    // Service Schema for main services
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "JefeEpoxi - Pavimentos Epoxi Valencia",
      "serviceType": "Epoxy Flooring Installation",
      "provider": {
        "@id": "https://jefeepoxi.com/#business"
      },
      "areaServed": {
        "@type": "City",
        "name": "Valencia, España"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios Especializados",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pavimentos ESD Anti-estáticos",
              "category": "Industrial Flooring",
              "description": "Cumplimiento ISO 61340, DIN EN 61340, ASTM D2737"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Reparaciones y Autonivelantes",
              "category": "Maintenance",
              "description": "Soluciones de mantenimiento integral"
            }
          }
        ]
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto dura un pavimento epoxi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un pavimento epoxi profesional puede durar entre 15-20 años con el mantenimiento adecuado, siendo superior a otros tipos de suelos industriales."
          }
        },
        {
          "@type": "Question", 
          "name": "¿Cuál es el precio por metro cuadrado?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El precio varía según el tipo de acabado y preparación necesaria. Contacta con nosotros para un presupuesto personalizado gratuito."
          }
        },
        {
          "@type": "Question",
          "name": "¿Trabajáis en toda España?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Sí, realizamos proyectos en toda España y Europa, con base en Valencia para un mejor servicio en la Comunidad Valenciana."
          }
        }
      ]
    };

    // Combine all schemas
    const combinedSchema = {
      "@context": "https://schema.org",
      "@graph": [businessSchema, servicesSchema, faqSchema]
    };

    // Create and append script
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(combinedSchema, null, 2);
    document.head.appendChild(script);

    console.log('🔍 Structured Data (Schema.org) loaded for JefeEpoxi');
  }, [language]);

  return null; // This component doesn't render anything
};

export default StructuredData;
