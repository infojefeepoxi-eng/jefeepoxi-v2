# 🎨 JefeEpoxi AI Floor Visualizer Server

AI сервер для генерації епоксидних підлог на базі OpenAI gpt-image-1.

## 🌟 Особливості

- ✅ **Без timeout лімітів** - працює на власному VPS
- ✅ **gpt-image-1** - найкраща якість від OpenAI
- ✅ **Multi-image support** - підтримка референсних зображень
- ✅ **PM2** - автоматичний перезапуск та моніторинг
- ✅ **Nginx** - reverse proxy з великими timeout

## 📦 Структура проекту

```
hetzner-ai-server/
├── server.js              # Express сервер з OpenAI API
├── package.json           # Залежності Node.js
├── ecosystem.config.js    # Конфігурація PM2
├── env.example            # Приклад змінних середовища
├── DEPLOY_INSTRUCTIONS.md # Детальна інструкція по деплою
└── README.md              # Цей файл
```

## 🚀 Швидкий старт

### 1. Завантажте файли на VPS

```bash
scp -r hetzner-ai-server root@91.98.74.36:/var/www/
```

### 2. Підключіться до VPS

```bash
ssh root@91.98.74.36
cd /var/www/hetzner-ai-server
```

### 3. Встановіть залежності

```bash
npm install
```

### 4. Створіть .env файл

```bash
nano .env
```

Вставте:
```
OPENAI_API_KEY=your_key_here
PORT=3000
```

### 5. Запустіть сервер

```bash
pm2 start ecosystem.config.js
pm2 save
```

### 6. Налаштуйте Nginx

Див. `DEPLOY_INSTRUCTIONS.md` для детальної інструкції.

## 📡 API Endpoints

### POST /api/ai-visualizer

Генерує нове зображення з епоксидною підлогою.

**Request:**
```json
{
  "roomImageBase64": "data:image/png;base64,...",
  "referenceImageBase64": "data:image/png;base64,...",  // опціонально
  "prompt": "Piso epoxi metalizado gris con acabado satinado"
}
```

**Response:**
```json
{
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### GET /health

Перевірка статусу сервера.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-06T18:30:00.000Z"
}
```

## 🔧 Налаштування

### Змінні середовища

- `OPENAI_API_KEY` - API ключ OpenAI (обов'язково)
- `PORT` - Порт сервера (за замовчуванням: 3000)

### PM2 команди

```bash
pm2 status              # Статус
pm2 logs jefeepoxi-ai   # Логи
pm2 restart jefeepoxi-ai # Перезапуск
pm2 stop jefeepoxi-ai   # Зупинка
pm2 monit               # Моніторинг
```

## 🌐 Frontend інтеграція

Оновіть `src/pages/AiFloorVisualizer.tsx`:

```typescript
const API_URL = import.meta.env.PROD 
  ? 'http://91.98.74.36/api/ai-visualizer'
  : '/.netlify/functions/ai-visualizer';

const res = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    roomImageBase64,
    referenceImageBase64,
    prompt
  })
});
```

## 📊 Моніторинг

### Логи сервера
```bash
pm2 logs jefeepoxi-ai --lines 100
```

### Логи Nginx
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Використання ресурсів
```bash
pm2 monit
htop
```

## 🔒 Безпека

- ✅ API ключ зберігається в .env (не в коді)
- ✅ CORS налаштовано тільки для вашого домену
- ✅ Firewall дозволяє тільки необхідні порти
- ⚠️ Рекомендується додати SSL сертифікат

## 💰 Вартість

- **Hetzner VPS CX22:** €4.50/міс
- **OpenAI API:** ~$0.04 за генерацію (dall-e-2) або ~$0.08 (dall-e-3)
- **Загалом:** ~€5-10/міс залежно від використання

## 🆘 Troubleshooting

### Сервер не запускається
```bash
pm2 logs jefeepoxi-ai --err
node server.js  # Запустити напряму для дебагу
```

### Timeout помилки
Перевірте Nginx конфігурацію:
```bash
nano /etc/nginx/sites-available/ai-jefeepoxi
# Переконайтеся що proxy_read_timeout = 300s
```

### OpenAI помилки
Перевірте API ключ:
```bash
cat .env
# Переконайтеся що OPENAI_API_KEY правильний
```

## 📚 Додаткові ресурси

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference/images)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Hetzner Cloud Docs](https://docs.hetzner.com/cloud/)

## 📝 Ліцензія

Приватний проект JefeEpoxi

---

**Створено для:** JefeEpoxi - Pavimentos Epoxy Profesionales Valencia  
**VPS:** Hetzner CX22 (91.98.74.36)  
**Версія:** 1.0.0


