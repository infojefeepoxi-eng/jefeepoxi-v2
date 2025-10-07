# 🚀 Інструкції по деплою AI сервера на Hetzner VPS

## 📋 Передумови

- VPS: **CX22** на Hetzner (91.98.74.36)
- OS: Ubuntu 22.04
- SSH доступ до сервера

---

## 🔧 Крок 1: Підключення до VPS

```bash
ssh root@91.98.74.36
```

---

## 📦 Крок 2: Встановлення Node.js

```bash
# Оновлення системи
apt update && apt upgrade -y

# Встановлення Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Перевірка версії
node -v  # Має бути v20.x.x
npm -v   # Має бути v10.x.x
```

---

## 🌐 Крок 3: Встановлення Nginx

```bash
apt install -y nginx

# Перевірка статусу
systemctl status nginx
```

---

## 📁 Крок 4: Завантаження коду на сервер

### Варіант A: Через Git (рекомендовано)

```bash
# Встановлення Git
apt install -y git

# Клонування репозиторію (якщо є)
cd /var/www
git clone https://github.com/your-repo/jefeepoxi-ai-server.git
cd jefeepoxi-ai-server
```

### Варіант B: Через SCP (з вашого комп'ютера)

```bash
# На вашому комп'ютері (Windows PowerShell)
cd "C:\Users\DC\download_site\Site -Jefe epoxi\jefeepoxi-main\jefeepoxi-main – 1"
scp -r hetzner-ai-server root@91.98.74.36:/var/www/
```

Потім на сервері:
```bash
cd /var/www/hetzner-ai-server
```

---

## 🔑 Крок 5: Налаштування змінних середовища

```bash
# Створення .env файлу
nano .env
```

Вставте:
```
OPENAI_API_KEY=your-openai-api-key-here
PORT=3001
```

Збережіть: `Ctrl+X`, потім `Y`, потім `Enter`

---

## 📦 Крок 6: Встановлення залежностей

```bash
npm install
```

---

## 🔄 Крок 7: Встановлення PM2 (для автозапуску)

```bash
npm install -g pm2

# Запуск сервера
pm2 start ecosystem.config.js

# Автозапуск при перезавантаженні
pm2 startup
pm2 save

# Перевірка статусу
pm2 status
pm2 logs jefeepoxi-ai
```

---

## 🌐 Крок 8: Налаштування Nginx

```bash
nano /etc/nginx/sites-available/ai-jefeepoxi
```

Вставте:
```nginx
server {
    listen 80;
    server_name 91.98.74.36;

    location /api/ai-visualizer {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Збільшуємо timeout для AI генерації
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    location /health {
        proxy_pass http://localhost:3001;
    }
}
```

Активуйте конфігурацію:
```bash
ln -s /etc/nginx/sites-available/ai-jefeepoxi /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 🔥 Крок 9: Налаштування Firewall

```bash
# Дозволити HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
ufw status
```

---

## ✅ Крок 10: Тестування

```bash
# Перевірка health endpoint
curl http://91.98.74.36/health

# Має повернути: {"status":"ok","timestamp":"..."}
```

---

## 🔒 Крок 11 (Опціонально): SSL сертифікат

```bash
# Встановлення Certbot
apt install -y certbot python3-certbot-nginx

# Отримання SSL (потрібен домен)
# certbot --nginx -d ai.jefeepoxi.com
```

---

## 📊 Корисні команди PM2

```bash
pm2 status              # Статус всіх процесів
pm2 logs jefeepoxi-ai   # Логи сервера
pm2 restart jefeepoxi-ai # Перезапуск
pm2 stop jefeepoxi-ai   # Зупинка
pm2 delete jefeepoxi-ai # Видалення
pm2 monit               # Моніторинг в реальному часі
```

---

## 🎯 Наступний крок

Після успішного деплою, оновіть frontend для використання нового API:

```typescript
// src/pages/AiFloorVisualizer.tsx
const res = await fetch('http://91.98.74.36/api/ai-visualizer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    roomImageBase64: roomImage,
    referenceImageBase64: referenceImage,
    prompt
  })
});
```

---

## 🆘 Troubleshooting

### Сервер не запускається:
```bash
pm2 logs jefeepoxi-ai --lines 100
```

### Nginx помилки:
```bash
tail -f /var/log/nginx/error.log
```

### Перевірка портів:
```bash
netstat -tulpn | grep 3000
```

---

## ✅ Готово!

Тепер AI генерація працює на вашому Hetzner VPS без timeout лімітів! 🎉


