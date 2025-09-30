import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_jefeepoxi', // You'll need to create this in EmailJS
  templateId: 'template_quote', // You'll need to create this template
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // Get from EmailJS dashboard
};

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  surface: string;
  finishType: string;
  message: string;
}

// Initialize EmailJS (call this once in your app)
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
};

// Send quote request email
export const sendQuoteEmail = async (formData: QuoteFormData): Promise<void> => {
  try {
    // Prepare template parameters
    const templateParams = {
      to_name: 'JefeEpoxi Team',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address || 'No especificada',
      surface: formData.surface || 'No especificada',
      finish_type: formData.finishType || 'No especificado',
      project_description: formData.message || 'Sin descripción adicional',
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES'),
      // Additional emails to CC
      cc_email: 'jefeepoxi@gmail.com',
      main_email: 'infojefeepoxi@gmail.com'
    };

    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
      console.log('📧 EmailJS not configured, using mailto fallback');
      await sendMailtoFallback(templateParams);
      return;
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (response.status === 200) {
      console.log('✅ Email sent successfully via EmailJS');
    } else {
      throw new Error('EmailJS response status: ' + response.status);
    }

  } catch (error) {
    console.error('❌ EmailJS error, falling back to mailto:', error);
    await sendMailtoFallback({
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address || 'No especificada',
      surface: formData.surface || 'No especificada',
      finish_type: formData.finishType || 'No especificado',
      project_description: formData.message || 'Sin descripción adicional',
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES')
    });
  }
};

// Fallback method using mailto
const sendMailtoFallback = async (params: any): Promise<void> => {
  const subject = encodeURIComponent(`🏗️ Nueva solicitud de presupuesto - ${params.from_name}`);
  const body = encodeURIComponent(`
🏗️ NUEVA SOLICITUD DE PRESUPUESTO EPOXI M²
==========================================

👤 DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre completo: ${params.from_name}
• Email: ${params.from_email}
• Teléfono: ${params.phone}
• Dirección del proyecto: ${params.address}

🏭 DETALLES DEL PROYECTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Superficie estimada: ${params.surface} m²
• Tipo de acabado deseado: ${params.finish_type}
• Descripción del proyecto:
${params.project_description}

📅 INFORMACIÓN DE LA SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fecha: ${params.date}
• Hora: ${params.time}
• Origen: Formulario web www.jefeepoxi.com

💼 PRÓXIMOS PASOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contactar al cliente en 24 horas
2. Evaluar el proyecto y tipo de sistema Epoxi M²
3. Preparar presupuesto personalizado
4. Programar visita técnica si es necesario

---
🌐 Generado automáticamente por JefeEpoxi.com
📧 Sistema de gestión de leads v2.1
  `);
  
  // Create mailto links for both emails
  const mailtoLink1 = `mailto:infojefeepoxi@gmail.com?subject=${subject}&body=${body}`;
  const mailtoLink2 = `mailto:jefeepoxi@gmail.com?subject=${subject}&body=${body}`;
  
  // Open both email clients
  window.open(mailtoLink1, '_blank');
  setTimeout(() => {
    window.open(mailtoLink2, '_blank');
  }, 500);
  
  console.log('📧 Mailto fallback executed for both addresses');
};
