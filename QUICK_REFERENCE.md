# ⚡ **Швидкий довідник - Cookie Consent & GA4**

## 🔧 **Основні кроки налаштування**

### 1️⃣ **Створити GA4 аккаунт**
- Перейти на [analytics.google.com](https://analytics.google.com/)
- Створити Property для `Jefeepoxy`
- Скопіювати **Measurement ID** (формат: `G-XXXXXXXXXX`)

### 2️⃣ **Замінити ID в коді**
```html
<!-- В файлі index.html замінити обидва місця: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-REAL-ID"></script>
<!-- та -->
gtag('config', 'G-YOUR-REAL-ID', {
```

### 3️⃣ **Запустити та протестувати**
```bash
npm run dev
# Відкрити в інкогніто: http://localhost:8080
```

---

## 🧪 **Швидке тестування**

### Команди в консолі браузера:
```javascript
// Показати банер знову
window.showCookieBanner()

// Перевірити стан згоди
window.cookieUtils.getCookieConsent()

// Скинути все
window.cookieUtils.resetCookieConsent()

// Тестова подія
window.cookieUtils.trackEvent('test', {value: 1})
```

### Що перевіряти:
1. **Банер з'являється** через 1 секунду
2. **Кнопки працюють** (зелена/сіра)
3. **Вибір зберігається** в localStorage
4. **GA отримує дані** в Real-time (1-5 хв)

---

## 📊 **Перевірка в Google Analytics**

### Real-time (миттєво):
- `Reports → Realtime → Overview`
- Повинні з'явитися активні користувачі

### Events (30 хв):
- `Reports → Engagement → Events`
- Події: `page_view`, `session_start`

### Audience (24 год):
- `Reports → Demographic → Demographics Overview`
- Дані про користувачів з Іспанії

---

## ⚠️ **Якщо щось не працює**

### Банер не з'являється:
```javascript
localStorage.removeItem('cookie-consent')
window.location.reload()
```

### GA не отримує дані:
1. Перевірити Measurement ID
2. Відключити блокувачі реклами  
3. Натиснути "Aceptar todas"
4. Зачекати 5-10 хвилин

### Помилки в консолі:
- Перевірити що `window.gtag` існує
- Перевірити Network вкладку на запити до Google

---

## 📱 **Файли проекту**

- `src/components/CookieConsent.tsx` - основний банер
- `src/lib/cookies.ts` - утиліти управління
- `src/pages/PrivacyPolicy.tsx` - політика приватності
- `index.html` - Google Analytics код
- `TESTING_GUIDE.md` - детальне тестування
- `GA4_VERIFICATION.md` - перевірка аналітики

---

## 🎯 **Ключові метрики для Jefeepoxy**

### Конверсії для відстеження:
- **Запити на оцінку** (найважливіше)
- **Дзвінки по телефону**
- **WhatsApp повідомлення**
- **Перегляди проектів**

### Очікувані результати:
- **50-100 відвідувачів/день**
- **5-10 запитів/тиждень**
- **70%+ acceptance rate** cookies

---

## ✅ **Чекліст готовності**

- [ ] GA4 Measurement ID замінений
- [ ] Банер з'являється в інкогніто
- [ ] Кнопки працюють правильно
- [ ] Real-time показує дані
- [ ] Немає помилок в консолі
- [ ] Мобільна версія працює
- [ ] Мультимовність працює

**Готово! 🚀 Ваш сайт має професійну аналітику!**

