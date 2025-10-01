# 📧 НАЛАШТУВАННЯ EMAILJS ДЛЯ АВТОМАТИЧНОЇ ВІДПРАВКИ

## 🎯 МЕТА:
Налаштувати автоматичну відправку лідів з форми на ваші email адреси:
- `infojefeepoxi@gmail.com` (основна)
- `jefeepoxi@gmail.com` (копія)

---

## 📝 КРОК 1: РЕЄСТРАЦІЯ В EMAILJS

1. Перейдіть на https://www.emailjs.com
2. Натисніть **"Sign Up"**
3. Виберіть **Free план** (200 email/місяць)
4. Підтвердіть email

---

## ⚙️ КРОК 2: НАЛАШТУВАННЯ EMAIL SERVICE

1. В EmailJS Dashboard натисніть **"Add New Service"**
2. Виберіть **Gmail**
3. Введіть дані:
   - **Service Name:** `JefeEpoxi Contact`
   - **Service ID:** `service_jefeepoxi`
   - **Gmail:** `infojefeepoxi@gmail.com`
4. Натисніть **"Connect Account"** та авторизуйтесь

---

## 📄 КРОК 3: СТВОРЕННЯ EMAIL ШАБЛОНУ

1. Натисніть **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `Quote Request Template`
3. **Template ID:** `template_quote`
4. **Налаштуйте шаблон:**

```
Тема: 🏗️ Nueva solicitud de presupuesto - {{from_name}}

Зміст:
🏗️ NUEVA SOLICITUD DE PRESUPUESTO EPOXI M²
==========================================

👤 DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre completo: {{from_name}}
• Email: {{from_email}}
• Teléfono: {{phone}}
• Dirección: {{address}}

🏭 DETALLES DEL PROYECTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Superficie: {{surface}} m²
• Tipo de acabado: {{finish_type}}
• Descripción:
{{project_description}}

📅 SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fecha: {{date}} a las {{time}}
• Origen: www.jefeepoxi.com

Para: {{main_email}}
CC: {{cc_email}}
```

5. **Settings:**
   - **To Email:** `infojefeepoxi@gmail.com`
   - **CC:** `jefeepoxi@gmail.com`
   - **From Name:** `{{from_name}}`
   - **Reply To:** `{{from_email}}`

---

## 🔑 КРОК 4: ОТРИМАННЯ КЛЮЧІВ

1. Перейдіть в **"Integration"**
2. Скопіюйте:
   - **Public Key** (наприклад: `user_abc123xyz`)
   - **Service ID:** `service_jefeepoxi`
   - **Template ID:** `template_quote`

---

## 💻 КРОК 5: ОНОВЛЕННЯ КОДУ

Замініть у файлі `src/lib/emailService.ts`:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_jefeepoxi', // Ваш Service ID
  templateId: 'template_quote',   // Ваш Template ID
  publicKey: 'user_abc123xyz'     // Ваш Public Key
};
```

---

## 🧪 КРОК 6: ТЕСТУВАННЯ

1. Збережіть зміни
2. Перезавантажте сайт
3. Заповніть форму тестовими даними
4. Натисніть "Solicitar Presupuesto"
5. Перевірте обидві пошти

---

## ✅ РЕЗУЛЬТАТ:

Після налаштування EmailJS:
- ✅ Форма автоматично відправляє email
- ✅ Не потрібно відкривати email клієнт
- ✅ Лід приходить одразу на обидві пошти
- ✅ Красивий HTML формат
- ✅ Автоматичний Reply-To на email клієнта

---

## 🆘 ЯКЩО ЩОСЬ НЕ ПРАЦЮЄ:

**Поки EmailJS не налаштований**, форма працює через **mailto** (як зараз):
- Відкриває email клієнт
- Автоматично заповнює дані
- Ви отримуєте email після відправки користувачем

---

**📞 Потрібна допомога з налаштуванням? Зателефонуйте!**

