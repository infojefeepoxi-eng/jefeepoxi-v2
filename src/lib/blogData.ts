// Blog Articles Data
import vlogHeroImage from '@/assets/vlog-epoxy-hero.jpg';

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
    id: 'suelo-resina-epoxi-completo',
    titleKey: 'blog.article2.title',
    excerptKey: 'blog.article2.excerpt',
    image: vlogHeroImage,
    publishedAt: '2024-10-06',
    readTime: 15,
    category: 'Guía Completa',
    contentKey: 'blog.article2',
    seo: {
      title: 'Suelo de resina epoxi: Guía completa 2024 | Tipos, precios y aplicaciones',
      description: 'Todo sobre suelos de resina epoxi: tipos, características, ventajas, precios por m2, aplicaciones industriales y decorativas. Guía profesional completa.',
      keywords: 'suelo resina epoxi, pavimento epoxi, precio epoxi m2, tipos suelos epoxi, pavimento industrial, suelo autonivelante, pintura epoxi'
    }
  }
];

export const getBlogArticle = (id: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.id === id);
};

