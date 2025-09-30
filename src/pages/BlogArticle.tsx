import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Palette, Wrench, Sparkles, Building, ArrowLeft, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import vlogHeroImage from '@/assets/vlog-epoxy-hero.jpg';

const BlogArticleContent = () => {
  const { t } = useLanguage();
  const { articleId } = useParams();

  // Mock article data - in a real app, this would be fetched based on articleId
  const article = {
    id: 'why-epoxy-wins',
    title: t('vlog.title'),
    image: vlogHeroImage,
    publishedAt: '2024-01-15',
    readTime: 5,
    category: 'Technical'
  };

  const advantages = [
    { key: 'chemical', icon: Shield },
    { key: 'waterproof', icon: CheckCircle },
    { key: 'design', icon: Palette },
    { key: 'durability', icon: Wrench },
    { key: 'decorative', icon: Sparkles },
    { key: 'versatile', icon: Building },
  ];

  if (!article || articleId !== 'why-epoxy-wins') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Article Header */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Link to="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('blog.backToBlog')}
              </Button>
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span>{t('blog.publishedOn')} {new Date(article.publishedAt).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} {t('blog.readTime')}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                {article.title}
              </h1>
              
              <div className="aspect-video rounded-2xl overflow-hidden mb-12">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
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
                  <Link to="/#contact">
                    {t('vlog.cta')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const BlogArticle = () => {
  return <BlogArticleContent />;
};

export default BlogArticle;
