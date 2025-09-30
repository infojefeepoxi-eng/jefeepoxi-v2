export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  surface: string;
  finishType: string;
  message: string;
}

// Initialize EmailJS (placeholder for future use)
export const initEmailJS = () => {
  console.log('📧 Email service initialized');
};

// Send quote request email - AUTOMATIC SENDING
export const sendQuoteEmail = async (formData: QuoteFormData): Promise<void> => {
  try {
    // Prepare email content
    const emailContent = `
🏗️ NUEVA SOLICITUD DE PRESUPUESTO EPOXI M²
==========================================

👤 DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre completo: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}
• Dirección del proyecto: ${formData.address || 'No especificada'}

🏭 DETALLES DEL PROYECTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Superficie estimada: ${formData.surface || 'No especificada'} m²
• Tipo de acabado deseado: ${formData.finishType || 'No especificado'}
• Descripción del proyecto:
${formData.message || 'Sin descripción adicional'}

📅 INFORMACIÓN DE LA SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fecha: ${new Date().toLocaleDateString('es-ES')}
• Hora: ${new Date().toLocaleTimeString('es-ES')}
• Origen: Formulario web www.jefeepoxi.com

💼 PRÓXIMOS PASOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contactar al cliente en 24 horas
2. Evaluar el proyecto y tipo de sistema Epoxi M²
3. Preparar presupuesto personalizado
4. Programar visita técnica si es necesario

---
🌐 Generado automáticamente por JefeEpoxi.com
📧 Sistema de gestión de leads v2.1`;

    // Method 1: Try Netlify Forms (automatic when deployed)
    try {
      console.log('📧 Sending via Netlify Forms...');
      const netlifyResponse = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-quote',
          'name': formData.name,
          'email': formData.email,
          'phone': formData.phone,
          'address': formData.address || 'No especificada',
          'surface': formData.surface || 'No especificada',
          'finish-type': formData.finishType || 'No especificado',
          'message': formData.message || 'Sin descripción adicional',
          'full-message': emailContent
        }).toString()
      });

      if (netlifyResponse.ok) {
        console.log('✅ Email sent automatically via Netlify Forms');
        return;
      }
    } catch (netlifyError) {
      console.log('⚠️ Netlify Forms not available, trying external services...');
    }

    // Method 2: Try FormSubmit.co (free, automatic, no signup)
    console.log('📧 Sending via FormSubmit.co...');
    const formSubmitResponse = await fetch('https://formsubmit.co/infojefeepoxi@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        surface: formData.surface,
        finishType: formData.finishType,
        message: emailContent,
        _cc: 'jefeepoxi@gmail.com',
        _captcha: 'false',
        _template: 'table'
      })
    });

    if (formSubmitResponse.ok) {
      console.log('✅ Email sent automatically via FormSubmit.co');
      return;
    }

    // Method 3: Try backup service
    console.log('⚠️ FormSubmit failed, trying backup...');
    await sendBackupEmail(formData, emailContent);

  } catch (error) {
    console.error('❌ Primary email service failed:', error);
    await sendBackupEmail(formData, emailContent);
  }
};

// Backup method: Direct API call to another service
const sendBackupEmail = async (formData: QuoteFormData, emailContent: string): Promise<void> => {
  try {
    // Try Getform.io as backup
    const response = await fetch('https://getform.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: emailContent,
        _gotcha: '' // Anti-spam
      })
    });

    if (response.ok) {
      console.log('✅ Email sent via backup service');
      return;
    }

    throw new Error('Backup service failed');
    
  } catch (error) {
    console.log('⚠️ All automatic services failed, using mailto fallback');
    await sendMailtoFallback(formData, emailContent);
  }
};

// Final fallback: mailto (opens email client)
const sendMailtoFallback = async (formData: QuoteFormData, emailContent: string): Promise<void> => {
  const subject = encodeURIComponent(`🏗️ Nueva solicitud de presupuesto - ${formData.name}`);
  const body = encodeURIComponent(emailContent);
  
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