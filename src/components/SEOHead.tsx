import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = 'https://jefeepoxi.com/lovable-uploads/7d37393f-2fae-4f03-9555-2b30aa15fccb.webp',
  ogType = 'website',
  keywords,
  author = 'JefeEpoxi',
  publishedTime,
  modifiedTime,
  noindex = false
}: SEOHeadProps) => {
  const fullTitle = title.includes('JefeEpoxi') ? title : `${title} | JefeEpoxi`;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://jefeepoxi.com');
  const siteUrl = 'https://jefeepoxi.com';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="JefeEpoxi" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@jefeepoxi" />
      <meta name="twitter:creator" content="@jefeepoxi" />

      {/* Additional SEO tags */}
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="ES-V" />
      <meta name="geo.placename" content="Valencia" />
      <meta name="geo.position" content="39.4699;-0.3763" />
      <meta name="ICBM" content="39.4699, -0.3763" />

      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="es" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={`${canonicalUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;


