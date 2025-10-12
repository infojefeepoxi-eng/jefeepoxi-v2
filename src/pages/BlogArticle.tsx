import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Palette, Wrench, Sparkles, Building, ArrowLeft, Clock, Euro, Home as HomeIcon, Paintbrush, Phone } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getBlogArticle } from '@/lib/blogData';

// Article images
import articleIndustrialFloor from '@/assets/article-industrial-floor.png';
import articleWarehouseFloor from '@/assets/article-warehouse-floor.png';
import articleFactoryFloor from '@/assets/article-factory-floor.png';
import articleKitchenFloor from '@/assets/article-kitchen-floor.png';
import articleShowroomFloor from '@/assets/article-showroom-floor.png';
import articleLogisticsFloor from '@/assets/article-logistics-floor.png';
import articleLastFloor from '@/assets/article-last-floor.png';

const BlogArticleContent = () => {
  const { t } = useLanguage();
  const { articleId } = useParams();
  
  const article = getBlogArticle(articleId || '');

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Render different content based on article ID
  if (article.id === 'why-epoxi-wins') {
    return <WhyEpoxiWinsArticle article={article} />;
  } else if (article.id === 'suelo-resina-epoxi-completo') {
    return <SueloResinaEpoxiCompleto article={article} />;
  } else if (article.id === 'epoxi-vs-tradicional-comparativa') {
    return <EpoxiVsTradicionalArticle article={article} />;
  }

  return <Navigate to="/blog" replace />;
};

// First article component (existing)
const WhyEpoxiWinsArticle = ({ article }: { article: any }) => {
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
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.seo.title}
        description={article.seo.description}
        canonical={`https://jefeepoxi.com/blog/${article.id}`}
        keywords={article.seo.keywords}
        ogType="article"
      />
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
                {t(article.titleKey)}
              </h1>
              
              <div className="aspect-video rounded-2xl overflow-hidden mb-12">
                <img 
                  src={article.image} 
                  alt={t(article.titleKey)}
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

// New comprehensive article about epoxy resin floors
const SueloResinaEpoxiCompleto = ({ article }: { article: any }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <SEOHead
        title={article.seo.title}
        description={article.seo.description}
        canonical={`https://jefeepoxi.com/blog/${article.id}`}
        keywords={article.seo.keywords}
        ogType="article"
      />
      <Header />
      <main className="pt-20">
        {/* Breadcrumb Navigation */}
        <section className="py-4 bg-gray-50 dark:bg-card/50 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Link to="/blog" className="text-primary hover:underline flex items-center text-sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('blog.backToNews')}
              </Link>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-16 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-foreground mb-8 leading-tight">
                {t(article.titleKey)}
              </h1>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-8 shadow-xl">
                <img 
                  src={article.image} 
                  alt={t(article.titleKey)}
                  className="w-full h-full object-cover"
                />
              </div>

              <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic mb-12 text-center">
                {t('blog.article2.imgCaption1')}
              </figcaption>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="pb-20 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="mb-16 space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p className="text-gray-800 dark:text-foreground">
                  <strong className="text-gray-900 dark:text-foreground">{t('blog.article2.intro.p1')}</strong>
                </p>
                <p className="text-gray-800 dark:text-foreground">{t('blog.article2.intro.p2')}</p>
                <p className="text-gray-800 dark:text-foreground">{t('blog.article2.intro.p3')}</p>
                <p className="text-gray-800 dark:text-foreground italic">
                  {t('blog.article2.intro.p4')}
                </p>
              </div>

              {/* What is epoxy resin floor */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-8 border-l-4 border-primary pl-4">
                  {t('blog.article2.what.title')}
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  <p className="text-gray-800 dark:text-foreground">{t('blog.article2.what.p1')}</p>
                  <p className="text-gray-800 dark:text-foreground">{t('blog.article2.what.p2')}</p>
                  <p className="text-gray-800 dark:text-foreground">{t('blog.article2.what.p3')}</p>
                </div>

                {/* Image placeholder */}
                <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={articleIndustrialFloor} 
                    alt="Suelo de resina epoxi en nave industrial"
                    className="w-full h-auto"
                  />
                  <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                    {t('blog.article2.imgCaption1')}
                  </figcaption>
                </div>
              </section>

              {/* Characteristics */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-8 border-l-4 border-primary pl-4">
                  {t('blog.article2.characteristics.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  {t('blog.article2.char.intro')}
                </p>

                <div className="space-y-8">
                  {/* Each characteristic as a subsection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                      {t('blog.article2.char.resistance.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('blog.article2.char.resistance.text')}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                      {t('blog.article2.char.application.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('blog.article2.char.application.text')}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                      {t('blog.article2.char.finish.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('blog.article2.char.finish.text')}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                      {t('blog.article2.char.drying.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('blog.article2.char.drying.text')}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                      {t('blog.article2.char.solvent.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('blog.article2.char.solvent.text')}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                      {t('blog.article2.char.specialized.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('blog.article2.char.specialized.text')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={articleWarehouseFloor} 
                  alt="Aplicación suelo de resina epoxi en almacén"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  {t('blog.article2.imgCaption2')}
                </figcaption>
              </div>

              {/* Types of epoxy floors */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-8 border-l-4 border-primary pl-4">
                  {t('blog.article2.types.title')}
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">
                      {t('blog.article2.types.autonivelante.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.types.autonivelante.text')}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">
                      {t('blog.article2.types.multicapa.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.types.multicapa.text')}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">
                      {t('blog.article2.types.3d.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.types.3d.text')}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">
                      {t('blog.article2.types.microcemento.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.types.microcemento.text')}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">
                      {t('blog.article2.types.pintura.title')}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.types.pintura.text')}</p>
                  </div>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={articleLogisticsFloor} 
                  alt="Microcemento epoxi pintura Topciment"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  {t('blog.article2.imgCaption3')}
                </figcaption>
              </div>

              {/* Where to install */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-8 border-l-4 border-primary pl-4">
                  {t('blog.article2.uses.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {t('blog.article2.uses.intro')}
                </p>

                <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p><strong>1.</strong> {t('blog.article2.uses.sanitary')}</p>
                  <p><strong>2.</strong> {t('blog.article2.uses.chemical')}</p>
                  <p><strong>3.</strong> {t('blog.article2.uses.aesthetic')}</p>
                  <p><strong>4.</strong> {t('blog.article2.uses.decorative')}</p>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={articleKitchenFloor} 
                  alt="Cocina con suelo de resina epoxi"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  {t('blog.article2.imgCaption4')}
                </figcaption>
              </div>

              {/* Price section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.price.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{t('blog.article2.price.intro')}</p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {t('blog.article2.price.summary')}
                </p>
                
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p><strong>1.</strong> {t('blog.article2.price.factor1')}</p>
                  <p><strong>2.</strong> {t('blog.article2.price.factor2')}</p>
                  <p><strong>3.</strong> {t('blog.article2.price.factor3')}</p>
                  <p><strong>4.</strong> {t('blog.article2.price.factor4')}</p>
                  <p><strong>5.</strong> {t('blog.article2.price.factor5')}</p>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={articleShowroomFloor} 
                  alt="Suelo de resina epoxi en concesionario"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  {t('blog.article2.imgCaption5')}
                </figcaption>
              </div>

              {/* Wood floors */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.wood.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {t('blog.article2.wood.intro')}
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {t('blog.article2.wood.intro2')}
                </p>

                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>• {t('blog.article2.wood.benefit1')}</p>
                  <p>• {t('blog.article2.wood.benefit2')}</p>
                  <p>• {t('blog.article2.wood.benefit3')}</p>
                  <p>• {t('blog.article2.wood.benefit4')}</p>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={articleFactoryFloor} 
                  alt="Suelo de resina epoxi en fábrica"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  {t('blog.article2.imgCaption6')}
                </figcaption>
              </div>

              {/* Home applications */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.home.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {t('blog.article2.home.intro')}
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">{t('blog.article2.home.section1')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.aesthetic')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">{t('blog.article2.home.section2')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.compatibility')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">{t('blog.article2.home.section3')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.waterproof')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">{t('blog.article2.home.section4')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.antislip')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">{t('blog.article2.home.section5')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.maintenance')}</p>
                  </div>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={articleLastFloor} 
                  alt="Aplicación suelo resina epoxi en fábrica"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  {t('blog.article2.imgCaption7')}
                </figcaption>
              </div>

              {/* Exterior application */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.exterior.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {t('blog.article2.exterior.p1')}
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {t('blog.article2.exterior.p2')}
                </p>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  {t('blog.article2.exterior.sealTitle')}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('blog.article2.exterior.text')}
                </p>
              </section>

              {/* CTA Section */}
              <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-12 mt-12">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-foreground mb-4">
                    {t('blog.article2.cta.title')}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    {t('blog.article2.cta.description')}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
                    asChild
                  >
                    <Link to="/#contact">
                      {t('blog.article2.cta.button')}
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Back to blog */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Link to="/blog" className="text-primary hover:underline flex items-center text-lg font-semibold">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t('blog.article2.backToAll')}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

// Third article: Complete Guide to Epoxy Floors
const EpoxiVsTradicionalArticle = ({ article }: { article: any }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.seo.title}
        description={article.seo.description}
        canonical={`https://jefeepoxi.com/blog/${article.id}`}
        keywords={article.seo.keywords}
        ogType="article"
      />
      <Header />
      <main className="pt-20">
        {/* Article Header */}
        <section className="py-12 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <Link to="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Button>
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span>Publicado el {new Date(article.publishedAt).toLocaleDateString('es-ES')}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min de lectura</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                Suelos de Resina Epoxi: Todo lo que Necesitas Saber en 2025
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Guía completa sobre pavimentos de resina epoxi: qué son, cómo funcionan, sus increíbles ventajas y por qué se han convertido en la solución preferida para suelos industriales, comerciales y residenciales modernos.
              </p>
              
              <div className="aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <img 
                  src={article.image} 
                  alt="Suelos de resina epoxi modernos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              
              <h2 className="text-3xl font-bold mt-12 mb-6">¿Qué es la Resina Epoxi?</h2>
              
              <p className="text-lg leading-relaxed mb-4">
                La resina epoxi es un material polimérico termoestable que se forma mediante la reacción química entre dos componentes: una resina base y un endurecedor. Esta reacción, conocida como curado, transforma el material líquido en una superficie sólida, dura y extremadamente resistente. A diferencia de otros recubrimientos que simplemente se secan por evaporación del solvente, el epoxi experimenta una transformación química real que le confiere propiedades únicas y superiores.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Los suelos de resina epoxi no son simplemente una capa de pintura sobre el hormigón existente. Son sistemas completos de pavimentación que crean una membrana continua y monolítica, sin juntas ni uniones. Esta característica fundamental los distingue de prácticamente cualquier otro tipo de pavimento y es la clave de muchas de sus ventajas.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                El proceso de aplicación permite que la resina penetre microscópicamente en el sustrato de hormigón, creando una unión molecular extraordinariamente fuerte. Una vez curado, el resultado es una superficie que combina la resistencia estructural del hormigón con las propiedades protectoras y funcionales de la resina epoxi.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">La Revolución de los Pavimentos Modernos</h2>

              <p className="text-lg leading-relaxed mb-4">
                Durante décadas, las opciones para pavimentos industriales y comerciales eran limitadas y problemáticas. Las baldosas cerámicas tenían juntas que acumulaban suciedad y bacterias. El hormigón sin tratar generaba polvo constantemente y absorbía manchas. La madera era inapropiada para entornos húmedos o químicos. Y las piedras naturales eran prohibitivamente caras para grandes superficies.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                La resina epoxi cambió completamente este paradigma. Por primera vez, fue posible tener un pavimento que fuera simultáneamente impermeable, resistente a productos químicos, higiénico, duradero, estético y económicamente viable. Esta combinación de propiedades era simplemente imposible con los materiales tradicionales.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Hoy en día, si visitas almacenes logísticos modernos, plantas de producción de alimentos, hospitales de última generación o showrooms de automóviles premium, encontrarás un denominador común: suelos de resina epoxi. Esta adopción masiva no es casualidad, sino el resultado de ventajas técnicas y económicas abrumadoras.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Ventajas Fundamentales de los Suelos Epoxi</h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4">1. Impermeabilidad Absoluta</h3>

              <p className="text-lg leading-relaxed mb-4">
                Una de las propiedades más valiosas de la resina epoxi es su impermeabilidad completa. A diferencia del hormigón poroso, las baldosas con juntas o la madera que absorbe humedad, un suelo epoxi correctamente aplicado forma una barrera impenetrable contra el agua y cualquier líquido.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Esta característica tiene implicaciones profundas. En instalaciones de procesamiento de alimentos, significa que no hay riesgo de que líquidos orgánicos penetren en el pavimento y creen focos de bacterias inaccesibles a la limpieza. En parkings, significa que el agua de lluvia, la nieve derretida y los productos químicos de deshielo no dañarán la estructura del pavimento. En laboratorios químicos, significa que los derrames accidentales se quedan en la superficie y pueden limpiarse completamente sin dejar contaminación residual.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                La impermeabilidad del epoxi no se degrada con el tiempo como los selladores superficiales del hormigón. Es una propiedad intrínseca del material que se mantiene durante toda la vida útil del pavimento, típicamente 15-25 años en entornos industriales exigentes.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">2. Resistencia Química Excepcional</h3>

              <p className="text-lg leading-relaxed mb-4">
                Los suelos epoxi resisten una gama extraordinariamente amplia de productos químicos que destruirían rápidamente otros pavimentos. Aceites industriales, gasolina, diésel, ácidos débiles y moderados, álcalis, solventes orgánicos, productos de limpieza agresivos... todos estos pueden derramarse sobre epoxi sin causar daño permanente.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Esta resistencia química no es superficial. Incluso si el producto químico permanece en contacto con el suelo durante horas o días, el epoxi no se disuelve, no se mancha permanentemente y no se degrada estructuralmente. Compare esto con hormigón sin tratar, que absorbe aceites y se mancha irreversiblemente, o con vinilo/PVC que se disuelve literalmente con muchos solventes industriales.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                En talleres de automóviles, fábricas de productos químicos, instalaciones de mantenimiento de vehículos y plantas industriales en general, esta resistencia química significa años de ahorro en no tener que reemplazar pavimentos dañados. También significa un entorno de trabajo más seguro, ya que los derrames pueden limpiarse rápida y completamente sin dejar residuos químicos peligrosos absorbidos en el suelo.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">3. Higiene y Facilidad de Limpieza</h3>

              <p className="text-lg leading-relaxed mb-4">
                La superficie continua y no porosa del epoxi representa una revolución en higiene industrial. Sin juntas donde puedan esconderse bacterias, sin poros donde penetre la suciedad, sin grietas donde se acumule materia orgánica. La limpieza se convierte en un proceso simple y rápido: barre, friega o lava a presión, y el suelo vuelve a estar impecable.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Esta propiedad es crítica en la industria alimentaria, donde las normas sanitarias son extremadamente estrictas. Los pavimentos epoxi cumplen con las certificaciones de seguridad alimentaria más exigentes, incluyendo normas HACCP. Hospitales, clínicas veterinarias, laboratorios farmacéuticos y cualquier instalación donde la higiene sea prioritaria han adoptado masivamente los suelos epoxi precisamente por esta razón.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Además, el epoxi puede formularse con aditivos antimicrobianos que inhiben activamente el crecimiento de bacterias, hongos y moho en la superficie. Esto proporciona una capa adicional de protección sanitaria imposible de lograr con pavimentos tradicionales.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">4. Durabilidad y Resistencia al Tráfico</h3>

              <p className="text-lg leading-relaxed mb-4">
                Los suelos epoxi industriales están diseñados para soportar niveles de tráfico y abuso que destruirían rápidamente otros pavimentos. Montacargas que circulan constantemente, palets de varias toneladas arrastrándose, impactos de herramientas metálicas, abrasión continua... el epoxi lo resiste todo.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                La dureza superficial del epoxi curado es comparable a la del hormigón de alta resistencia, pero sin su fragilidad. Mientras que el hormigón puede agrietarse o descascararse bajo impacto, el epoxi tiene cierta flexibilidad que le permite absorber golpes sin daño estructural. Esta combinación de dureza y resiliencia es única entre los materiales de pavimentación.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                En términos de vida útil, un sistema epoxi bien instalado típicamente dura 15-25 años en entornos industriales de alto tráfico antes de requerir renovación significativa. En aplicaciones comerciales o residenciales con tráfico más ligero, la vida útil puede extenderse fácilmente a 25-30 años. Compare esto con baldosas cerámicas que requieren rejuntado cada 5-10 años, o vinilo que debe reemplazarse cada 7-12 años.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">5. Versatilidad Estética Ilimitada</h3>

              <p className="text-lg leading-relaxed mb-4">
                Contrariamente a la percepción de que los suelos industriales deben ser grises y aburridos, la resina epoxi ofrece posibilidades estéticas prácticamente ilimitadas. Puede pigmentarse en cualquier color imaginable. Puede incorporar escamas decorativas de colores para crear efectos moteados elegantes. Puede aplicarse con técnicas de metalizado para imitar acero o cobre. Puede mezclarse con arenas de cuarzo de colores para crear terrazzos sintéticos impresionantes.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Para aplicaciones decorativas de alto nivel, el epoxi puede incluso imitar convincentemente mármol, granito, madera o hormigón pulido, obteniendo la estética deseada sin sacrificar ninguna de las ventajas funcionales del epoxi. Showrooms de automóviles de lujo, tiendas de moda, lobbies corporativos y viviendas exclusivas utilizan cada vez más sistemas epoxi decorativos que combinan belleza con practicidad.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Además, el epoxi permite incorporar señalización permanente directamente en el pavimento. Líneas de circulación, zonas de seguridad, áreas de almacenamiento, logotipos corporativos... todo puede integrarse en el suelo durante la aplicación, eliminando la necesidad de pintura que se desgasta con el tráfico.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">6. Seguridad Antideslizante Ajustable</h3>

              <p className="text-lg leading-relaxed mb-4">
                La resina epoxi puede formularse con diferentes niveles de textura antideslizante según las necesidades específicas de cada aplicación. Desde acabados ligeramente texturados (R9-R10) apropiados para oficinas y comercios, hasta superficies fuertemente rugosas (R12-R13) para rampas, zonas húmedas o áreas industriales donde se trabaja con aceites.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Esta capacidad de ajustar la resistencia al deslizamiento según las necesidades es una ventaja significativa sobre materiales con propiedades fijas. En un autolavado, por ejemplo, puedes tener un acabado R13 ultra antideslizante en las zonas de lavado donde hay agua y jabón constantemente, pero un acabado R10 más suave en las zonas de espera donde los clientes caminan.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Importante destacar que, a diferencia de los tratamientos antideslizantes superficiales que se desgastan con el uso, la textura del epoxi está integrada en todo el espesor del recubrimiento y se mantiene durante toda la vida del pavimento.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">7. Instalación Rápida y Mínima Interrupción</h3>

              <p className="text-lg leading-relaxed mb-4">
                En el mundo empresarial moderno, el tiempo es dinero. Cerrar un almacén, una fábrica o un comercio para renovar el suelo puede costar miles de euros por día en producción o ventas perdidas. Los suelos epoxi ofrecen una ventaja decisiva aquí: rapidez de instalación.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Un sistema epoxi típico puede aplicarse y estar listo para tráfico ligero en 24-48 horas, y para tráfico pesado industrial en 3-5 días. Compare esto con baldosas cerámicas que requieren 7-10 días (instalación, secado del adhesivo, rejuntado, secado del rejunte), o hormigón pulido que necesita 10-15 días de trabajo.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Existen incluso formulaciones de epoxi de curado ultra rápido que permiten reabrir al tráfico en 4-6 horas, ideales para situaciones donde el cierre prolongado es imposible. Esta capacidad de minimizar la interrupción operativa representa un ahorro económico considerable y es una razón clave por la que las empresas eligen epoxi.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">8. Excelente Relación Calidad-Precio</h3>

              <p className="text-lg leading-relaxed mb-4">
                Aunque el costo inicial de instalación del epoxi (20-45 €/m² para sistemas industriales estándar) puede ser similar o ligeramente superior a algunas alternativas como baldosas básicas o vinilo, el análisis del costo total durante la vida útil del pavimento cuenta una historia completamente diferente.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                El epoxi requiere mantenimiento mínimo: limpieza regular con fregona o máquina fregadora, y ocasionalmente lavado a presión. No necesita rejuntado periódico como las baldosas. No necesita barnizado cada pocos años como la madera. No necesita selladores anuales como el hormigón pulido. Este bajo mantenimiento se traduce en ahorros significativos año tras año.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Cuando calculas el costo total de propiedad durante 10-15 años (instalación inicial + mantenimiento + renovaciones), el epoxi típicamente resulta 30-50% más económico que baldosas cerámicas y hasta 60% más económico que madera o piedra natural, mientras ofrece rendimiento superior en casi todos los aspectos funcionales.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Aplicaciones Ideales de la Resina Epoxi</h2>

              <p className="text-lg leading-relaxed mb-4">
                Los suelos de resina epoxi son excepcionalmente versátiles y adecuados para una amplísima gama de aplicaciones:
              </p>

              <p className="text-lg leading-relaxed mb-4">
                <strong>Industria y logística:</strong> Almacenes, centros de distribución, naves de producción, fábricas de cualquier tipo. El epoxi soporta el tráfico intenso de montacargas, el movimiento constante de mercancías y el abuso diario de operaciones industriales mejor que cualquier alternativa.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                <strong>Industria alimentaria:</strong> Cocinas industriales, plantas de procesamiento de alimentos, mataderos, panaderías, bodegas, cervecerías. La combinación de impermeabilidad, resistencia química, higiene y facilidad de limpieza hace del epoxi la elección obvia para entornos donde la seguridad alimentaria es crítica.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                <strong>Sector sanitario:</strong> Hospitales, clínicas, consultorios médicos, laboratorios, clínicas veterinarias. La superficie continua sin juntas y las propiedades antimicrobianas opcionales hacen del epoxi el pavimento ideal donde la higiene es prioritaria.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                <strong>Automoción:</strong> Talleres de reparación, concesionarios, parkings, garajes residenciales. La resistencia a aceites, gasolina y productos químicos automotrices, combinada con fácil limpieza, hace del epoxi la solución perfecta para cualquier aplicación relacionada con vehículos.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                <strong>Comercio y retail:</strong> Tiendas, showrooms, centros comerciales, restaurantes, hoteles. Las posibilidades estéticas del epoxi permiten crear espacios atractivos que también son prácticos y duraderos.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                <strong>Residencial:</strong> Garajes, sótanos, cocinas modernas, salones de estilo industrial. Cada vez más propietarios de viviendas descubren las ventajas del epoxi para crear espacios contemporáneos, fáciles de mantener y extremadamente duraderos.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">El Futuro de los Pavimentos es Epoxi</h2>

              <p className="text-lg leading-relaxed mb-4">
                La tecnología de resinas epoxi continúa evolucionando. Las nuevas formulaciones ofrecen curado aún más rápido, mayor resistencia a la abrasión, mejor rendimiento en temperaturas extremas y opciones decorativas cada vez más sofisticadas. Algunas resinas de nueva generación incluso tienen propiedades de auto-reparación de rayones superficiales.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                La sostenibilidad también está mejorando. Fabricantes líderes están desarrollando resinas epoxi con mayor contenido de materiales renovables y menores emisiones de VOC (compuestos orgánicos volátiles), haciendo del epoxi una opción progresivamente más ecológica.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Según estudios de mercado de la construcción industrial europea, más del 75% de las nuevas instalaciones industriales y comerciales optan por pavimentos epoxi. Esta adopción masiva refleja una realidad simple: cuando se evalúan objetivamente todas las variables (rendimiento, durabilidad, estética, costo total, mantenimiento), la resina epoxi emerge como la solución superior para la gran mayoría de aplicaciones.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Conclusión</h2>

              <p className="text-lg leading-relaxed mb-4">
                Los suelos de resina epoxi representan una de las innovaciones más significativas en tecnología de pavimentos de las últimas décadas. Combinan propiedades que antes eran mutuamente excluyentes: belleza estética con extrema durabilidad, impermeabilidad total con transpirabilidad del sustrato, resistencia química con seguridad para alimentos, instalación rápida con vida útil prolongada.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                Para aplicaciones industriales y comerciales donde el pavimento debe trabajar duramente día tras día, la superioridad del epoxi sobre alternativas tradicionales es abrumadora. Para aplicaciones residenciales donde se valora tanto la estética como la practicidad, el epoxi ofrece una combinación única que ningún otro material puede igualar.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Si estás considerando un nuevo pavimento o la renovación de uno existente, ya sea para un almacén de 10,000 m², un restaurante, un garaje residencial o cualquier espacio intermedio, los suelos de resina epoxi merecen estar en la parte superior de tu lista de consideración. Las ventajas son reales, cuantificables y duraderas.
              </p>

              {/* CTA Section */}
              <div className="not-prose bg-primary text-primary-foreground rounded-2xl p-8 text-center my-16">
                <h3 className="text-2xl font-bold mb-4">¿Listo para Descubrir las Ventajas del Epoxi en Tu Proyecto?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Contáctanos para una consulta gratuita y presupuesto sin compromiso. Más de 15 años de experiencia en pavimentos epoxi en Valencia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/#contact">
                    <Button size="lg" variant="secondary" className="text-lg px-8">
                      <Phone className="w-5 h-5 mr-2" />
                      Solicitar Presupuesto
                    </Button>
                  </Link>
                  <Link to="/#services">
                    <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white">
                      Ver Nuestros Servicios
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Back to blog */}
              <div className="not-prose mt-16 pt-8 border-t border-border">
                <Link to="/blog" className="text-primary hover:underline flex items-center text-lg font-semibold">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver a Todos los Artículos
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

const BlogArticle = () => {
  return <BlogArticleContent />;
};

export default BlogArticle;