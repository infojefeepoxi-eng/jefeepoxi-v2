# 📊 **Верифікація даних в Google Analytics 4**

## 🎯 **Крок 9: Детальна перевірка GA4**

### 9.1 Immediate Verification (0-5 хвилин)

**Real-time Reports:**
1. **Google Analytics → Reports → Realtime**
2. **Users right now** - повинно показувати активних користувачів
3. **Event count by Event name:**
   - `page_view` - перегляди сторінок
   - `session_start` - початок сесій
   - `first_visit` - перші відвідування

**Що робити якщо Real-time порожній:**
```javascript
// 1. Перевірте в консолі браузера:
window.gtag('event', 'test_event', { test_parameter: 'test_value' });

// 2. Перевірте Network вкладку на наявність запитів до:
// - www.google-analytics.com
// - www.googletagmanager.com
```

### 9.2 Short-term Verification (30 хвилин - 4 години)

**Enhanced Measurement Events:**
1. **Reports → Engagement → Events**
2. **Повинні з'явитися автоматичні події:**
   - `page_view` - кожен перегляд сторінки
   - `scroll` - прокрутка на 90%
   - `click` - кліки по зовнішнім посиланням
   - `file_download` - завантаження файлів (якщо є)

**Audience Data:**
1. **Reports → Demographic → Demographics Overview**
2. **Повинні з'явитися дані про:**
   - Вік користувачів (приблизний)
   - Стать користувачів
   - Інтереси (якщо дозволено Google Signals)

### 9.3 Medium-term Verification (4-24 години)

**Traffic Sources:**
1. **Reports → Acquisition → Traffic acquisition**
2. **Повинні з'явитися джерела трафіку:**
   - `Direct` - прямі заходи
   - `Organic Search` - пошукові системи
   - `Referral` - посилання з інших сайтів

**Geographic Data:**
1. **Reports → Demographic → Demographics Overview**
2. **Geographic → Countries**
3. **Повинна з'явитися Іспанія та інші країни**

---

## 🔍 **Крок 10: Перевірка Consent Mode**

### 10.1 Consent Mode Status
1. **Admin → Data Settings → Data Collection**
2. **Google signals data collection:** має бути `Active`
3. **Data retention:** встановіть `14 months`

### 10.2 Consent Mode Events
**Перевірте спеціальні події:**
```javascript
// В консолі браузера після прийняття cookies:
window.gtag('event', 'consent', {
  consent_type: 'analytics_storage',
  consent_status: 'granted'
});
```

### 10.3 Privacy Settings Verification
1. **Admin → Property Settings → Property Details**
2. **Industry Category:** `Construction` або `Professional Services`
3. **Data Processing Location:** `European Union`

---

## 📈 **Крок 11: Налаштування цілей та конверсій**

### 11.1 Створення кастомних подій для JefeEpoxi
```javascript
// Додайте ці події в ваш код для відстеження бізнес-метрик:

// Запит на оцінку
window.gtag('event', 'quote_request', {
  event_category: 'lead_generation',
  event_label: 'contact_form',
  value: 1
});

// Перегляд проектів
window.gtag('event', 'view_projects', {
  event_category: 'engagement',
  event_label: 'gallery_view'
});

// Дзвінок по телефону
window.gtag('event', 'phone_call', {
  event_category: 'contact',
  event_label: 'header_phone',
  value: 5 // Вища цінність для дзвінків
});

// WhatsApp контакт
window.gtag('event', 'whatsapp_contact', {
  event_category: 'contact',
  event_label: 'whatsapp_button',
  value: 3
});
```

### 11.2 Налаштування цілей в GA4
1. **Admin → Events → Create Event**
2. **Створіть події для:**
   - `quote_request` (найважливіша конверсія)
   - `phone_call`
   - `whatsapp_contact`
3. **Mark as conversion:** увімкніть для важливих подій

---

## 🚨 **Крок 12: Troubleshooting Guide**

### 12.1 Якщо дані не надходять взагалі

**Перевірте код:**
```html
<!-- index.html - переконайтеся що ID правильний -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
```

**Перевірте мережу:**
1. Developer Tools → Network
2. Фільтр: `google-analytics` або `gtag`
3. Повинні бути запити зі статусом 200

**Перевірте блокувачі:**
- Відключіть AdBlock, uBlock Origin
- Спробуйте інший браузер
- Спробуйте мобільну мережу

### 12.2 Якщо Consent Mode не працює

**Перевірте ініціалізацію:**
```javascript
// В консолі браузера:
console.log(window.dataLayer);
// Повинно показати масив з consent подіями
```

**Перевірте послідовність:**
1. Consent Mode ініціалізується ДО gtag('config')
2. Cookie banner оновлює consent після вибору користувача
3. GA4 отримує оновлені дозволи

### 12.3 Якщо Real-time працює, але звіти порожні

**Зачекайте:**
- Real-time: миттєво
- Events: 30 хвилин - 4 години  
- Audience: 4-24 години
- Custom reports: 24-48 годин

**Перевірте фільтри:**
- Admin → Data Settings → Data Filters
- Переконайтеся що немає фільтрів що блокують дані

---

## 📋 **Крок 13: Чекліст продакшена**

### 13.1 Перед запуском на продакшен:

**Технічні перевірки:**
- [ ] Measurement ID замінений на реальний
- [ ] Consent Mode v2 правильно ініціалізований
- [ ] Cookie banner з'являється для нових користувачів
- [ ] localStorage правильно зберігає вибір
- [ ] Немає помилок в консолі браузера

**GA4 налаштування:**
- [ ] Property створений для правильного домену
- [ ] Data retention встановлений (14 місяців)
- [ ] Google Signals увімкнений
- [ ] Enhanced Measurement увімкнений
- [ ] Цілі налаштовані для бізнес-метрик

**GDPR compliance:**
- [ ] Cookies заборонені за замовчуванням
- [ ] Користувач може відхилити cookies
- [ ] Політика приватності доступна
- [ ] Вибір користувача зберігається

### 13.2 Моніторинг після запуску:

**Щоденно (перший тиждень):**
- Перевіряйте Real-time дані
- Моніторьте помилки в консолі
- Перевіряйте конверсії

**Щотижнево:**
- Аналізуйте джерела трафіку
- Перевіряйте поведінку користувачів
- Оптимізуйте на основі даних

**Щомісячно:**
- Створюйте звіти по цілям
- Аналізуйте тренди
- Плануйте оптимізацію сайту

---

## 🎯 **Очікувані результати для JefeEpoxi**

### Через 1 тиждень:
- **50-100 сесій/день** (залежно від трафіку)
- **5-10 запитів на оцінку/тиждень**
- **60-80% acceptance rate** для cookies

### Через 1 місяць:
- **Стабільний органічний трафік**
- **Зниження bounce rate** завдяки кращому UX
- **Збільшення часу на сайті**

### Ключові метрики для відстеження:
1. **Конверсії:** запити на оцінку, дзвінки, WhatsApp
2. **Engagement:** час на сайті, переглянуті сторінки
3. **Traffic sources:** органічний пошук, пряме відвідування
4. **Geographic data:** трафік з Valencia та інших міст Іспанії

---

## 🏆 **Фінальна перевірка успіху**

**Ваш GA4 налаштований правильно якщо:**
- ✅ Real-time показує активних користувачів
- ✅ Events отримуються протягом 30 хвилин
- ✅ Consent Mode правильно оновлюється
- ✅ Demographic дані з'являються протягом 24 годин
- ✅ Конверсії відстежуються
- ✅ Немає помилок в консолі
- ✅ Cookie banner працює на всіх пристроях

**Вітаю! Ваш сайт тепер має професійну аналітику! 🎉**

