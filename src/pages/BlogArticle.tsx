import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Palette, Wrench, Sparkles, Building, ArrowLeft, Clock, Euro, Home as HomeIcon, Paintbrush } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getBlogArticle } from '@/lib/blogData';

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
                Volver a Noticias
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
                Planta baja de una nave industrial en la que se ha aplicado suelo de resina epoxi.
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
                  Pero, ¿en qué consiste exactamente un suelo epoxi? A continuación os damos las claves de un pavimento continuo con enormes posibilidades y excelentes prestaciones técnicas.
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
                    src={article.image} 
                    alt="Suelo de resina epoxi en nave industrial"
                    className="w-full h-auto"
                  />
                  <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                    Planta baja de una nave industrial en la que se ha aplicado suelo de resina epoxi.
                  </figcaption>
                </div>
              </section>

              {/* Characteristics */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-8 border-l-4 border-primary pl-4">
                  {t('blog.article2.characteristics.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  El suelo epoxi presenta <strong>importantes beneficios, pero también algún que otro inconveniente.</strong> Factores que hay que evaluar para determinar si es el tipo de pavimento que se está buscando y si se adapta o no a los gustos y necesidades. A continuación desarrollamos los principales:
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
                  src={article.image} 
                  alt="Aplicación suelo de resina epoxi en almacén"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  Un par de operarios aplicando suelo de resina epoxi en un almacén.
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
                  src={article.image} 
                  alt="Microcemento epoxi pintura Topciment"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  Amplio pasillo de oficina cuyo suelo se ha recubierto con pintura epoxi.
                </figcaption>
              </div>

              {/* Where to install */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-8 border-l-4 border-primary pl-4">
                  {t('blog.article2.uses.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Un suelo de resina epoxi puede instalarse casi sobre cualquier superficie. Su bajo espesor permite un mantenimiento muy rápido del mismo. Ahora bien, hay algunos lugares donde su uso es más frecuente que otros. A continuación, vamos a desarrollar los principales ámbitos en los que encontramos este pavimento continuo.
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
                  src={article.image} 
                  alt="Cocina con suelo de resina epoxi"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  Pequeña cocina abierta al salón en forma de L con suelo de resina epoxi.
                </figcaption>
              </div>

              {/* Price section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.price.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{t('blog.article2.price.intro')}</p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  En definitiva, el precio por m2 de un suelo de resina epoxi está sujeto a los siguientes factores:
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
                  src={article.image} 
                  alt="Suelo de resina epoxi en concesionario"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  Concesionario de coches con suelo de resina epoxi en todo el pavimento.
                </figcaption>
              </div>

              {/* Wood floors */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.wood.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Seguro que te has fijado en esos originales muebles y suelos de madera encapsulados en resina epoxi. Si te gusta este rompedor acabado decorativo y te preguntas cómo hacerlo, estás en el lugar correcto.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Desarrollamos las principales cualidades que hacen de la resina epoxi el gran aliado de los suelos de madera. ¡Atención!
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
                  src={article.image} 
                  alt="Suelo de resina epoxi en fábrica"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  Amplia fábrica en la que se ha aplicado suelo de resina epoxi.
                </figcaption>
              </div>

              {/* Home applications */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.home.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Ha quedado sobradamente claro que por las particularidades de los suelos epoxi, son pavimentos que se mueven en el ámbito industrial y comercial. Ahora, ha llegado el momento de exponer los motivos por los que últimamente se ha disparado su uso en los hogares. Cinco son las razones principales del boom del suelo de resina epoxi en la vivienda.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">1. Suelo de resina epoxi en la vivienda: estética novedosa</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.aesthetic')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">2. La gran compatibilidad del suelo epoxi</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.compatibility')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">3. Impermeabilidad 100%</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.waterproof')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">4. El suelo epoxi es antideslizante</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.antislip')}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">5. Limpieza y mantenimiento mínimo</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('blog.article2.home.maintenance')}</p>
                  </div>
                </div>
              </section>

              {/* Image divider */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={article.image} 
                  alt="Aplicación suelo resina epoxi en fábrica"
                  className="w-full h-auto"
                />
                <figcaption className="text-sm text-gray-500 dark:text-muted-foreground italic p-4 bg-gray-50 dark:bg-card text-center">
                  Operario aplicando suelo de resina epoxi en la planta principal de una fábrica.
                </figcaption>
              </div>

              {/* Exterior application */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-primary mb-6 border-l-4 border-primary pl-4">
                  {t('blog.article2.exterior.title')}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  El amarilleamiento es uno de los principales inconvenientes de utilizar un suelo de resina epoxi en el exterior, ya que es un pavimento sensible a los rayos solares y a las inclemencias atmosféricas. De ahí, que su uso predominante sea como revestimiento continuo interior y no sea muy popular para exterior.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  No obstante, esto no significa que no pueda hacerse de ninguna de las maneras. Con un correcto tratamiento se puede solventar el handicap del amarilleamiento y apostar por un suelo de resina epoxi en el exterior. Si estás convencido en servirte de este pavimento para terrazas, presta atención.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  Cómo sellar el suelo de resina epoxi para poder aplicarlo en exterior
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('blog.article2.exterior.text')}
                </p>
              </section>

              {/* CTA Section */}
              <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-12 mt-12">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-foreground mb-4">
                    ¿Necesitas asesoramiento profesional?
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Nuestro equipo de expertos está listo para ayudarte a elegir el mejor sistema de pavimento epoxi para tu proyecto industrial, comercial o residencial.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
                    asChild
                  >
                    <Link to="/#contact">
                      Solicitar presupuesto gratuito
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Back to blog */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Link to="/blog" className="text-primary hover:underline flex items-center text-lg font-semibold">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver a todas las noticias
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