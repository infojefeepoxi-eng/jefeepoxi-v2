// Blog Articles Data
import vlogHeroImage from '@/assets/vlog-epoxy-hero.jpg';
import blogEpoxiModernImage from '@/assets/blog-epoxi-modern.webp';
import blogEpoxiGuideImage from '@/assets/blog-epoxi-guide.webp';

export interface BlogArticle {
  id: string;
  titleKey: string;
  excerptKey: string;
  image: string;
  publishedAt: string;
  readTime: number;
  category: string;
  contentKey: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'epoxi-vs-tradicional-comparativa',
    titleKey: 'blog.article3.title',
    excerptKey: 'blog.article3.excerpt',
    image: blogEpoxiModernImage,
    publishedAt: '2025-01-12',
    readTime: 20,
    category: 'Guía Completa',
    contentKey: 'blog.article3',
    seo: {
      title: 'Suelos de Resina Epoxi: Guía Completa 2025 | Todo sobre Pavimentos Epoxi',
      description: 'Guía completa sobre suelos de resina epoxi: qué son, cómo funcionan, todas sus ventajas, aplicaciones ideales. Descubre por qué son la mejor solución para pavimentos modernos.',
      keywords: 'suelos resina epoxi, pavimentos epoxi, ventajas epoxi, que es resina epoxi, pisos epoxi industriales, suelos epoxi comerciales, pavimento epoxi características'
    }
  },
  {
    id: 'suelo-resina-epoxi-completo',
    titleKey: 'blog.article2.title',
    excerptKey: 'blog.article2.excerpt',
    image: blogEpoxiGuideImage,
    publishedAt: '2025-01-06',
    readTime: 15,
    category: 'Guía Completa',
    contentKey: 'blog.article2',
    seo: {
      title: 'Suelo de resina epoxi: Guía completa 2025 | Tipos, precios y aplicaciones',
      description: 'Todo sobre suelos de resina epoxi: tipos, características, ventajas, precios por m2, aplicaciones industriales y decorativas. Guía profesional completa.',
      keywords: 'suelo resina epoxi, pavimento epoxi, precio epoxi m2, tipos suelos epoxi, pavimento industrial, suelo autonivelante, pintura epoxi'
    }
  }
];

export const getBlogArticle = (id: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.id === id);
};

