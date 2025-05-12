# 💸 CryptoPulse

**CryptoPulse** es una aplicación web construida con **React + Vite + TailwindCSS** que permite visualizar información de las criptomonedas más populares, incluyendo detalles actualizados y un gráfico histórico de precios.

---

## 🚀 Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## 🎯 Funcionalidades principales

- 📈 Visualización de criptomonedas populares y su precio en tiempo real
- 🪙 Página de detalle con descripción e imagen de cada moneda
- 📊 Gráfico histórico interactivo con selección de rangos
- 🔄 Refetch automático al entrar a la Home
- 🚫 Manejo de errores con páginas amigables (ErrorBoundary)
- 📱 Diseño responsive con TailwindCSS

---

## 🧠 Aprendizajes destacados

- Consumo de APIs con `axios`
- Hooks personalizados (`useFetchCoins`, `useFetchCoinDetail`, `useFetchCoinHistory`)
- Manejo de estados con `useState`, `useEffect`
- Enrutamiento con `react-router-dom`
- Visualización de datos con Chart.js
- Manejo de errores con componentes de fallback

---

## 🛠 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/alexancelovici/crypto-pulse.git
Instala las dependencias y ejecuta en local:

bash
Copy
Edit
cd crypto-pulse
npm install
npm run dev

---

## 🔗 Despliegue

El proyecto está desplegado con **Netlify** en la siguiente URL:

👉 [https://effortless-panda-51cfeb.netlify.app](https://effortless-panda-51cfeb.netlify.app)

✅ Incluye soporte para Single Page Application (SPA) mediante archivo `_redirects`.

---

## 📁 Estructura del proyecto

src/
├── components/ # Navbar y componentes reutilizables
├── hooks/ # Hooks personalizados para datos
├── pages/ # Vistas principales (Home, Detalle, Gráfico)
├── router/ # Definición de rutas
├── App.jsx # Componente principal
└── main.jsx # Punto de entrada

public/
└── _redirects # Regla para SPA en Netlify

yaml
Copy
Edit

---

## 👨‍💻 Autor

Proyecto desarrollado por [@alexancelovici](https://github.com/alexancelovici) como parte del Bootcamp Fullstack 💻

