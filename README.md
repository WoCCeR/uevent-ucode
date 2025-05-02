# UEvent

UEvent — це веб-додаток для купівлі квитків на події. Він включає сучасний фронтенд на React та бекенд на Node.js з використанням бази даних MySQL та інтеграцією Stripe для оплати.

## 🔧 Стек технологій

- **Frontend**: React, Axios, React Router, Stripe.js, TailwindCSS (або інший CSS фреймворк)
- **Backend**: Node.js, Express, Sequelize (ORM для MySQL)
- **База даних**: MySQL
- **Інтеграції**: Stripe (оплата), AdminJS (адмін-панель)
- **Аутентифікація**: JWT

## 📁 Структура проєкту
uevent/
├── uevent-frontend/ # Фронтенд на React
├── uevent-backend/ # Бекенд на Node.js
├── README.md # Документація проєкту

## ⚙️ Налаштування середовища

### 1. Backend (`uevent-backend`)

Створи файл `.env` у корені бекенду:

```dotenv
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

CLIENT_URL=http://localhost:5173
PORT=3000
API_URL=http://localhost:3000

DB_USER=
DB_PASS=
DB_HOST=localhost
STRIPE_PRIVATE_KEY=
STRIPE_SESSION_EXPIRE_TIME=7d
STRIPE_SUCCESS_URL=http://localhost:5173/payment-success
STRIPE_CANCEL_URL=http://localhost:5173/payment-cancelled
JWT_ACCESS_SECRET_KEY=
JWT_REFRESH_SECRET_KEY=

```
Після створення .env:


npm install

## 2. Frontend (client)
   Створи файл .env у папці client:

# Запуск проєкту

Запусти бекенд:

cd uevent-backend
```npm start```

Запусти фронтенд:

bash
cd client
```npm run dev```

Основні можливості
Перегляд подій

Покупка квитків

Аутентифікація користувача

Інтеграція з базою даних MySQL через Sequelize

🧪 Рекомендації
Перевір, що база даних запущена і таблиці створені (можна вручну або через Sequelize sync).

Переконайся, що всі змінні .env правильно заповнені.

## 🛑 Зупинка
Щоб зупинити додаток, натисни Ctrl + C в обох терміналах (клієнт і сервер).
