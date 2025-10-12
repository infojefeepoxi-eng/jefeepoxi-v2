import { Helmet } from 'react-helmet-async';

interface LocalBusinessProps {
  type: 'LocalBusiness';
  name?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
}

interface ServiceProps {
  type: 'Service';
  name: string;
  description: string;
  provider: {
    name: string;
    telephone: string;
  };
  areaServed: string;
  serviceType: string;
}

interface FAQProps {
  type: 'FAQPage';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

type StructuredDataProps = LocalBusinessProps | ServiceProps | FAQProps;

const StructuredData = (props: StructuredDataProps) => {
  let schemaData: any;

  if (props.type === 'LocalBusiness') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": props.name || "JefeEpoxi - Pavimentos Epoxy Valencia",
      "description": props.description || "Especialistas en pavimentos de resina epoxi en Valencia. Más de 5 años de experiencia en suelos industriales, alimentarios, decorativos y técnicos.",
      "image": "https://jefeepoxi.com/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.webp",
      "telephone": props.telephone || "+34622313855",
      "email": props.email || "contacto@jefeepoxi.com",
      "address": props.address || {
        "@type": "PostalAddress",
        "streetAddress": "Calle Principal",
        "addressLocality": "Valencia",
        "postalCode": "46000",
        "addressCountry": "ES"
      },
      "geo": props.geo ? {
        "@type": "GeoCoordinates",
        "latitude": props.geo.latitude,
        "longitude": props.geo.longitude
      } : {
        "@type": "GeoCoordinates",
        "latitude": 39.4699,
        "longitude": -0.3763
      },
      "url": "https://jefeepoxi.com",
      "priceRange": props.priceRange || "€€",
      "openingHours": props.openingHours || ["Mo-Fr 08:00-18:00", "Sa 09:00-14:00"],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 39.4699,
          "longitude": -0.3763
        },
        "geoRadius": "100000"
      },
      "sameAs": [
        "https://www.facebook.com/jefeepoxi",
        "https://www.instagram.com/jefeepoxi"
      ]
    };
  } else if (props.type === 'Service') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": props.name,
      "description": props.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": props.provider.name,
        "telephone": props.provider.telephone,
        "url": "https://jefeepoxi.com"
      },
      "areaServed": {
        "@type": "City",
        "name": props.areaServed
      },
      "serviceType": props.serviceType,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": props.name,
        "itemListElement": [{
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": props.name
          }
        }]
      }
    };
  } else if (props.type === 'FAQPage') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": props.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
