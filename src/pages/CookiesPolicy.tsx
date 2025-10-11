import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cookie, Shield, Settings, BarChart, FileText, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiesPolicyContent = () => {
  const { t, language } = useLanguage();

  const cookiesContent = {
    es: {
      title: 'Política de Cookies',
      lastUpdated: 'Última actualización: Octubre 2024',
      intro: 'Esta Política de Cookies explica qué son las cookies, qué tipos de cookies utilizamos en nuestro sitio web y cómo puedes gestionar tus preferencias de cookies.',
      sections: [
        {
          title: '¿Qué son las Cookies?',
          icon: Cookie,
          content: [
            'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.',
            'Las cookies pueden ser "persistentes" o "de sesión": las cookies persistentes permanecen en tu dispositivo después de cerrar el navegador, mientras que las cookies de sesión se eliminan cuando cierras el navegador.'
          ]
        },
        {
          title: 'Cookies que Utilizamos',
          icon: FileText,
          subsections: [
            {
              subtitle: '1. Cookies Estrictamente Necesarias',
              items: [
                'Estas cookies son esenciales para que puedas navegar por el sitio web y utilizar sus funciones.',
                'Incluyen cookies de seguridad y accesibilidad.',
                'No podemos proporcionar nuestros servicios sin estas cookies.',
                'Ejemplo: cookies de sesión, cookies de seguridad'
              ]
            },
            {
              subtitle: '2. Cookies de Rendimiento y Análisis',
              items: [
                'Utilizamos Google Analytics para recopilar información sobre cómo los visitantes utilizan nuestro sitio web.',
                'Estas cookies nos ayudan a entender qué páginas son las más populares y a mejorar la experiencia del usuario.',
                'Toda la información es anónima y agregada.',
                'Cookies utilizadas: _ga, _gid, _gat (Google Analytics)'
              ]
            },
            {
              subtitle: '3. Cookies de Funcionalidad',
              items: [
                'Estas cookies permiten que el sitio web recuerde tus elecciones (como tu idioma preferido).',
                'Proporcionan funciones mejoradas y personalizadas.',
                'Ejemplo: preferencias de idioma, configuración de cookies'
              ]
            },
            {
              subtitle: '4. Cookies de Marketing y Publicidad',
              items: [
                'Actualmente no utilizamos cookies de marketing de terceros.',
                'Si decides contactarnos, podemos usar cookies para recordar tu consulta.',
                'EmailJS puede establecer cookies cuando envías un formulario de contacto.'
              ]
            }
          ]
        },
        {
          title: 'Cookies de Terceros',
          icon: Shield,
          content: [
            'Nuestro sitio web utiliza servicios de terceros que pueden establecer cookies:',
            '• Google Analytics: Para análisis y estadísticas del sitio web',
            '• EmailJS: Para el procesamiento de formularios de contacto',
            'Estos terceros tienen sus propias políticas de privacidad y cookies.'
          ]
        },
        {
          title: 'Detalles Técnicos de las Cookies',
          icon: Settings,
          table: {
            headers: ['Nombre', 'Proveedor', 'Propósito', 'Duración', 'Tipo'],
            rows: [
              ['_ga', 'Google Analytics', 'Distingue usuarios', '2 años', 'Análisis'],
              ['_gid', 'Google Analytics', 'Distingue usuarios', '24 horas', 'Análisis'],
              ['_gat', 'Google Analytics', 'Limita peticiones', '1 minuto', 'Análisis'],
              ['cookieConsent', 'JefeEpoxi', 'Almacena preferencias de cookies', '1 año', 'Necesaria'],
              ['language', 'JefeEpoxi', 'Idioma preferido', '1 año', 'Funcional']
            ]
          }
        },
        {
          title: 'Cómo Gestionar las Cookies',
          icon: Settings,
          content: [
            'Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se coloquen.',
            'Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.'
          ],
          browserSettings: {
            title: 'Configuración de cookies por navegador:',
            browsers: [
              { name: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
              { name: 'Mozilla Firefox', link: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
              { name: 'Safari', link: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
              { name: 'Microsoft Edge', link: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              { name: 'Opera', link: 'https://help.opera.com/en/latest/web-preferences/#cookies' }
            ]
          }
        },
        {
          title: 'Panel de Preferencias de Cookies',
          icon: Settings,
          content: [
            'En la primera visita a nuestro sitio web, aparecerá un banner de cookies donde puedes:',
            '• Aceptar todas las cookies',
            '• Rechazar cookies no esenciales',
            '• Personalizar tus preferencias',
            'Puedes cambiar tus preferencias en cualquier momento haciendo clic en el enlace "Configuración de Cookies" en el pie de página.'
          ]
        },
        {
          title: 'Consentimiento',
          icon: Shield,
          content: [
            'Al utilizar nuestro sitio web y aceptar las cookies, aceptas el uso de cookies de acuerdo con esta Política de Cookies.',
            'Si no aceptas el uso de estas cookies, debes deshabilitar las cookies siguiendo las instrucciones de tu navegador o dejar de usar nuestro sitio web.',
            'En cumplimiento del RGPD (Reglamento General de Protección de Datos) de la UE, obtenemos tu consentimiento antes de colocar cookies no esenciales en tu dispositivo.'
          ]
        },
        {
          title: 'Actualizaciones de esta Política',
          icon: FileText,
          content: [
            'Podemos actualizar esta Política de Cookies ocasionalmente. Te recomendamos revisar esta página periódicamente para estar informado sobre cómo utilizamos las cookies.',
            'La fecha de la última actualización se muestra en la parte superior de esta página.',
            'Los cambios significativos en esta política se comunicarán mediante un aviso destacado en nuestro sitio web.'
          ]
        }
      ],
      contact: {
        title: 'Contacto',
        content: 'Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos en:'
      }
    },
    en: {
      title: 'Cookies Policy',
      lastUpdated: 'Last updated: October 2024',
      intro: 'This Cookies Policy explains what cookies are, what types of cookies we use on our website, and how you can manage your cookie preferences.',
      sections: [
        {
          title: 'What are Cookies?',
          icon: Cookie,
          content: [
            'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to site owners.',
            'Cookies can be "persistent" or "session": persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.'
          ]
        },
        {
          title: 'Cookies We Use',
          icon: FileText,
          subsections: [
            {
              subtitle: '1. Strictly Necessary Cookies',
              items: [
                'These cookies are essential for you to browse the website and use its features.',
                'They include security and accessibility cookies.',
                'We cannot provide our services without these cookies.',
                'Example: session cookies, security cookies'
              ]
            },
            {
              subtitle: '2. Performance and Analytics Cookies',
              items: [
                'We use Google Analytics to collect information about how visitors use our website.',
                'These cookies help us understand which pages are most popular and improve the user experience.',
                'All information is anonymous and aggregated.',
                'Cookies used: _ga, _gid, _gat (Google Analytics)'
              ]
            },
            {
              subtitle: '3. Functionality Cookies',
              items: [
                'These cookies allow the website to remember your choices (such as your preferred language).',
                'They provide enhanced and personalized features.',
                'Example: language preferences, cookie settings'
              ]
            },
            {
              subtitle: '4. Marketing and Advertising Cookies',
              items: [
                'We currently do not use third-party marketing cookies.',
                'If you choose to contact us, we may use cookies to remember your inquiry.',
                'EmailJS may set cookies when you submit a contact form.'
              ]
            }
          ]
        },
        {
          title: 'Third-Party Cookies',
          icon: Shield,
          content: [
            'Our website uses third-party services that may set cookies:',
            '• Google Analytics: For website analysis and statistics',
            '• EmailJS: For contact form processing',
            'These third parties have their own privacy and cookie policies.'
          ]
        },
        {
          title: 'Technical Cookie Details',
          icon: Settings,
          table: {
            headers: ['Name', 'Provider', 'Purpose', 'Duration', 'Type'],
            rows: [
              ['_ga', 'Google Analytics', 'Distinguishes users', '2 years', 'Analytics'],
              ['_gid', 'Google Analytics', 'Distinguishes users', '24 hours', 'Analytics'],
              ['_gat', 'Google Analytics', 'Rate limiting', '1 minute', 'Analytics'],
              ['cookieConsent', 'JefeEpoxi', 'Stores cookie preferences', '1 year', 'Necessary'],
              ['language', 'JefeEpoxi', 'Preferred language', '1 year', 'Functional']
            ]
          }
        },
        {
          title: 'How to Manage Cookies',
          icon: Settings,
          content: [
            'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed.',
            'However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.'
          ],
          browserSettings: {
            title: 'Cookie settings by browser:',
            browsers: [
              { name: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
              { name: 'Mozilla Firefox', link: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
              { name: 'Safari', link: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
              { name: 'Microsoft Edge', link: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              { name: 'Opera', link: 'https://help.opera.com/en/latest/web-preferences/#cookies' }
            ]
          }
        },
        {
          title: 'Cookie Preferences Panel',
          icon: Settings,
          content: [
            'On your first visit to our website, a cookie banner will appear where you can:',
            '• Accept all cookies',
            '• Reject non-essential cookies',
            '• Customize your preferences',
            'You can change your preferences at any time by clicking the "Cookie Settings" link in the footer.'
          ]
        },
        {
          title: 'Consent',
          icon: Shield,
          content: [
            'By using our website and accepting cookies, you consent to the use of cookies in accordance with this Cookies Policy.',
            'If you do not accept the use of these cookies, you should disable cookies by following your browser\'s instructions or stop using our website.',
            'In compliance with the EU GDPR (General Data Protection Regulation), we obtain your consent before placing non-essential cookies on your device.'
          ]
        },
        {
          title: 'Updates to this Policy',
          icon: FileText,
          content: [
            'We may update this Cookies Policy occasionally. We recommend reviewing this page periodically to stay informed about how we use cookies.',
            'The date of the last update is shown at the top of this page.',
            'Significant changes to this policy will be communicated through a prominent notice on our website.'
          ]
        }
      ],
      contact: {
        title: 'Contact',
        content: 'If you have questions about our Cookies Policy, you can contact us at:'
      }
    },
    ua: {
      title: 'Політика Cookies',
      lastUpdated: 'Останнє оновлення: Жовтень 2024',
      intro: 'Ця Політика Cookies пояснює, що таке cookies, які типи cookies ми використовуємо на нашому веб-сайті та як ви можете керувати своїми налаштуваннями cookies.',
      sections: [
        {
          title: 'Що таке Cookies?',
          icon: Cookie,
          content: [
            'Cookies - це невеликі текстові файли, які зберігаються на вашому пристрої, коли ви відвідуєте веб-сайт. Вони широко використовуються для того, щоб веб-сайти працювали більш ефективно, а також для надання інформації власникам сайту.',
            'Cookies можуть бути "постійними" або "сеансовими": постійні cookies залишаються на вашому пристрої після закриття браузера, тоді як сеансові cookies видаляються при закритті браузера.'
          ]
        },
        {
          title: 'Cookies, які ми використовуємо',
          icon: FileText,
          subsections: [
            {
              subtitle: '1. Суворо Необхідні Cookies',
              items: [
                'Ці cookies є необхідними для того, щоб ви могли переглядати веб-сайт та використовувати його функції.',
                'Вони включають cookies безпеки та доступності.',
                'Ми не можемо надавати наші послуги без цих cookies.',
                'Приклад: сеансові cookies, cookies безпеки'
              ]
            },
            {
              subtitle: '2. Cookies Продуктивності та Аналітики',
              items: [
                'Ми використовуємо Google Analytics для збору інформації про те, як відвідувачі використовують наш веб-сайт.',
                'Ці cookies допомагають нам зрозуміти, які сторінки є найпопулярнішими, та покращити користувацький досвід.',
                'Вся інформація є анонімною та агрегованою.',
                'Використані cookies: _ga, _gid, _gat (Google Analytics)'
              ]
            },
            {
              subtitle: '3. Функціональні Cookies',
              items: [
                'Ці cookies дозволяють веб-сайту запам\'ятати ваш вибір (наприклад, вашу бажану мову).',
                'Вони надають розширені та персоналізовані функції.',
                'Приклад: налаштування мови, налаштування cookies'
              ]
            },
            {
              subtitle: '4. Маркетингові та Рекламні Cookies',
              items: [
                'Наразі ми не використовуємо маркетингові cookies третіх сторін.',
                'Якщо ви вирішите зв\'язатися з нами, ми можемо використовувати cookies для запам\'ятовування вашого запиту.',
                'EmailJS може встановлювати cookies при відправці контактної форми.'
              ]
            }
          ]
        },
        {
          title: 'Cookies Третіх Сторін',
          icon: Shield,
          content: [
            'Наш веб-сайт використовує послуги третіх сторін, які можуть встановлювати cookies:',
            '• Google Analytics: Для аналізу та статистики веб-сайту',
            '• EmailJS: Для обробки контактних форм',
            'Ці треті сторони мають власні політики конфіденційності та cookies.'
          ]
        },
        {
          title: 'Технічні Деталі Cookies',
          icon: Settings,
          table: {
            headers: ['Назва', 'Постачальник', 'Призначення', 'Тривалість', 'Тип'],
            rows: [
              ['_ga', 'Google Analytics', 'Розрізняє користувачів', '2 роки', 'Аналітика'],
              ['_gid', 'Google Analytics', 'Розрізняє користувачів', '24 години', 'Аналітика'],
              ['_gat', 'Google Analytics', 'Обмеження запитів', '1 хвилина', 'Аналітика'],
              ['cookieConsent', 'JefeEpoxi', 'Зберігає налаштування cookies', '1 рік', 'Необхідна'],
              ['language', 'JefeEpoxi', 'Бажана мова', '1 рік', 'Функціональна']
            ]
          }
        },
        {
          title: 'Як Керувати Cookies',
          icon: Settings,
          content: [
            'Ви можете контролювати та/або видаляти cookies на свій розсуд. Ви можете видалити всі cookies, які вже є на вашому пристрої, і ви можете налаштувати більшість браузерів, щоб запобігти їх розміщенню.',
            'Однак, якщо ви зробите це, вам може знадобитися вручну налаштовувати деякі параметри кожного разу, коли ви відвідуєте сайт, і деякі послуги та функції можуть не працювати.'
          ],
          browserSettings: {
            title: 'Налаштування cookies за браузерами:',
            browsers: [
              { name: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
              { name: 'Mozilla Firefox', link: 'https://support.mozilla.org/uk/kb/enhanced-tracking-protection-firefox-desktop' },
              { name: 'Safari', link: 'https://support.apple.com/uk-ua/guide/safari/sfri11471/mac' },
              { name: 'Microsoft Edge', link: 'https://support.microsoft.com/uk-ua/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              { name: 'Opera', link: 'https://help.opera.com/en/latest/web-preferences/#cookies' }
            ]
          }
        },
        {
          title: 'Панель Налаштувань Cookies',
          icon: Settings,
          content: [
            'При першому відвідуванні нашого веб-сайту з\'явиться банер cookies, де ви можете:',
            '• Прийняти всі cookies',
            '• Відхилити необов\'язкові cookies',
            '• Налаштувати свої вподобання',
            'Ви можете змінити свої налаштування в будь-який час, натиснувши на посилання "Налаштування Cookies" у нижньому колонтитулі.'
          ]
        },
        {
          title: 'Згода',
          icon: Shield,
          content: [
            'Використовуючи наш веб-сайт та приймаючи cookies, ви надаєте згоду на використання cookies відповідно до цієї Політики Cookies.',
            'Якщо ви не приймаєте використання цих cookies, ви повинні вимкнути cookies, дотримуючись інструкцій вашого браузера, або припинити використання нашого веб-сайту.',
            'Відповідно до GDPR ЄС (Загальний регламент про захист даних), ми отримуємо вашу згоду перед розміщенням необов\'язкових cookies на вашому пристрої.'
          ]
        },
        {
          title: 'Оновлення цієї Політики',
          icon: FileText,
          content: [
            'Ми можемо періодично оновлювати цю Політику Cookies. Ми рекомендуємо періодично переглядати цю сторінку, щоб бути в курсі того, як ми використовуємо cookies.',
            'Дата останнього оновлення показана у верхній частині цієї сторінки.',
            'Значні зміни в цій політиці будуть повідомлені через помітне повідомлення на нашому веб-сайті.'
          ]
        }
      ],
      contact: {
        title: 'Контакти',
        content: 'Якщо у вас є питання щодо нашої Політики Cookies, ви можете зв\'язатися з нами за адресою:'
      }
    }
  };

  const content = cookiesContent[language as keyof typeof cookiesContent] || cookiesContent.es;

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
              <div className="flex items-center justify-center mb-6">
                <Cookie className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground mb-4">
                {content.lastUpdated}
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {content.intro}
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
                        
                        {/* Regular content */}
                        {section.content && (
                          <div className="space-y-3 mb-6">
                            {section.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-muted-foreground leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Subsections */}
                        {section.subsections && (
                          <div className="space-y-6">
                            {section.subsections.map((subsection, sIndex) => (
                              <div key={sIndex} className="pl-4 border-l-2 border-primary/30">
                                <h3 className="text-lg font-semibold text-foreground mb-3">
                                  {subsection.subtitle}
                                </h3>
                                <ul className="space-y-2">
                                  {subsection.items.map((item, iIndex) => (
                                    <li key={iIndex} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-muted-foreground">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Table */}
                        {section.table && (
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b border-border">
                                  {section.table.headers.map((header, hIndex) => (
                                    <th key={hIndex} className="text-left py-3 px-4 font-semibold text-foreground">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.table.rows.map((row, rIndex) => (
                                  <tr key={rIndex} className="border-b border-border/50">
                                    {row.map((cell, cIndex) => (
                                      <td key={cIndex} className="py-3 px-4 text-muted-foreground">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Browser settings */}
                        {section.browserSettings && (
                          <div className="mt-6">
                            <p className="font-semibold text-foreground mb-3">
                              {section.browserSettings.title}
                            </p>
                            <ul className="space-y-2">
                              {section.browserSettings.browsers.map((browser, bIndex) => (
                                <li key={bIndex}>
                                  <a 
                                    href={browser.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    {browser.name} →
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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

const CookiesPolicy = () => {
  return <CookiesPolicyContent />;
};

export default CookiesPolicy;

