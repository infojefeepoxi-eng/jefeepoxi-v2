# 🍪 Cookie Consent & Google Analytics Setup

## Огляд

Ваш сайт тепер має повністю GDPR-сумісний банер згоди на cookies з підтримкою Google Consent Mode v2.

## 🚀 Налаштування

### 1. Google Analytics 4

1. **Отримайте ваш Measurement ID:**
   - Перейдіть в [Google Analytics](https://analytics.google.com/)
   - Створіть новий GA4 property для вашого сайту
   - Скопіюйте Measurement ID (формат: `G-XXXXXXXXXX`)

2. **Оновіть конфігурацію:**
   Замініть `GA_MEASUREMENT_ID` в файлі `index.html` (рядки 20 та 36):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
   ```javascript
   gtag('config', 'G-XXXXXXXXXX', {
     anonymize_ip: true,
     respect_dnt: true
   });
   ```

### 2. Тестування

1. **Запустіть проект:**
   ```bash
   npm run dev
   ```

2. **Відкрийте браузер в режимі інкогніто**

3. **Перевірте функціональність:**
   - Банер повинен з'явитися через 1 секунду
   - Кнопки "Aceptar" та "Rechazar" працюють
   - Вибір зберігається в localStorage
   - При повторному відвідуванні банер не з'являється

4. **Перевірте Google Analytics:**
   - Відкрийте Developer Tools → Console
   - При прийнятті cookies ви побачите: `✅ Cookies accepted`
   - При відхиленні: `❌ Cookies rejected`

## 🛠️ Керування

### Глобальні функції (для тестування)

У консолі браузера доступні:

```javascript
// Показати банер знову
window.showCookieBanner()

// Утиліти для керування cookies
window.cookieUtils.getCookieConsent()
window.cookieUtils.resetCookieConsent()
window.cookieUtils.trackEvent('test_event', { value: 1 })
```

### Відстеження подій

```javascript
import { trackEvent } from '@/lib/cookies';

// Відстежити подію (спрацює тільки якщо дозволені analytics cookies)
trackEvent('contact_form_submitted', {
  form_type: 'quote_request',
  value: 1
});
```

## 📋 Особливості

### ✅ Що реалізовано:

1. **GDPR Compliance:**
   - Cookies заборонені за замовчуванням
   - Явна згода користувача
   - Можливість відкликати згоду

2. **Google Consent Mode v2:**
   - Правильна ініціалізація
   - Динамічне оновлення згоди
   - Підтримка всіх категорій cookies

3. **UX/UI:**
   - Адаптивний дизайн
   - Плавні анімації
   - Мультимовність (ES/EN)
   - Сучасний дизайн

4. **Технічні аспекти:**
   - TypeScript підтримка
   - localStorage для збереження
   - Event-driven архітектура
   - Утиліти для розробників

### 🔧 Налаштування

Всі тексти можна змінити в файлі `src/hooks/useLanguage.tsx` в секції `// Cookie Consent`.

### 🎨 Стилізація

Банер використовує Tailwind CSS класи та підтримує темну/світлу тему.

## 📊 Моніторинг

1. **Google Analytics Real-time:**
   - Перевірте чи надходять дані в реальному часі

2. **Google Search Console:**
   - Переконайтеся що сайт правильно індексується

3. **Browser DevTools:**
   - Перевірте Network tab на наявність GA запитів
   - Console для логів consent mode

## 🔒 Конфіденційність

- Тільки essential cookies працюють без згоди
- Analytics та marketing cookies блокуються до згоди
- IP адреси анонімізуються
- Підтримка Do Not Track

## 📱 Мобільна версія

Банер повністю адаптований для мобільних пристроїв з зручним інтерфейсом.

---

**Примітка:** Не забудьте замінити `GA_MEASUREMENT_ID` на ваш реальний ID перед запуском в продакшені!

