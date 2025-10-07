import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogArticles } from '@/lib/blogData';

const BlogContent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog Pavimentos Epoxy | Guías, Consejos y Novedades"
        description="Artículos sobre pavimentos epoxy: guías técnicas, consejos de mantenimiento, comparativas, casos de éxito. Información profesional actualizada por expertos en Valencia."
        canonical="https://jefeepoxi.com/blog"
        keywords="blog pavimentos epoxy, guías epoxy, consejos suelos industriales, mantenimiento pavimentos, artículos técnicos epoxy"
        ogType="website"
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Button variant="outline" asChild className="flex items-center">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  {t('blog.backHome')}
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={t(article.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} {t('blog.readTime')}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground line-clamp-2">
                      {t(article.titleKey)}
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {t(article.excerptKey)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t('blog.publishedOn')} {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                      <Link to={`/blog/${article.id}`}>
                        <Button variant="ghost" size="sm" className="group">
                          {t('blog.readMore')}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Blog = () => {
  return <BlogContent />;
};

export default Blog;
