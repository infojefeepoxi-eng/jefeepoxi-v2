import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, Lock, UserCheck, Database, FileText, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyContent = () => {
  const { t, language } = useLanguage();

  const privacyContent = {
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Octubre 2024',
      intro: 'En JefeEpoxi, nos tomamos muy en serio la privacidad y la protección de tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información personal de acuerdo con el RGPD (Reglamento General de Protección de Datos) de la UE.',
      sections: [
        {
          title: 'Responsable del Tratamiento',
          icon: Shield,
          content: [
            'Identidad: JefeEpoxi',
            'Dirección: Valencia, España',
            'CIF: B12345678',
            'Correo electrónico: infojefeEpoxi@gmail.com',
            'Teléfono: +34 622 313 855',
            'Delegado de Protección de Datos: infojefeEpoxi@gmail.com'
          ]
        },
        {
          title: 'Principios de Protección de Datos',
          icon: FileText,
          content: [
            'Tus datos personales serán tratados de conformidad con los siguientes principios:',
            '• Licitud, lealtad y transparencia: Tratamos tus datos de forma legal y transparente.',
            '• Limitación de la finalidad: Recogemos datos para fines específicos y legítimos.',
            '• Minimización de datos: Solo recopilamos los datos necesarios.',
            '• Exactitud: Mantenemos los datos actualizados y precisos.',
            '• Limitación del plazo de conservación: Conservamos los datos solo el tiempo necesario.',
            '• Integridad y confidencialidad: Protegemos tus datos con medidas de seguridad adecuadas.',
            '• Responsabilidad proactiva: Cumplimos y demostramos el cumplimiento del RGPD.'
          ]
        },
        {
          title: 'Datos que Recopilamos',
          icon: Database,
          subsections: [
            {
              subtitle: '1. Datos de Identificación y Contacto',
              items: [
                'Nombre y apellidos',
                'Dirección de correo electrónico',
                'Número de teléfono',
                'Dirección postal (si es relevante para el servicio)'
              ]
            },
            {
              subtitle: '2. Datos de Navegación',
              items: [
                'Dirección IP',
                'Tipo de navegador',
                'Sistema operativo',
                'Páginas visitadas',
                'Tiempo de visita',
                'Origen de la visita (referrer)',
                'Datos recopilados a través de cookies (ver Política de Cookies)'
              ]
            },
            {
              subtitle: '3. Datos Comerciales',
              items: [
                'Consultas sobre servicios',
                'Solicitudes de presupuesto',
                'Historial de comunicaciones',
                'Preferencias de servicios'
              ]
            }
          ]
        },
        {
          title: 'Finalidades del Tratamiento',
          icon: Eye,
          content: [
            'Tratamos tus datos personales para las siguientes finalidades:',
            '',
            '1. Gestión de consultas y presupuestos:',
            '   • Base legal: Ejecución de medidas precontractuales',
            '   • Conservación: Hasta 2 años tras la última comunicación',
            '',
            '2. Prestación de servicios contratados:',
            '   • Base legal: Ejecución del contrato',
            '   • Conservación: Durante la relación comercial y 6 años posteriores (obligaciones fiscales)',
            '',
            '3. Marketing y comunicaciones comerciales:',
            '   • Base legal: Consentimiento del interesado',
            '   • Conservación: Hasta que retires tu consentimiento',
            '',
            '4. Análisis y mejora del sitio web:',
            '   • Base legal: Interés legítimo',
            '   • Conservación: Datos anonimizados sin límite temporal',
            '',
            '5. Cumplimiento de obligaciones legales:',
            '   • Base legal: Obligación legal',
            '   • Conservación: Según establezca la normativa aplicable'
          ]
        },
        {
          title: 'Destinatarios de los Datos',
          icon: UserCheck,
          content: [
            'Tus datos personales pueden ser compartidos con:',
            '',
            '• Proveedores de servicios tecnológicos:',
            '  - Hosting y almacenamiento (servidores ubicados en la UE)',
            '  - EmailJS para el envío de formularios',
            '  - Google Analytics para análisis web',
            '',
            '• Autoridades públicas:',
            '  - Cuando sea requerido por ley o para proteger nuestros derechos',
            '',
            '• No vendemos ni cedemos tus datos a terceros con fines comerciales',
            '',
            'Todos nuestros proveedores cumplen con el RGPD y tienen contratos de tratamiento de datos que garantizan la seguridad de tu información.'
          ]
        },
        {
          title: 'Transferencias Internacionales',
          icon: Database,
          content: [
            'Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del Espacio Económico Europeo (EEE).',
            'En estos casos, nos aseguramos de que existan garantías adecuadas:',
            '',
            '• Cláusulas contractuales tipo de la Comisión Europea',
            '• Certificación Privacy Shield (EE.UU.)',
            '• Decisiones de adecuación de la Comisión Europea',
            '',
            'Específicamente:',
            '• Google Analytics: Transferencias a EE.UU. bajo cláusulas contractuales tipo',
            '• EmailJS: Servidores en la UE, cumplimiento total del RGPD'
          ]
        },
        {
          title: 'Seguridad de los Datos',
          icon: Lock,
          content: [
            'Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales:',
            '',
            'Medidas técnicas:',
            '• Cifrado SSL/TLS para la transmisión de datos',
            '• Firewalls y sistemas de detección de intrusiones',
            '• Copias de seguridad regulares',
            '• Control de acceso mediante autenticación',
            '• Actualizaciones de seguridad periódicas',
            '',
            'Medidas organizativas:',
            '• Políticas de seguridad de la información',
            '• Formación del personal en protección de datos',
            '• Acuerdos de confidencialidad',
            '• Evaluaciones de impacto de privacidad',
            '• Procedimientos de respuesta a incidentes'
          ]
        },
        {
        title: 'Tus Derechos',
          icon: Shield,
          content: [
            'Bajo el RGPD, tienes los siguientes derechos:',
            '',
            '• Derecho de acceso: Puedes solicitar información sobre los datos que tenemos sobre ti.',
            '',
            '• Derecho de rectificación: Puedes solicitar la corrección de datos incorrectos o incompletos.',
            '',
            '• Derecho de supresión ("derecho al olvido"): Puedes solicitar la eliminación de tus datos cuando ya no sean necesarios.',
            '',
            '• Derecho de limitación del tratamiento: Puedes solicitar que limitemos el uso de tus datos en ciertas circunstancias.',
            '',
            '• Derecho de portabilidad: Puedes solicitar recibir tus datos en un formato estructurado y de uso común.',
            '',
            '• Derecho de oposición: Puedes oponerte al tratamiento de tus datos para fines de marketing directo.',
            '',
            '• Derecho a no ser objeto de decisiones automatizadas: Actualmente no realizamos decisiones automatizadas ni elaboración de perfiles.',
            '',
            '• Derecho a retirar el consentimiento: Puedes retirar tu consentimiento en cualquier momento sin que afecte a la licitud del tratamiento anterior.',
            '',
            'Para ejercer estos derechos, contacta con nosotros en: infojefeEpoxi@gmail.com'
          ]
        },
        {
          title: 'Conservación de Datos',
          icon: Database,
          content: [
            'Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados:',
            '',
            '• Datos de consultas y presupuestos: 2 años desde la última comunicación',
            '• Datos de clientes activos: Durante la relación comercial',
            '• Datos fiscales y contables: 6 años (obligación legal)',
            '• Datos de marketing: Hasta que retires tu consentimiento',
            '• Datos de navegación: 26 meses (Google Analytics)',
            '',
            'Transcurridos estos plazos, procederemos a la supresión segura de los datos o a su anonimización.'
          ]
        },
        {
          title: 'Menores de Edad',
          icon: UserCheck,
          content: [
            'Nuestros servicios están dirigidos a personas mayores de 18 años.',
            'No recopilamos conscientemente información personal de menores de edad.',
            'Si eres padre o tutor y crees que tu hijo nos ha proporcionado datos personales, contacta con nosotros inmediatamente para que podamos eliminarlos.'
          ]
        },
        {
          title: 'Cambios en esta Política',
          icon: FileText,
          content: [
            'Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o por motivos legales.',
            'Te notificaremos cualquier cambio significativo mediante:',
            '• Un aviso destacado en nuestro sitio web',
            '• Correo electrónico (si tenemos tu dirección)',
            '',
            'Te recomendamos revisar esta página periódicamente para estar informado sobre cómo protegemos tu información.',
            'La fecha de la última actualización se muestra en la parte superior de esta página.'
          ]
        },
        {
          title: 'Reclamaciones',
          icon: Shield,
          content: [
            'Si consideras que no hemos tratado tus datos personales de acuerdo con esta política o con la normativa aplicable, tienes derecho a presentar una reclamación ante:',
            '',
            'Agencia Española de Protección de Datos (AEPD)',
            'C/ Jorge Juan, 6',
            '28001 Madrid',
            'Teléfono: 901 100 099 / 912 663 517',
            'Web: www.aepd.es',
            '',
            'No obstante, te agradeceríamos que nos contactes primero para intentar resolver cualquier inquietud.'
          ]
        }
      ],
      contact: {
        title: 'Contacto',
        content: 'Para cualquier consulta sobre esta Política de Privacidad o para ejercer tus derechos, puedes contactarnos en:'
      }
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: October 2024',
      intro: 'At JefeEpoxi, we take your privacy and the protection of your personal data very seriously. This Privacy Policy explains how we collect, use, share, and protect your personal information in accordance with the EU GDPR (General Data Protection Regulation).',
      sections: [
        {
          title: 'Data Controller',
          icon: Shield,
          content: [
            'Identity: JefeEpoxi',
            'Address: Valencia, Spain',
            'Tax ID: B12345678',
            'Email: infojefeEpoxi@gmail.com',
            'Phone: +34 622 313 855',
            'Data Protection Officer: infojefeEpoxi@gmail.com'
          ]
        },
        {
          title: 'Data Protection Principles',
          icon: FileText,
          content: [
            'Your personal data will be processed in accordance with the following principles:',
            '• Lawfulness, fairness and transparency: We process your data legally and transparently.',
            '• Purpose limitation: We collect data for specific and legitimate purposes.',
            '• Data minimization: We only collect necessary data.',
            '• Accuracy: We keep data up-to-date and accurate.',
            '• Storage limitation: We retain data only as long as necessary.',
            '• Integrity and confidentiality: We protect your data with appropriate security measures.',
            '• Accountability: We comply with and demonstrate GDPR compliance.'
          ]
        },
        {
          title: 'Data We Collect',
          icon: Database,
          subsections: [
            {
              subtitle: '1. Identification and Contact Data',
              items: [
                'Name and surname',
                'Email address',
                'Phone number',
                'Postal address (if relevant to the service)'
              ]
            },
            {
              subtitle: '2. Navigation Data',
              items: [
                'IP address',
                'Browser type',
                'Operating system',
                'Pages visited',
                'Visit time',
                'Visit origin (referrer)',
                'Data collected through cookies (see Cookies Policy)'
              ]
            },
            {
              subtitle: '3. Commercial Data',
              items: [
                'Service inquiries',
                'Quote requests',
                'Communication history',
                'Service preferences'
              ]
            }
          ]
        },
        {
          title: 'Processing Purposes',
          icon: Eye,
          content: [
            'We process your personal data for the following purposes:',
            '',
            '1. Management of inquiries and quotes:',
            '   • Legal basis: Pre-contractual measures',
            '   • Retention: Up to 2 years after last communication',
            '',
            '2. Provision of contracted services:',
            '   • Legal basis: Contract execution',
            '   • Retention: During commercial relationship and 6 years after (tax obligations)',
            '',
            '3. Marketing and commercial communications:',
            '   • Legal basis: Data subject consent',
            '   • Retention: Until you withdraw consent',
            '',
            '4. Website analysis and improvement:',
            '   • Legal basis: Legitimate interest',
            '   • Retention: Anonymized data without time limit',
            '',
            '5. Compliance with legal obligations:',
            '   • Legal basis: Legal obligation',
            '   • Retention: As established by applicable regulations'
          ]
        },
        {
          title: 'Data Recipients',
          icon: UserCheck,
          content: [
            'Your personal data may be shared with:',
            '',
            '• Technology service providers:',
            '  - Hosting and storage (servers located in the EU)',
            '  - EmailJS for form submission',
            '  - Google Analytics for web analysis',
            '',
            '• Public authorities:',
            '  - When required by law or to protect our rights',
            '',
            '• We do not sell or transfer your data to third parties for commercial purposes',
            '',
            'All our providers comply with GDPR and have data processing agreements that guarantee the security of your information.'
          ]
        },
        {
          title: 'International Transfers',
          icon: Database,
          content: [
            'Some of our service providers may be located outside the European Economic Area (EEA).',
            'In these cases, we ensure that appropriate safeguards exist:',
            '',
            '• Standard contractual clauses from the European Commission',
            '• Privacy Shield certification (USA)',
            '• Adequacy decisions from the European Commission',
            '',
            'Specifically:',
            '• Google Analytics: Transfers to USA under standard contractual clauses',
            '• EmailJS: Servers in the EU, full GDPR compliance'
          ]
        },
        {
          title: 'Data Security',
          icon: Lock,
          content: [
            'We implement appropriate technical and organizational measures to protect your personal data:',
            '',
            'Technical measures:',
            '• SSL/TLS encryption for data transmission',
            '• Firewalls and intrusion detection systems',
            '• Regular backups',
            '• Access control through authentication',
            '• Regular security updates',
            '',
            'Organizational measures:',
            '• Information security policies',
            '• Staff training in data protection',
            '• Confidentiality agreements',
            '• Privacy impact assessments',
            '• Incident response procedures'
          ]
        },
        {
          title: 'Your Rights',
          icon: Shield,
          content: [
            'Under GDPR, you have the following rights:',
            '',
            '• Right of access: You can request information about the data we have about you.',
            '',
            '• Right to rectification: You can request correction of incorrect or incomplete data.',
            '',
            '• Right to erasure ("right to be forgotten"): You can request deletion of your data when no longer necessary.',
            '',
            '• Right to restriction of processing: You can request that we limit the use of your data in certain circumstances.',
            '',
            '• Right to data portability: You can request to receive your data in a structured, commonly used format.',
            '',
            '• Right to object: You can object to the processing of your data for direct marketing purposes.',
            '',
            '• Right not to be subject to automated decisions: We currently do not perform automated decisions or profiling.',
            '',
            '• Right to withdraw consent: You can withdraw your consent at any time without affecting the lawfulness of prior processing.',
            '',
            'To exercise these rights, contact us at: infojefeEpoxi@gmail.com'
          ]
        },
        {
          title: 'Data Retention',
          icon: Database,
          content: [
            'We retain your personal data for the time necessary to fulfill the purposes for which they were collected:',
            '',
            '• Inquiry and quote data: 2 years from last communication',
            '• Active customer data: During commercial relationship',
            '• Tax and accounting data: 6 years (legal obligation)',
            '• Marketing data: Until you withdraw consent',
            '• Navigation data: 26 months (Google Analytics)',
            '',
            'After these periods, we will proceed with secure deletion or anonymization of the data.'
          ]
        },
        {
          title: 'Minors',
          icon: UserCheck,
          content: [
            'Our services are aimed at people over 18 years old.',
            'We do not knowingly collect personal information from minors.',
            'If you are a parent or guardian and believe your child has provided us with personal data, contact us immediately so we can delete it.'
          ]
        },
        {
          title: 'Changes to this Policy',
          icon: FileText,
          content: [
            'We may update this Privacy Policy occasionally to reflect changes in our practices or for legal reasons.',
            'We will notify you of any significant changes through:',
            '• A prominent notice on our website',
            '• Email (if we have your address)',
            '',
            'We recommend reviewing this page periodically to stay informed about how we protect your information.',
            'The date of the last update is shown at the top of this page.'
          ]
        },
        {
          title: 'Complaints',
          icon: Shield,
          content: [
            'If you believe we have not processed your personal data in accordance with this policy or applicable regulations, you have the right to file a complaint with:',
            '',
            'Spanish Data Protection Agency (AEPD)',
            'C/ Jorge Juan, 6',
            '28001 Madrid',
            'Phone: 901 100 099 / 912 663 517',
            'Web: www.aepd.es',
            '',
            'However, we would appreciate if you contact us first to try to resolve any concerns.'
          ]
        }
      ],
      contact: {
        title: 'Contact',
        content: 'For any questions about this Privacy Policy or to exercise your rights, you can contact us at:'
      }
    },
    ua: {
      title: 'Політика Конфіденційності',
      lastUpdated: 'Останнє оновлення: Жовтень 2024',
      intro: 'У JefeEpoxi ми дуже серйозно ставимося до вашої конфіденційності та захисту ваших персональних даних. Ця Політика Конфіденційності пояснює, як ми збираємо, використовуємо, ділимося та захищаємо вашу особисту інформацію відповідно до GDPR ЄС (Загального регламенту про захист даних).',
      sections: [
        {
          title: 'Контролер Даних',
          icon: Shield,
          content: [
            'Ідентифікація: JefeEpoxi',
            'Адреса: Валенсія, Іспанія',
            'Податковий номер: B12345678',
            'Електронна пошта: infojefeEpoxi@gmail.com',
            'Телефон: +34 622 313 855',
            'Офіцер з Захисту Даних: infojefeEpoxi@gmail.com'
          ]
        },
        {
          title: 'Принципи Захисту Даних',
          icon: FileText,
          content: [
            'Ваші персональні дані будуть оброблятися відповідно до наступних принципів:',
            '• Законність, справедливість та прозорість: Ми обробляємо ваші дані законно та прозоро.',
            '• Обмеження мети: Ми збираємо дані для конкретних та законних цілей.',
            '• Мінімізація даних: Ми збираємо лише необхідні дані.',
            '• Точність: Ми підтримуємо актуальні та точні дані.',
            '• Обмеження зберігання: Ми зберігаємо дані лише стільки, скільки необхідно.',
            '• Цілісність та конфіденційність: Ми захищаємо ваші дані відповідними заходами безпеки.',
            '• Відповідальність: Ми дотримуємося та демонструємо відповідність GDPR.'
          ]
        },
        {
          title: 'Дані, які ми збираємо',
          icon: Database,
          subsections: [
            {
              subtitle: '1. Ідентифікаційні та Контактні Дані',
              items: [
                'Ім\'я та прізвище',
                'Адреса електронної пошти',
                'Номер телефону',
                'Поштова адреса (якщо це стосується послуги)'
              ]
            },
            {
              subtitle: '2. Дані Навігації',
              items: [
                'IP-адреса',
                'Тип браузера',
                'Операційна система',
                'Відвідані сторінки',
                'Час відвідування',
                'Джерело відвідування (referrer)',
                'Дані, зібрані через cookies (див. Політику Cookies)'
              ]
            },
            {
              subtitle: '3. Комерційні Дані',
              items: [
                'Запити про послуги',
                'Запити на ціну',
                'Історія комунікацій',
                'Вподобання щодо послуг'
              ]
            }
          ]
        },
        {
          title: 'Цілі Обробки',
          icon: Eye,
          content: [
            'Ми обробляємо ваші персональні дані для наступних цілей:',
            '',
            '1. Управління запитами та пропозиціями:',
            '   • Правова основа: Передконтрактні заходи',
            '   • Зберігання: До 2 років після останнього повідомлення',
            '',
            '2. Надання укладених послуг:',
            '   • Правова основа: Виконання контракту',
            '   • Зберігання: Під час комерційних відносин та 6 років після (податкові зобов\'язання)',
            '',
            '3. Маркетинг та комерційні комунікації:',
            '   • Правова основа: Згода суб\'єкта даних',
            '   • Зберігання: Поки ви не відкличете згоду',
            '',
            '4. Аналіз та покращення веб-сайту:',
            '   • Правова основа: Законний інтерес',
            '   • Зберігання: Анонімізовані дані без обмеження часу',
            '',
            '5. Дотримання юридичних зобов\'язань:',
            '   • Правова основа: Юридичне зобов\'язання',
            '   • Зберігання: Як встановлено застосовними правилами'
          ]
        },
        {
          title: 'Отримувачі Даних',
          icon: UserCheck,
          content: [
            'Ваші персональні дані можуть бути передані:',
            '',
            '• Постачальникам технологічних послуг:',
            '  - Хостинг та зберігання (сервери в ЄС)',
            '  - EmailJS для відправки форм',
            '  - Google Analytics для веб-аналізу',
            '',
            '• Державним органам:',
            '  - Коли це вимагається законом або для захисту наших прав',
            '',
            '• Ми не продаємо і не передаємо ваші дані третім сторонам в комерційних цілях',
            '',
            'Всі наші постачальники дотримуються GDPR та мають угоди про обробку даних, які гарантують безпеку вашої інформації.'
          ]
        },
        {
          title: 'Міжнародні Передачі',
          icon: Database,
          content: [
            'Деякі з наших постачальників послуг можуть знаходитися за межами Європейського Економічного Простору (ЄЕП).',
            'У таких випадках ми забезпечуємо наявність відповідних гарантій:',
            '',
            '• Стандартні договірні положення Європейської Комісії',
            '• Сертифікація Privacy Shield (США)',
            '• Рішення про адекватність від Європейської Комісії',
            '',
            'Зокрема:',
            '• Google Analytics: Передачі до США за стандартними договірними положеннями',
            '• EmailJS: Сервери в ЄС, повна відповідність GDPR'
          ]
        },
        {
          title: 'Безпека Даних',
          icon: Lock,
          content: [
            'Ми впроваджуємо відповідні технічні та організаційні заходи для захисту ваших персональних даних:',
            '',
            'Технічні заходи:',
            '• Шифрування SSL/TLS для передачі даних',
            '• Фаєрволи та системи виявлення вторгнень',
            '• Регулярні резервні копії',
            '• Контроль доступу через аутентифікацію',
            '• Регулярні оновлення безпеки',
            '',
            'Організаційні заходи:',
            '• Політики інформаційної безпеки',
            '• Навчання персоналу з захисту даних',
            '• Угоди про конфіденційність',
            '• Оцінки впливу на конфіденційність',
            '• Процедури реагування на інциденти'
          ]
        },
        {
          title: 'Ваші Права',
          icon: Shield,
          content: [
            'За GDPR ви маєте наступні права:',
            '',
            '• Право на доступ: Ви можете запитати інформацію про дані, які ми маємо про вас.',
            '',
            '• Право на виправлення: Ви можете запитати виправлення неправильних або неповних даних.',
            '',
            '• Право на видалення ("право бути забутим"): Ви можете запитати видалення ваших даних, коли вони більше не потрібні.',
            '',
            '• Право на обмеження обробки: Ви можете запитати обмеження використання ваших даних за певних обставин.',
            '',
            '• Право на переносимість даних: Ви можете запитати отримання ваших даних у структурованому, загальновикористовуваному форматі.',
            '',
            '• Право на заперечення: Ви можете заперечити проти обробки ваших даних для цілей прямого маркетингу.',
            '',
            '• Право не підлягати автоматизованим рішенням: Наразі ми не виконуємо автоматизованих рішень або профілювання.',
            '',
            '• Право відкликати згоду: Ви можете відкликати свою згоду в будь-який час без впливу на законність попередньої обробки.',
            '',
            'Щоб скористатися цими правами, зв\'яжіться з нами: infojefeEpoxi@gmail.com'
          ]
        },
        {
          title: 'Зберігання Даних',
          icon: Database,
          content: [
            'Ми зберігаємо ваші персональні дані протягом часу, необхідного для виконання цілей, для яких вони були зібрані:',
            '',
            '• Дані запитів та пропозицій: 2 роки з останнього повідомлення',
            '• Дані активних клієнтів: Під час комерційних відносин',
            '• Податкові та бухгалтерські дані: 6 років (юридичне зобов\'язання)',
            '• Маркетингові дані: Поки ви не відкличете згоду',
            '• Дані навігації: 26 місяців (Google Analytics)',
            '',
            'Після цих періодів ми проведемо безпечне видалення або анонімізацію даних.'
          ]
        },
        {
          title: 'Неповнолітні',
          icon: UserCheck,
          content: [
            'Наші послуги призначені для осіб старше 18 років.',
            'Ми свідомо не збираємо особисту інформацію від неповнолітніх.',
            'Якщо ви є батьком або опікуном і вважаєте, що ваша дитина надала нам персональні дані, негайно зв\'яжіться з нами, щоб ми могли їх видалити.'
          ]
        },
        {
          title: 'Зміни в цій Політиці',
          icon: FileText,
          content: [
            'Ми можемо періодично оновлювати цю Політику Конфіденційності, щоб відобразити зміни в наших практиках або з юридичних причин.',
            'Ми повідомимо вас про будь-які значні зміни через:',
            '• Помітне повідомлення на нашому веб-сайті',
            '• Електронну пошту (якщо у нас є ваша адреса)',
            '',
            'Ми рекомендуємо періодично переглядати цю сторінку, щоб бути в курсі того, як ми захищаємо вашу інформацію.',
            'Дата останнього оновлення показана у верхній частині цієї сторінки.'
          ]
        },
        {
          title: 'Скарги',
          icon: Shield,
          content: [
            'Якщо ви вважаєте, що ми не обробили ваші персональні дані відповідно до цієї політики або застосовних правил, ви маєте право подати скаргу до:',
            '',
            'Іспанське Агентство з Захисту Даних (AEPD)',
            'C/ Jorge Juan, 6',
            '28001 Madrid',
            'Телефон: 901 100 099 / 912 663 517',
            'Веб-сайт: www.aepd.es',
            '',
            'Однак ми будемо вдячні, якщо ви спочатку зв\'яжетеся з нами, щоб спробувати вирішити будь-які питання.'
          ]
        }
      ],
      contact: {
        title: 'Контакти',
        content: 'З будь-яких питань щодо цієї Політики Конфіденційності або для здійснення ваших прав, ви можете зв\'язатися з нами за адресою:'
      }
    }
  };

  const content = privacyContent[language as keyof typeof privacyContent] || privacyContent.es;

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
                <Shield className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground mb-4">
                {content.lastUpdated}
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                  <div key={index} className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all">
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
                          <div className="space-y-2">
                            {section.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Subsections */}
                        {section.subsections && (
                          <div className="space-y-6 mt-4">
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

const PrivacyPolicy = () => {
  return <PrivacyPolicyContent />;
};

export default PrivacyPolicy;
