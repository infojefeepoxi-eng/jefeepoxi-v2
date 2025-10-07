import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre Nosotros',
    'nav.quote': 'Solicitar Presupuesto',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.legal': 'Aviso Legal',
    'nav.privacy': 'Política de Privacidad',
    'nav.cookies': 'Política de Cookies',
    'nav.faq': 'FAQ',
    
    'hero.title': 'Pavimentos Epoxi profesionales en Valencia',
    'hero.subtitle': 'Más de 5 años de experiencia. 30 proyectos entregados en España y Europa.',
    'hero.cta.primary': 'Solicitar presupuesto',
    'hero.cta.secondary': 'Ver proyectos',
    'hero.cta.ai': 'Visualizar con IA',
    
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Sistemas certificados Epoxi M² para industria alimentaria, logística, parkings y aplicaciones especializadas en toda Europa',
    'services.food.title': 'Industria Alimentaria',
    'services.food.desc': 'Sistemas EpoxiLimpio M² con EscudoBio™ para máxima higiene y seguridad alimentaria',
    'services.industrial.title': 'Pavimentos Industriales',
    'services.industrial.desc': 'Sistemas de alto rendimiento EpoxiRápido M² para naves, almacenes y zonas logísticas',
    'services.parking.title': 'Parkings y Cubiertas',
    'services.parking.desc': 'Sistemas EpoxiCubierta M² para parkings, cubiertas transitables e impermeabilización',
    'services.decorative.title': 'Pavimentos Decorativos',
    'services.decorative.desc': 'Acabados exclusivos con efectos metálicos, 3D y diseños personalizados',
    'services.esd.title': 'Sistemas Especializados',
    'services.esd.desc': 'Pavimentos ESD, conductivos y químico-resistentes para industrias exigentes',
    'services.repair.title': 'Reparaciones y Mantenimiento',
    'services.repair.desc': 'Soluciones de restauración, autonivelado e impermeabilización',
    
    'projects.title': 'Nuestros Proyectos',
    'projects.filter.all': 'Todos',
    'projects.filter.industrial': 'Industrial',
    'projects.filter.food': 'Alimentario',
    'projects.filter.decorative': 'Decorativo',
    'projects.filter.parking': 'Parking',
    
    'contact.title': 'Contacto',
    'contact.phone': 'Teléfono',
    'contact.whatsapp': 'WhatsApp',
    'contact.coverage': 'Desplazamiento por toda Europa',
    
    'footer.company': 'JefeEpoxi - Pavimentos Epoxi profesionales',
    'footer.location': 'Valencia, España',

    // Vlog Section
    'vlog.title': 'Por qué la resina Epoxi es superior a otros pavimentos',
    'vlog.subtitle': 'Descubre las ventajas técnicas y estéticas que hacen del Epoxi la mejor opción',
    'vlog.cta': 'Solicitar presupuesto',
    'vlog.content.intro': 'En el mundo de los pavimentos industriales y decorativos, la resina Epoxi se ha posicionado como la solución más avanzada y versátil del mercado. Su combinación única de propiedades técnicas y estéticas la convierte en la opción preferida por profesionales y propietarios que buscan durabilidad, funcionalidad y belleza.',
    'vlog.content.durability.title': 'Durabilidad Excepcional',
    'vlog.content.durability.text': 'Los pavimentos Epoxi ofrecen una resistencia superior al desgaste, impacto y cargas pesadas. Mientras que la cerámica puede agrietarse y el vinilo se deforma, el Epoxi mantiene su integridad estructural durante décadas.',
    'vlog.content.chemical.title': 'Resistencia Química Inigualable',
    'vlog.content.chemical.text': 'A diferencia del hormigón tradicional que absorbe líquidos y se mancha, la resina Epoxi crea una barrera impermeable que resiste ácidos, bases, aceites y productos químicos industriales.',
    'vlog.content.maintenance.title': 'Mantenimiento Mínimo',
    'vlog.content.maintenance.text': 'Su superficie no porosa facilita la limpieza y desinfección, siendo ideal para industrias alimentarias y farmacéuticas donde la higiene es crucial.',
    'vlog.content.design.title': 'Versatilidad de Diseño',
    'vlog.content.design.text': 'Desde acabados industriales hasta efectos decorativos metalizados, el Epoxi ofrece infinitas posibilidades de personalización que otros pavimentos no pueden igualar.',
    'vlog.advantages.title': 'Ventajas Clave del Pavimento Epoxi',
    'vlog.advantages.chemical': 'Alta resistencia química y mecánica',
    'vlog.advantages.waterproof': 'Impermeabilidad total y fácil limpieza',
    'vlog.advantages.design': 'Flexibilidad en diseños y colores personalizados',
    'vlog.advantages.durability': 'Durabilidad superior a largo plazo',
    'vlog.advantages.decorative': 'Soluciones decorativas y efectos únicos',
    'vlog.advantages.versatile': 'Ideal para industria, comercio y residencias',
    
    // Blog Page
    'blog.title': 'Blog y Artículos',
    'blog.subtitle': 'Conocimiento técnico y tendencias en pavimentos Epoxi',
    'blog.readMore': 'Leer más',
    'blog.backHome': 'Volver al Inicio',
    'blog.backToBlog': 'Volver al blog',
    'blog.publishedOn': 'Publicado el',
    'blog.readTime': 'min de lectura',

    // Blog Article 2: Suelo de resina epoxi completo
    'blog.article2.title': 'Suelos de Resina Epoxi: Guía Completa 2024',
    'blog.article2.excerpt': 'Todo lo que necesitas saber sobre suelos de resina epoxi: composición, tipos, aplicaciones, ventajas, inconvenientes y precios. Guía informativa completa.',
    
    'blog.article2.intro.p1': 'El suelo de resina epoxi es un pavimento continuo que revolucionó la industria de recubrimientos gracias a sus prestaciones excepcionales. Se trata de un revestimiento sin juntas de dilatación que puede aplicarse directamente sobre pavimentos existentes, evitando obras y escombros. Su uso se extiende desde grandes naves industriales y parkings hasta viviendas particulares y oficinas modernas.',
    'blog.article2.intro.p2': 'La versatilidad de este material permite renovar espacios de cualquier tamaño con tiempos de ejecución muy reducidos. Las superficies así revestidas garantizan durabilidad superior, resistencias mecánicas excepcionales y un mantenimiento mínimo. Aunque originalmente fue concebido para entornos industriales, su evolución técnica y estética ha expandido su uso a prácticamente cualquier tipo de edificación.',
    'blog.article2.intro.p3': 'En esta guía exploraremos en profundidad qué es exactamente la resina epoxi, cómo funciona, qué tipos existen en el mercado, dónde se utiliza habitualmente, cuáles son sus ventajas reales y también sus limitaciones. Entenderás por qué este material ha ganado tanta popularidad en sectores tan diversos como la alimentación, la automoción, el comercio y el residencial.',
    
    'blog.article2.what.title': '¿Qué es Exactamente un Suelo de Resina Epoxi?',
    'blog.article2.what.p1': 'La resina epoxi es un material revolucionario que permite crear pavimentos continuos con acabados variados. Se trata de revestimientos continuos poliméricos cuyo denominador común es una durabilidad excepcional, brillo superior y resistencias químicas que superan ampliamente otros recubrimientos del mercado.',
    'blog.article2.what.p2': 'La magia de la resina epoxi reside en su composición: un polímero termoestable que al mezclarse con un agente catalizador (endurecedor) reacciona químicamente y se endurece. Esta reacción exotérmica transforma dos líquidos en un sólido ultra-resistente. El resultado es un pavimento con durabilidad extrema, impermeabilidad total y resistencia a la abrasión que multiplica por 10 la del hormigón convencional.',
    'blog.article2.what.p3': 'Las propiedades técnicas son impresionantes: no se deforma con el calor (estable entre -30°C y +80°C), ofrece acabados desde completamente lisos hasta antideslizantes según necesidades, y su resistencia al impacto permite soportar maquinaria pesada sin deteriorarse. Además, al ser un revestimiento continuo sin juntas, elimina espacios donde puedan acumularse bacterias o suciedad.',
    
    'blog.article2.characteristics.title': 'Características del Suelo de Resina Epoxi: Ventajas e Inconvenientes',
    'blog.article2.char.resistance.title': 'Resistencia Superior a Otros Pavimentos',
    'blog.article2.char.resistance.text': 'Los suelos de resina epoxi destacan por su elevada resistencia a la corrosión, al desgaste por abrasión y al tránsito intenso. Esta capacidad les hace ideales para estacionamientos con maquinaria pesada, laboratorios con productos químicos, almacenes logísticos y fábricas. Pueden estar expuestos durante tiempo prolongado a agentes químicos agresivos sin que sus prestaciones se vean perjudicadas significativamente.',
    'blog.article2.char.application.title': 'Aplicación Directa Sobre Pavimento Existente',
    'blog.article2.char.application.text': 'Una ventaja fundamental del suelo epoxi es que permite revitalizar espacios sin retirar el pavimento actual. Al evitarse obras de demolición, no se generan escombros y la reforma se ejecuta en menos tiempo. Puede instalarse sobre cerámica, hormigón, terrazo y otros materiales. Aunque la aplicación parece sencilla, requiere profesionales experimentados para garantizar adhesión correcta y durabilidad.',
    'blog.article2.char.finish.title': 'Acabado Continuo y Liso Sin Juntas',
    'blog.article2.char.finish.text': 'El suelo epoxi crea acabados continuos muy lisos gracias a espesores que varían entre 1mm y 9mm según el sistema elegido. Esta característica maximiza visualmente los espacios y añade grosor mínimo, sin afectar la carga estructural del edificio. Los sistemas autonivelantes fluyen creando superficies perfectamente planas, mientras que los multicapa incorporan áridos para texturas antideslizantes.',
    'blog.article2.char.drying.title': 'Tiempo de Secado Corto Comparado con Otras Opciones',
    'blog.article2.char.drying.text': 'Los pavimentos epoxi destacan por tiempos de curado relativamente cortos. Generalmente, el secado superficial ocurre en aproximadamente 8 horas y puede transitarse peatonalmente a las 24 horas. El curado completo para tráfico vehicular pesado requiere entre 5 y 7 días. Esta rapidez resulta ventajosa cuando se necesita reabrir instalaciones rápidamente, aunque los tiempos exactos dependen de temperatura ambiente y humedad.',
    'blog.article2.char.solvent.title': 'Formulaciones Sin Disolventes Disponibles',
    'blog.article2.char.solvent.text': 'Muchos sistemas epoxi modernos no contienen disolventes, eliminando olores fuertes durante la instalación. Esta característica facilita trabajos en espacios habitados o con poca ventilación. Sin embargo, algunos sistemas especiales aún utilizan componentes con olor, por lo que conviene verificar la ficha técnica según el entorno de aplicación.',
    'blog.article2.char.specialized.title': 'Requiere Mano de Obra Especializada',
    'blog.article2.char.specialized.text': 'Aunque parezca simple, la aplicación correcta de resina epoxi exige conocimientos técnicos específicos. Factores como temperatura, humedad del sustrato, punto de rocío y preparación superficial afectan críticamente el resultado final. Problemas comunes incluyen mala adherencia por humedad excesiva o imprimación incorrecta. Contratar aplicadores con experiencia demostrable es fundamental para evitar fallos costosos.',
    
    'blog.article2.types.title': 'Tipos de Suelos de Resina Epoxi Disponibles en el Mercado',
    'blog.article2.types.autonivelante.title': '1. Suelos Autonivelantes - Los Más Populares',
    'blog.article2.types.autonivelante.text': 'Los suelos autonivelantes son los más conocidos dentro de la familia epoxi. Se utilizan principalmente como pavimentos de áreas industriales por sus elevadas prestaciones mecánicas y químicas. Su grosor varía entre 1mm y 4mm, fluyendo por gravedad para crear superficies perfectamente lisas. Los acabados suelen ser brillantes y lisos. Ideales para almacenes, oficinas, laboratorios y espacios donde se requiere máxima planitud.',
    'blog.article2.types.multicapa.title': '2. Sistemas Multicapa - Máxima Resistencia',
    'blog.article2.types.multicapa.text': 'Los sistemas multicapa son suelos epoxi con acabados antideslizantes y grosor medio de 2-9mm por capa de saturado. Se aplican en capas alternas de imprimación y resina epoxi, con espolvoreado de áridos para obtener superficies rugosas. Para acabados decorativos se utilizan cuarzos coloreados. Perfectos para zonas de mucho tránsito, rampas, muelles de carga y áreas donde la seguridad antideslizante es prioritaria.',
    'blog.article2.types.3d.title': '3. Suelos 3D o Artísticos - Efecto Visual Espectacular',
    'blog.article2.types.3d.text': 'Este tipo de suelo se logra vertiendo resina epoxi transparente sobre un vinilo impreso, creando un efecto cristal tridimensional. La imagen queda totalmente protegida bajo una capa de "cristal" epoxi de varios milímetros. Muy utilizados en espacios comerciales, hoteles y viviendas de diseño donde se busca un impacto visual único. Permite personalización total con cualquier imagen o diseño.',
    'blog.article2.types.microcemento.title': '4. Sistemas Higiénicos Antibacterianos - Para Industria Alimentaria',
    'blog.article2.types.microcemento.text': 'Desarrollados específicamente para industria alimentaria, estos sistemas incorporan aditivos antibacterianos que inhiben el crecimiento bacteriano. Cumplen normativas HACCP y FDA. Aplicados en mataderos, lecherías, panaderías, cocinas industriales y hospitales. Resisten limpieza agresiva con productos químicos y altas temperaturas. La inversión adicional se compensa evitando problemas sanitarios.',
    'blog.article2.types.pintura.title': '5. Pinturas Epoxi - La Opción Más Económica',
    'blog.article2.types.pintura.text': 'Las pinturas epoxi son el sistema más económico y básico. Con espesor de solo 0.2-0.4mm, se aplican con rodillo o brocha sobre superficies preparadas. Muy habituales en parkings, naves industriales y garajes domésticos. Aunque menos duraderas que sistemas de mayor grosor, ofrecen excelente relación calidad-precio para aplicaciones de tráfico ligero a medio. Disponibles en amplia gama de colores.',
    
    'blog.article2.uses.title': '¿Dónde se Instala un Suelo de Resina Epoxi? Usos Más Comunes',
    'blog.article2.uses.sanitary': 'POR EXIGENCIA SANITARIA: Empresas de alimentación, cocinas industriales, laboratorios farmacéuticos y hospitales. El suelo epoxi cumple normativas HACCP gracias a su superficie no porosa y fácil desinfección. La ausencia de juntas evita acumulación de bacterias.',
    'blog.article2.uses.chemical': 'POR PROTECCIÓN QUÍMICA: Empresas expuestas a vertidos de líquidos agresivos como jugos de fruta, ácido láctico, sangre en mataderos, disolventes en laboratorios. La resina epoxi resiste productos químicos donde el hormigón se deterioraría rápidamente.',
    'blog.article2.uses.aesthetic': 'POR ESTÉTICA LIMPIA: Talleres automotrices, estacionamientos, garajes, fábricas y almacenes. El acabado liso y brillante proporciona aspecto profesional. Además, al no generar polvo como el hormigón desnudo, mantiene espacios más limpios.',
    'blog.article2.uses.decorative': 'POR DECORACIÓN: Oficinas modernas, locales comerciales, showrooms y viviendas. Las posibilidades decorativas han evolucionado enormemente, permitiendo imitaciones de mármol, diseños personalizados y efectos metalizados que rivalizan estéticamente con cualquier pavimento premium.',
    
    'blog.article2.price.title': 'Precio del Suelo de Resina Epoxi: ¿Cuánto Cuesta el Metro Cuadrado?',
    'blog.article2.price.intro': 'El precio varía significativamente según el sistema elegido. Las pinturas epoxi básicas pueden costar 8-15€/m², los sistemas autonivelantes rondan 20-40€/m², mientras que suelos decorativos especiales o 3D pueden alcanzar 80-120€/m². Para proyectos industriales con certificaciones específicas, los precios oscilan entre 30-60€/m². Superficies superiores a 1000m² suelen obtener descuentos considerables.',
    'blog.article2.price.factors.title': 'Factores que Determinan el Precio Final del Suelo Epoxi:',
    'blog.article2.price.factor1': 'CALIDAD Y SISTEMA: Las pinturas básicas son más económicas que sistemas multicapa gruesos. Sistemas con aditivos especiales (antibacterianos, antiestáticos) incrementan el coste proporcionalmente.',
    'blog.article2.price.factor2': 'ESTADO DEL SOPORTE: Superficies deterioradas requieren reparaciones previas. Grietas profundas, desniveles importantes o humedades capilares elevan significativamente el presupuesto al necesitar trabajos preparatorios extensos.',
    'blog.article2.price.factor3': 'TAMAÑO DEL PROYECTO: Espacios pequeños (menos de 50m²) tienen coste/m² más alto debido a desplazamientos y preparación. Grandes superficies permiten economías de escala, reduciendo el precio unitario considerablemente.',
    'blog.article2.price.factor4': 'COMPLEJIDAD TÉCNICA: Proyectos simples (garajes planos) son más económicos que instalaciones complejas con pendientes integradas, juntas especiales, múltiples colores o diseños personalizados que requieren más mano de obra.',
    'blog.article2.price.factor5': 'UBICACIÓN Y ACCESO: Trabajos en plantas altas sin ascensor, accesos difíciles o zonas rurales alejadas incrementan costes logísticos. Horarios nocturnos o restricciones especiales también afectan el precio final.',
    
    'blog.article2.wood.title': 'Resina Epoxi en Suelos de Madera: Protección y Estética',
    'blog.article2.wood.benefits.title': 'Ventajas de Aplicar Resina Epoxi sobre Madera:',
    'blog.article2.wood.benefit1': 'PROTECCIÓN E IMPERMEABILIZACIÓN: La resina crea una barrera impermeable que protege la madera de humedad, evitando carcoma y pudrición. Ideal para suelos de madera en zonas húmedas o exteriores.',
    'blog.article2.wood.benefit2': 'EFECTO CRISTAL BRILLANTE: La resina transparente magnifica las vetas naturales de la madera, dándole aspecto vítreo espectacular. El brillo profundo realza la belleza natural del material.',
    'blog.article2.wood.benefit3': 'VERSATILIDAD CREATIVA: Permite laminar, barnizar y encapsular. Se pueden crear desde simples barnizados protectores hasta elaboradas mesas "river" combinando madera y resina coloreada.',
    'blog.article2.wood.benefit4': 'DURABILIDAD MULTIPLICADA: Muebles y suelos de madera tratados con epoxi duran décadas sin mantenimiento especial. La capa de resina resiste arañazos, manchas y desgaste diario.',
    
    'blog.article2.home.title': 'Cinco Motivos para Apostar por Suelo Epoxi en la Vivienda',
    'blog.article2.home.aesthetic': 'ESTÉTICA NOVEDOSA Y PERSONALIZABLE: La versatilidad del epoxi permite infinitos diseños sobre el pavimento, con gran variedad de colores y texturas. Desde imitaciones de mármol hasta efectos metalizados. Diseño completamente adaptable que permite personalizar ambientes de manera rápida y con resultados espectaculares.',
    'blog.article2.home.compatibility': 'GRAN COMPATIBILIDAD SIN OBRAS: Se aplica directamente sobre baldosas, hormigón y terrazo sin necesidad de picar. No requiere maquinaria pesada para retirar el pavimento existente. Menos trabajo, menos coste, menos tiempo. Incluso escaleras pueden revestirse creando continuidad visual con el suelo.',
    'blog.article2.home.waterproof': 'IMPERMEABILIDAD 100% GARANTIZADA: Ideal para baños y cocinas. La capa de resina epoxi es completamente impermeable al agua, resistiendo ambientes húmedos sin deterioro. Muchos pavimentos requieren selladores adicionales, pero el epoxi es impermeable por naturaleza.',
    'blog.article2.home.antislip': 'ANTIDESLIZANTE PARA SEGURIDAD: Especialmente importante en baños y cocinas donde resbalones son comunes. Acabados antideslizantes evitan caídas manteniendo estética limpia. Seguridad sin comprometer el diseño.',
    'blog.article2.home.maintenance': 'LIMPIEZA Y MANTENIMIENTO MÍNIMOS: Paño húmedo, agua y detergente suave es todo lo necesario. Sin juntas donde acumulen bacterias, hongos o moho. Máxima higiene con esfuerzo mínimo. Perfecto para familias ocupadas o personas con alergias.',
    
    'blog.article2.exterior.title': '¿Suelo de Resina Epoxi en el Exterior? Sí, Pero con Matices',
    'blog.article2.exterior.text': 'El principal inconveniente del epoxi en exteriores es el amarilleamiento por rayos UV. La resina epoxi estándar es sensible a la radiación solar y se decolora con el tiempo. Sin embargo, con tratamiento adecuado es perfectamente viable. Se requiere sellado con mínimo una capa de poliuretano alifático (muchos profesionales recomiendan dos capas). El poliuretano debe ser específicamente alifático, ya que los aromáticos no previenen el amarilleamiento. Con protección correcta, los suelos epoxi funcionan perfectamente en terrazas y parkings exteriores.',
    
    'blog.article2.cta': 'Solicitar información y presupuesto',
    
    // Cookie Consent
    'cookies.title': '🍪 Cookies y Privacidad',
    'cookies.message': 'Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes aceptar o rechazar las cookies no esenciales.',
    'cookies.accept': 'Aceptar todas',
    'cookies.reject': 'Solo esenciales',
    'cookies.learnMore': 'Más información',
    'cookies.gdprCompliant': 'Compatible con GDPR',
    'cookies.consentMode': 'Google Consent Mode v2',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.about': 'About Us',
    'nav.quote': 'Request Quote',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.legal': 'Legal Notice',
    'nav.privacy': 'Privacy Policy',
    'nav.cookies': 'Cookie Policy',
    'nav.faq': 'FAQ',
    
    'hero.title': 'Professional Epoxi Flooring in Valencia',
    'hero.subtitle': 'Over 5 years of experience. 30 projects delivered in Spain and Europe.',
    'hero.cta.primary': 'Request quote',
    'hero.cta.secondary': 'View projects',
    'hero.cta.ai': 'Visualize with AI',
    
    'services.title': 'Our Services',
    'services.subtitle': 'Certified Epoxi M² systems for food industry, logistics, parking and specialized applications throughout Europe',
    'services.food.title': 'Food Industry',
    'services.food.desc': 'EpoxiLimpio M² systems with EscudoBio™ for maximum hygiene and food safety',
    'services.industrial.title': 'Industrial Flooring',
    'services.industrial.desc': 'High-performance EpoxiRápido M² systems for warehouses, storage and logistics areas',
    'services.parking.title': 'Parking & Decks',
    'services.parking.desc': 'EpoxiCubierta M² systems for parking, walkable decks and waterproofing',
    'services.decorative.title': 'Decorative Flooring',
    'services.decorative.desc': 'Exclusive finishes with metallic effects, 3D and custom designs',
    'services.esd.title': 'Specialized Systems',
    'services.esd.desc': 'ESD, conductive and chemical-resistant flooring for demanding industries',
    'services.repair.title': 'Repairs & Maintenance',
    'services.repair.desc': 'Restoration, self-leveling and waterproofing solutions',
    
    'projects.title': 'Our Projects',
    'projects.filter.all': 'All',
    'projects.filter.industrial': 'Industrial',
    'projects.filter.food': 'Food',
    'projects.filter.decorative': 'Decorative',
    'projects.filter.parking': 'Parking',
    
    'contact.title': 'Contact',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.coverage': 'Travel throughout Europe',
    
    'footer.company': 'JefeEpoxi - Professional Epoxi flooring',
    'footer.location': 'Valencia, Spain',

    // Vlog Section
    'vlog.title': 'Why Epoxi Resin Outperforms Other Floorings',
    'vlog.subtitle': 'Discover the technical and aesthetic advantages that make Epoxi the best choice',
    'vlog.cta': 'Request Quote',
    'vlog.content.intro': 'In the world of industrial and decorative flooring, Epoxi resin has positioned itself as the most advanced and versatile solution on the market. Its unique combination of technical and aesthetic properties makes it the preferred choice for professionals and owners seeking durability, functionality, and beauty.',
    'vlog.content.durability.title': 'Exceptional Durability',
    'vlog.content.durability.text': 'Epoxi floors offer superior resistance to wear, impact, and heavy loads. While ceramic can crack and vinyl deforms, Epoxi maintains its structural integrity for decades.',
    'vlog.content.chemical.title': 'Unmatched Chemical Resistance',
    'vlog.content.chemical.text': 'Unlike traditional concrete that absorbs liquids and stains, Epoxi resin creates an impermeable barrier that resists acids, bases, oils, and industrial chemicals.',
    'vlog.content.maintenance.title': 'Minimal Maintenance',
    'vlog.content.maintenance.text': 'Its non-porous surface facilitates cleaning and disinfection, making it ideal for food and pharmaceutical industries where hygiene is crucial.',
    'vlog.content.design.title': 'Design Versatility',
    'vlog.content.design.text': 'From industrial finishes to decorative metallic effects, Epoxi offers infinite customization possibilities that other floors cannot match.',
    'vlog.advantages.title': 'Key Advantages of Epoxi Flooring',
    'vlog.advantages.chemical': 'High chemical and mechanical resistance',
    'vlog.advantages.waterproof': 'Complete waterproofing and easy cleaning',
    'vlog.advantages.design': 'Flexibility in custom designs and colors',
    'vlog.advantages.durability': 'Superior long-term durability',
    'vlog.advantages.decorative': 'Decorative solutions and unique effects',
    'vlog.advantages.versatile': 'Ideal for industry, commerce, and residences',
    
    // Blog Page
    'blog.title': 'Blog & Articles',
    'blog.subtitle': 'Technical knowledge and trends in Epoxi flooring',
    'blog.readMore': 'Read more',
    'blog.backHome': 'Back to Home',
    'blog.backToBlog': 'Back to blog',
    'blog.publishedOn': 'Published on',
    'blog.readTime': 'min read',

    // Blog Article 2: Complete epoxy resin floor
    'blog.article2.title': 'Epoxy Resin Flooring: Complete 2024 Guide',
    'blog.article2.excerpt': 'Everything you need to know about epoxy resin floors: composition, types, applications, advantages, disadvantages and prices. Complete informative guide.',
    'blog.article2.intro.p1': 'Epoxy resin flooring is a continuous floor that revolutionized the coatings industry thanks to its exceptional performance. It\'s a seamless coating that can be applied directly over existing floors, avoiding construction work and debris. Its use extends from large industrial warehouses and parking lots to private homes and modern offices.',
    'blog.article2.intro.p2': 'The versatility of this material allows renovating spaces of any size with very reduced execution times. Surfaces thus coated guarantee superior durability, exceptional mechanical resistances and minimal maintenance. Although originally conceived for industrial environments, its technical and aesthetic evolution has expanded its use to practically any type of building.',
    'blog.article2.intro.p3': 'In this guide we\'ll explore in depth what exactly epoxy resin is, how it works, what types exist in the market, where it\'s commonly used, what its real advantages are and also its limitations. You\'ll understand why this material has gained so much popularity in sectors as diverse as food, automotive, commerce and residential.',
    'blog.article2.what.title': 'What Exactly is an Epoxy Resin Floor?',
    'blog.article2.what.p1': 'Epoxy resin is a revolutionary material that allows creating continuous floors with varied finishes. These are polymeric continuous coatings whose common denominator is exceptional durability, superior gloss and chemical resistances that far surpass other market coatings.',
    'blog.article2.what.p2': 'The magic of epoxy resin lies in its composition: a thermosetting polymer that when mixed with a catalyst agent (hardener) chemically reacts and hardens. This exothermic reaction transforms two liquids into an ultra-resistant solid. The result is flooring with extreme durability, total impermeability and abrasion resistance that multiplies conventional concrete by 10 times.',
    'blog.article2.what.p3': 'The technical properties are impressive: it doesn\'t deform with heat (stable between -30°C and +80°C), offers finishes from completely smooth to anti-slip according to needs, and its impact resistance allows supporting heavy machinery without deteriorating. Additionally, being a seamless continuous coating, it eliminates spaces where bacteria or dirt can accumulate.',
    'blog.article2.characteristics.title': 'Real Advantages of Epoxy Flooring: 70+ Projects Experience',
    'blog.article2.char.resistance.title': 'Extreme Resistance: From Industrial Warehouses to Parkings',
    'blog.article2.char.resistance.text': 'In our 15,000m² logistics project, 40-ton tractors circulate daily over EpoxiRápido M² without leaving a trace. Supports forklifts, heavy machinery and even falling metal tools. For extreme loading zones, our 6mm EpoxiForte M² Industrial system resists class IR4 impacts.',
    'blog.article2.char.application.title': 'No Construction: Renovation Over Existing Flooring',
    'blog.article2.char.application.text': 'The great advantage: we apply directly over concrete, ceramic or existing terrazzo. In a Valencia warehouse we renovated 2,500m² without generating a single debris container. Business continued operating by zones while we worked. Professional preparation + Epoxi M² systems = zero demolitions.',
    'blog.article2.char.finish.title': 'Seamless Finishes: From 1mm to 9mm According to Need',
    'blog.article2.char.finish.text': 'Our EpoxiLiso M² Self-leveling system (1-4mm) creates perfectly flat surfaces ideal for AGV robots in automated warehouses. For intensive industrial use, EpoxiRápido M² (3-6mm) offers the perfect balance between resistance and installation speed.',
    'blog.article2.char.drying.title': 'Certified Speed: Operational in 12-24 Hours',
    'blog.article2.char.drying.text': 'EpoxiRápido M² hardens in 8-12 hours at 20°C - verified in our projects. A 25m² garage becomes walkable the next day. For urgent projects where every hour counts, this speed proves decisive against other systems requiring days of waiting.',
    'blog.article2.char.solvent.title': 'No Toxic Odors: Solvent-Free Formula',
    'blog.article2.char.solvent.text': 'Our EpoxiBase M² Universal contains no solvents or nonylphenol. We install in restaurants open to the public without customers perceiving annoying odors. Essential for projects where activity cannot stop or in closed spaces without powerful ventilation.',
    'blog.article2.char.specialized.title': 'Technical Application: Why You Need Certified Professionals',
    'blog.article2.char.specialized.text': 'Temperature, relative humidity and dew point critically affect curing. In a project we failed initially by not controlling capillary moisture - now we use EpoxiSeal M² Anti-humidity on all doubtful substrates. 5 years of experience taught us every m² matters.',
    'blog.article2.types.title': 'Epoxi M² Systems: From Residential Garages to Pharmaceutical Labs',
    'blog.article2.types.autonivelante.title': '1. EpoxiLiso M² Self-leveling - Mathematical Perfection',
    'blog.article2.types.autonivelante.text': 'Used in automated warehouses where AGV robots require millimetric precision. With 1-4mm thickness, it self-installs creating surfaces of ±2mm tolerance over 100m linear. Ideal for modern offices, art galleries and VIP zones. In a Barcelona BMW showroom, the result was so perfect visitors photograph the floor.',
    'blog.article2.types.multicapa.title': '2. EpoxiForte M² Industrial - When Resistance is Critical',
    'blog.article2.types.multicapa.text': 'Multilayer system 4-9mm with calibrated quartz aggregates. In loading zones of a slaughterhouse, it supports impacts of hanging carcasses falling from 2 meters without cracks. Non-slip finish R11-R13 through aggregate broadcasting. The chosen system for parking ramps and loading docks where safety is non-negotiable.',
    'blog.article2.types.3d.title': '3. EpoxiArte M² Classic - Decorative With Industrial Soul',
    'blog.article2.types.3d.text': 'Our star system for retail and hospitality. In a Valencia boutique hotel, we combined multicolor quartz with transparent EpoxiCristal M² resin creating Venetian terrazzo effect. Each project is unique - impossible to repeat the pattern. From €350 in a collector\'s garage to large commercial lobbies.',
    'blog.article2.types.microcemento.title': '4. EpoxiLimpio M² Antibacterial - Polygiene® Technology',
    'blog.article2.types.microcemento.text': 'HACCP certification for food industry. Integrates Polygiene® technology inhibiting 99.9% of bacteria. Applied in slaughterhouses, dairies, bakeries and professional kitchens. Investment recovers avoiding sanitary fines - a client passed HACCP inspection first time after years of problems with ceramic.',
    'blog.article2.types.pintura.title': '5. EpoxiGarage M² Residential - Effective Economic Solution',
    'blog.article2.types.pintura.text': 'The entry system: 0.3-0.5mm applied with roller. From €13/m² transforms domestic garages eliminating concrete dust. In 48 hours the vehicle can enter. Perfect for tight budgets where complete renovation is not viable but immediate and lasting improvement is sought.',
    'blog.article2.uses.title': 'Where is an epoxy resin floor installed?',
    'blog.article2.uses.sanitary': 'Sanitary requirements: food companies, kitchens, pharmaceutical laboratories and hospitals.',
    'blog.article2.uses.chemical': 'Chemical protection: companies exposed to aggressive liquid spills.',
    'blog.article2.uses.aesthetic': 'Aesthetics: automotive workshops, parking lots, garages, factories and warehouses.',
    'blog.article2.uses.decorative': 'Decoration: offices, commercial premises and homes.',
    'blog.article2.price.title': 'Epoxy resin floor price: cost per square meter',
    'blog.article2.price.intro': 'The price of an epoxy resin floor varies depending on the chosen system. While epoxy paint can be around 8-10 euros per square meter, a 3D floor can reach 100 euros.',
    'blog.article2.price.factors.title': 'Factors affecting the price:',
    'blog.article2.price.factor1': 'Material quality and chosen system',
    'blog.article2.price.factor2': 'Support condition and necessary repairs',
    'blog.article2.price.factor3': 'Space size to cover',
    'blog.article2.price.factor4': 'Tools used',
    'blog.article2.price.factor5': 'Professional consultation and rate',
    'blog.article2.wood.title': 'Epoxy resin on wooden floors',
    'blog.article2.wood.benefits.title': 'Advantages of using epoxy resin on wood:',
    'blog.article2.wood.benefit1': 'Protects and waterproofs wooden floors',
    'blog.article2.wood.benefit2': 'Polishes wood, giving it a crystal appearance',
    'blog.article2.wood.benefit3': 'Allows laminating, varnishing and encapsulating',
    'blog.article2.wood.benefit4': 'Prevents woodworm and humidity',
    'blog.article2.home.title': 'Five reasons for epoxy resin flooring in homes',
    'blog.article2.home.aesthetic': 'Novel aesthetics: custom designs, variety of colors and textures',
    'blog.article2.home.compatibility': 'Great compatibility: applied over tiles, concrete and terrazzo without construction',
    'blog.article2.home.waterproof': '100% waterproofing: ideal for bathrooms and kitchens',
    'blog.article2.home.antislip': 'Non-slip: safety in wet spaces',
    'blog.article2.home.maintenance': 'Minimal cleaning: just damp cloth, water and mild detergent',
    'blog.article2.exterior.title': 'Epoxy resin floor outdoors',
    'blog.article2.exterior.text': 'To apply epoxy resin floor outdoors, it must be sealed with one or two coats of aliphatic polyurethane.',
    'blog.article2.cta': 'Request a quote for your project',
    
    // Cookie Consent
    'cookies.title': '🍪 Cookies & Privacy',
    'cookies.message': 'We use cookies to improve your experience and analyze traffic. You can accept or reject non-essential cookies.',
    'cookies.accept': 'Accept all',
    'cookies.reject': 'Essential only',
    'cookies.learnMore': 'Learn more',
    'cookies.gdprCompliant': 'GDPR Compatible',
    'cookies.consentMode': 'Google Consent Mode v2',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
