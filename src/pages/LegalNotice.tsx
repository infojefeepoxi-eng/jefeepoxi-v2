import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale, Building2, FileText, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegalNoticeContent = () => {
  const { t, language } = useLanguage();

  const legalContent = {
    es: {
      title: 'Aviso Legal',
      lastUpdated: 'Última actualización: Octubre 2024',
      sections: [
        {
          title: 'Identificación del Titular',
          icon: Building2,
          content: [
            'Denominación social: JefeEpoxi',
            'Domicilio social: Valencia, España',
            'CIF: B12345678',
            'Correo electrónico: infojefeEpoxi@gmail.com',
            'Teléfono: +34 622 313 855'
          ]
        },
        {
          title: 'Objeto',
          icon: FileText,
          content: [
            'El presente aviso legal regula el uso y utilización del sitio web www.jefeepoxi.es, del que es titular JefeEpoxi.',
            'La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.',
            'El titular se reserva el derecho a modificar cualquier tipo de información que pudiera aparecer en el sitio web, sin que exista obligación de preavisar o poner en conocimiento de los usuarios dichas obligaciones.'
          ]
        },
        {
          title: 'Condiciones de Acceso y Uso',
          icon: Scale,
          content: [
            'El acceso al sitio web es gratuito salvo en lo relativo al coste de la conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado por los usuarios.',
            'El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen a través del sitio web y a no emplearlos para:',
            '• Difundir contenidos delictivos, violentos, pornográficos, racistas, xenófobos, ofensivos, de apología del terrorismo o, en general, contrarios a la ley o al orden público.',
            '• Introducir en la red virus informáticos o realizar actuaciones susceptibles de alterar, estropear, interrumpir o generar errores o daños en los documentos electrónicos, datos o sistemas físicos y lógicos.',
            '• Intentar acceder a las cuentas de correo electrónico de otros usuarios o a áreas restringidas de los sistemas informáticos del titular o de terceros.',
            '• Vulnerar los derechos de propiedad intelectual o industrial, así como violar la confidencialidad de la información.'
          ]
        },
        {
          title: 'Propiedad Intelectual e Industrial',
          icon: FileText,
          content: [
            'Todos los contenidos del sitio web, salvo que se indique lo contrario, son titularidad exclusiva de JefeEpoxi y, en consecuencia, son obras protegidas por la normativa española e internacional de propiedad intelectual e industrial.',
            'Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de JefeEpoxi.',
            'El usuario se compromete a respetar los derechos de propiedad intelectual e industrial del titular. Podrá visualizar los elementos del portal e incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal.'
          ]
        },
        {
          title: 'Responsabilidad',
          icon: Scale,
          content: [
            'JefeEpoxi no se hace responsable de la información y contenidos almacenados en foros, redes sociales o cualesquiera otros medios que permitan a terceros publicar contenidos de forma independiente.',
            'El titular excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la mala utilización de los servicios de libre disposición y uso por parte de los usuarios.',
            'JefeEpoxi se exime de cualquier responsabilidad derivada de la información publicada en su sitio web siempre que esta información haya sido manipulada o introducida por un tercero ajeno al mismo.'
          ]
        },
        {
          title: 'Legislación Aplicable y Jurisdicción',
          icon: Scale,
          content: [
            'Las presentes condiciones se rigen por la legislación española.',
            'Para la resolución de cualquier controversia derivada de la interpretación o aplicación del presente aviso legal, las partes se someten expresamente a los juzgados y tribunales de Valencia, España.',
            'En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (RGPD), le informamos de que puede ejercer sus derechos en los términos especificados en nuestra Política de Privacidad.'
          ]
        }
      ],
      contact: {
        title: 'Contacto',
        content: 'Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros:'
      }
    },
    en: {
      title: 'Legal Notice',
      lastUpdated: 'Last updated: October 2024',
      sections: [
        {
          title: 'Owner Identification',
          icon: Building2,
          content: [
            'Company name: JefeEpoxi',
            'Registered office: Valencia, Spain',
            'Tax ID: B12345678',
            'Email: infojefeEpoxi@gmail.com',
            'Phone: +34 622 313 855'
          ]
        },
        {
          title: 'Purpose',
          icon: FileText,
          content: [
            'This legal notice regulates the use of the website www.jefeepoxi.es, owned by JefeEpoxi.',
            'Browsing this website grants the user status and implies full and unreserved acceptance of all provisions included in this Legal Notice.',
            'The owner reserves the right to modify any information that may appear on the website, without any obligation to notify users in advance.'
          ]
        },
        {
          title: 'Access and Use Conditions',
          icon: Scale,
          content: [
            'Access to the website is free except for the cost of connection through the telecommunications network provided by the access provider contracted by users.',
            'The user agrees to make appropriate use of the content and services offered through the website and not to use them for:',
            '• Disseminating criminal, violent, pornographic, racist, xenophobic, offensive, or terrorist content, or generally contrary to law or public order.',
            '• Introducing computer viruses or performing actions that may alter, damage, interrupt, or generate errors in electronic documents, data, or physical and logical systems.',
            '• Attempting to access other users\' email accounts or restricted areas of the owner\'s or third parties\' computer systems.',
            '• Violating intellectual or industrial property rights, as well as breaching information confidentiality.'
          ]
        },
        {
          title: 'Intellectual and Industrial Property',
          icon: FileText,
          content: [
            'All website content, unless otherwise indicated, is the exclusive property of JefeEpoxi and, consequently, is protected by Spanish and international intellectual and industrial property regulations.',
            'The reproduction, distribution, and public communication, including making available, of all or part of the contents of this website for commercial purposes, in any medium and by any technical means, is expressly prohibited without authorization from JefeEpoxi.',
            'The user agrees to respect the intellectual and industrial property rights of the owner. They may view the portal elements and even print, copy, and store them on their computer\'s hard drive or any other physical medium, provided it is solely for personal use.'
          ]
        },
        {
          title: 'Liability',
          icon: Scale,
          content: [
            'JefeEpoxi is not responsible for information and content stored in forums, social networks, or any other means that allow third parties to publish content independently.',
            'The owner excludes any liability for damages of any nature that may arise from the misuse of freely available services by users.',
            'JefeEpoxi disclaims any responsibility derived from information published on its website when such information has been manipulated or introduced by a third party.'
          ]
        },
        {
          title: 'Applicable Law and Jurisdiction',
          icon: Scale,
          content: [
            'These conditions are governed by Spanish law.',
            'For the resolution of any dispute arising from the interpretation or application of this legal notice, the parties expressly submit to the courts and tribunals of Valencia, Spain.',
            'In compliance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data (GDPR), we inform you that you may exercise your rights as specified in our Privacy Policy.'
          ]
        }
      ],
      contact: {
        title: 'Contact',
        content: 'For any inquiries related to this legal notice, you can contact us:'
      }
    },
    ua: {
      title: 'Юридична Інформація',
      lastUpdated: 'Останнє оновлення: Жовтень 2024',
      sections: [
        {
          title: 'Ідентифікація Власника',
          icon: Building2,
          content: [
            'Назва компанії: JefeEpoxi',
            'Юридична адреса: Валенсія, Іспанія',
            'Податковий номер: B12345678',
            'Електронна пошта: infojefeEpoxi@gmail.com',
            'Телефон: +34 622 313 855'
          ]
        },
        {
          title: 'Мета',
          icon: FileText,
          content: [
            'Ця юридична інформація регулює використання веб-сайту www.jefeepoxi.es, власником якого є JefeEpoxi.',
            'Використання цього веб-сайту надає статус користувача і означає повне та беззастережне прийняття всіх положень цієї Юридичної Інформації.',
            'Власник залишає за собою право змінювати будь-яку інформацію, яка може з\'являтися на веб-сайті, без будь-яких зобов\'язань попередньо повідомляти користувачів.'
          ]
        },
        {
          title: 'Умови Доступу та Використання',
          icon: Scale,
          content: [
            'Доступ до веб-сайту є безкоштовним, за винятком вартості підключення через телекомунікаційну мережу, надану провайдером доступу, з яким укладено договір користувачами.',
            'Користувач зобов\'язується належним чином використовувати вміст та послуги, які пропонуються через веб-сайт, і не використовувати їх для:',
            '• Поширення кримінального, насильницького, порнографічного, расистського, ксенофобського, образливого контенту або контенту, що пропагує тероризм, або загалом суперечить закону чи громадському порядку.',
            '• Впровадження комп\'ютерних вірусів або виконання дій, які можуть змінити, пошкодити, перервати або створити помилки в електронних документах, даних або фізичних і логічних системах.',
            '• Спроби отримати доступ до облікових записів електронної пошти інших користувачів або до обмежених областей комп\'ютерних систем власника або третіх осіб.',
            '• Порушення прав інтелектуальної або промислової власності, а також порушення конфіденційності інформації.'
          ]
        },
        {
          title: 'Інтелектуальна та Промислова Власність',
          icon: FileText,
          content: [
            'Весь вміст веб-сайту, якщо не зазначено інше, є виключною власністю JefeEpoxi і, отже, захищений іспанським та міжнародним законодавством про інтелектуальну та промислову власність.',
            'Відтворення, розповсюдження та публічна комунікація, включаючи надання доступу до всього або частини вмісту цього веб-сайту в комерційних цілях, на будь-якому носії та будь-якими технічними засобами, категорично заборонені без дозволу JefeEpoxi.',
            'Користувач зобов\'язується поважати права інтелектуальної та промислової власності власника. Вони можуть переглядати елементи порталу і навіть друкувати, копіювати та зберігати їх на жорсткому диску свого комп\'ютера або будь-якому іншому фізичному носії за умови, що це виключно для особистого використання.'
          ]
        },
        {
          title: 'Відповідальність',
          icon: Scale,
          content: [
            'JefeEpoxi не несе відповідальності за інформацію та вміст, збережений на форумах, в соціальних мережах або будь-яких інших засобах, які дозволяють третім сторонам публікувати вміст незалежно.',
            'Власник виключає будь-яку відповідальність за збитки будь-якого характеру, які можуть виникнути внаслідок неправильного використання вільно доступних послуг користувачами.',
            'JefeEpoxi відмовляється від будь-якої відповідальності за інформацію, опубліковану на своєму веб-сайті, якщо така інформація була змінена або введена третьою стороною.'
          ]
        },
        {
          title: 'Застосовне Законодавство та Юрисдикція',
          icon: Scale,
          content: [
            'Ці умови регулюються іспанським законодавством.',
            'Для вирішення будь-яких суперечок, що виникають з тлумачення або застосування цієї юридичної інформації, сторони прямо підкоряються судам та трибуналам Валенсії, Іспанія.',
            'Відповідно до Регламенту (ЄС) 2016/679 Європейського Парламенту та Ради від 27 квітня 2016 року про захист фізичних осіб щодо обробки персональних даних (GDPR), ми інформуємо вас, що ви можете здійснювати свої права, як зазначено в нашій Політиці Конфіденційності.'
          ]
        }
      ],
      contact: {
        title: 'Контакти',
        content: 'З будь-яких питань, пов\'язаних з цією юридичною інформацією, ви можете зв\'язатися з нами:'
      }
    }
  };

  const content = legalContent[language as keyof typeof legalContent] || legalContent.es;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Volver al inicio' : language === 'en' ? 'Back to home' : 'Повернутися на головну'}
              </Button>
            </Link>
            
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground">
                {content.lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Sections */}
              {content.sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div key={index} className="bg-card rounded-2xl p-8 border border-border/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                          {section.title}
                        </h2>
                        <div className="space-y-3">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-muted-foreground leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Contact Section */}
              <div className="bg-card rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {content.contact.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {content.contact.content}
                    </p>
                    <div className="space-y-3">
                      <a 
                        href="mailto:infojefeEpoxi@gmail.com"
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-3" />
                        infojefeEpoxi@gmail.com
                      </a>
                      <a 
                        href="tel:+34622313855"
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-3" />
                        +34 622 313 855
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const LegalNotice = () => {
  return <LegalNoticeContent />;
};

export default LegalNotice;

