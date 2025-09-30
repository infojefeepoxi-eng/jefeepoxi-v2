# 🧪 **Детальна інструкція тестування Cookie Consent**

## 🚀 **Крок 4: Запуск та тестування з вашим GA ID**

### 4.1 Підготовка до тестування
```bash
# Переконайтеся що ви в правильній директорії
cd jefeepoxy-main

# Встановіть залежності (якщо ще не встановлені)
npm install

# Запустіть сервер розробки
npm run dev
```

### 4.2 Відкриття в браузері
1. Відкрийте браузер в **режимі інкогніто** (Ctrl+Shift+N в Chrome)
2. Перейдіть на `http://localhost:8080` (або порт який показує Vite)
3. Відкрийте **Developer Tools** (F12)
4. Перейдіть на вкладку **Console**
5. **Ви повинні побачити:** `🍪 Google Analytics 4 initialized with Consent Mode v2`

---

## 🍪 **Крок 5: Тестування Cookie Banner**

### 5.1 Перша поява банера
**Що повинно статися:**
- ✅ Через 1 секунду з'являється банер знизу
- ✅ Видно backdrop з blur ефектом
- ✅ Банер містить іспанський текст
- ✅ Дві кнопки: "Solo esenciales" (сіра) та "Aceptar todas" (зелена)

**Якщо банер не з'являється:**
```javascript
// В консолі браузера виконайте:
window.showCookieBanner()
```

### 5.2 Тестування кнопки "Aceptar todas"
1. **Натисніть зелену кнопку "Aceptar todas"**
2. **Перевірте в консолі:**
   ```
   ✅ Cookies accepted - Analytics and advertising enabled
   🍪 Google Consent Mode updated: {analytics: true, marketing: true, ...}
   ```
3. **Перевірте localStorage:**
   - Натисніть F12 → Application → Local Storage → localhost
   - Повинно бути: `cookie-consent: "accepted"`

### 5.3 Тестування кнопки "Solo esenciales"
1. **Скиньте тест:**
   ```javascript
   window.cookieUtils.resetCookieConsent()
   ```
2. **Натисніть сіру кнопку "Solo esenciales"**
3. **Перевірте в консолі:**
   ```
   ❌ Cookies rejected - Only essential cookies enabled
   🍪 Google Consent Mode updated: {analytics: false, marketing: false, ...}
   ```

### 5.4 Тестування збереження вибору
1. **Оновіть сторінку (F5)**
2. **Банер НЕ повинен з'явитися знову**
3. **Відкрийте нову вкладку з тим же сайтом**
4. **Банер НЕ повинен з'явитися**

---

## 🔍 **Крок 6: Перевірка Google Analytics**

### 6.1 Перевірка Network запитів
1. **Developer Tools → Network вкладка**
2. **Оновіть сторінку**
3. **Натисніть "Aceptar todas" на банері**
4. **Шукайте запити до:**
   - `googletagmanager.com`
   - `google-analytics.com`
   - `analytics.google.com`

### 6.2 Перевірка в Google Analytics Real-time
1. **Відкрийте Google Analytics** (ваш аккаунт з G-BQC18G9GBJ)
2. **Перейдіть: Reports → Realtime → Overview**
3. **На вашому сайті натисніть "Aceptar todas"**
4. **Навігуйте по сайту (кілька сторінок)**
5. **Натисніть кнопки телефону та WhatsApp**
6. **В GA4 повинні з'явитися:**
   - Активні користувачі (1-2 хвилини)
   - Події: `page_view`, `phone_call`, `whatsapp_contact`

### 6.3 Що робити якщо дані не надходять:

**Перевірте Measurement ID:**
```html
<!-- В index.html повинно бути: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BQC18G9GBJ"></script>
<!-- та -->
gtag('config', 'G-BQC18G9GBJ', {
```

**Перевірте консоль на помилки:**
- Червоні помилки в Console можуть блокувати GA
- Переконайтеся що немає блокувачів реклами

**Тестування з різних пристроїв:**
- Мобільний телефон
- Різні браузери
- Різні мережі

---

## 🌐 **Крок 7: Тестування мультимовності**

### 7.1 Переключення мови
1. **Натисніть на кнопку мови в хедері (ES/EN)**
2. **Скиньте банер:** `window.showCookieBanner()`
3. **Перевірте що текст змінився на англійську**

### 7.2 Тестування на мобільному
1. **Developer Tools → Device Toolbar (Ctrl+Shift+M)**
2. **Оберіть мобільний пристрій**
3. **Перевірте що банер адаптивний**

---

## 🛠️ **Корисні команди для тестування**

```javascript
// === В консолі браузера ===

// Показати банер знову
window.showCookieBanner()

// Перевірити поточну згоду
window.cookieUtils.getCookieConsent()

// Перевірити детальні налаштування
window.cookieUtils.getCookieSettings()

// Скинути всі cookies
window.cookieUtils.resetCookieConsent()

// Перевірити чи дозволена категорія
window.cookieUtils.isCookieCategoryAllowed('analytics')

// === ТЕСТУВАННЯ БІЗНЕС-ПОДІЙ JEFEepoxy ===

// Імпортуйте функції в консолі:
import('./src/lib/analytics.js').then(analytics => {
  // Тестова заявка на оцінку
  analytics.trackQuoteRequest('test_source');
  
  // Тестовий дзвінок
  analytics.trackPhoneCall('test_location');
  
  // Тестовий WhatsApp
  analytics.trackWhatsAppClick('test_location');
  
  // Тестовий перегляд проекту
  analytics.trackProjectView('industrial');
  
  // Тестова подія Valencia
  analytics.trackValenciaSpecific('test_action', 'centro');
});

// Простіші тестові події:
window.cookieUtils.trackEvent('test_quote_request', { value: 10 });
window.cookieUtils.trackEvent('test_phone_call', { value: 8 });
```

---

## 📊 **Крок 8: Верифікація в Google Analytics**

### 8.1 Перевірка Events
1. **Google Analytics → Reports → Engagement → Events**
2. **Повинні з'явитися події:**
   - `page_view`
   - `session_start`
   - Ваші кастомні події (якщо є)

### 8.2 Перевірка Audience
1. **Reports → Demographic → Demographics Overview**
2. **Повинні з'явитися дані про користувачів**

### 8.3 Перевірка Consent Mode
1. **Admin → Data Settings → Data Collection**
2. **Переконайтеся що "Google signals" увімкнено**
3. **Перевірте що Consent Mode працює правильно**

---

## ⚠️ **Поширені проблеми та рішення**

### Проблема: Банер не з'являється
**Рішення:**
```javascript
// Перевірте в консолі:
localStorage.getItem('cookie-consent') // Повинно бути null
window.showCookieBanner() // Примусово показати
```

### Проблема: GA не отримує дані
**Рішення:**
1. Перевірте Measurement ID
2. Відключіть блокувачі реклами
3. Перевірте що натиснули "Aceptar todas"
4. Зачекайте 5-10 хвилин для появи даних

### Проблема: Consent Mode не працює
**Рішення:**
```javascript
// Перевірте в консолі:
window.gtag // Повинно бути функцією
window.dataLayer // Повинно бути масивом
```

---

## ✅ **Чекліст успішного тестування**

- [ ] Банер з'являється при першому відвідуванні
- [ ] Кнопки працюють правильно
- [ ] Вибір зберігається в localStorage
- [ ] Банер не з'являється при повторному відвідуванні
- [ ] Google Analytics отримує дані після згоди
- [ ] Consent Mode правильно оновлюється
- [ ] Мультимовність працює
- [ ] Адаптивний дизайн на мобільному
- [ ] Немає помилок в консолі
- [ ] Real-time дані в GA4 показуються

**Якщо всі пункти виконані - ваш Cookie Consent працює ідеально! 🎉**

