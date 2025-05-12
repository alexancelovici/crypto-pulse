# 💸 CryptoPulse

**CryptoPulse** es una aplicación web construida con **React + Vite + TailwindCSS** que permite visualizar información de las criptomonedas más populares, incluyendo sus detalles actuales y un gráfico histórico de precios.

## 🚀 Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [CoinGecko API](https://www.coingecko.com/en/api)

## 🎯 Funcionalidades

- 📈 Visualización de criptomonedas populares y su precio en tiempo real.
- 🪙 Página de detalle con descripción e imagen de la moneda.
- 📊 Gráfico histórico interactivo por rango de fechas.
- ✅ Manejo de errores y redirecciones amigables.
- 🔄 Refetch automático al entrar a la Home.
- 📱 Diseño responsive con TailwindCSS.

## 🧠 Aprendizajes

- Consumo de APIs públicas con `axios`
- Manejo de estados con `useState` y efectos con `useEffect`
- Navegación entre páginas con `React Router`
- Custom hooks (`useFetchCoins`, `useFetchCoinDetail`, `useFetchCoinHistory`)
- Visualización de datos con Chart.js
- Uso de `ErrorBoundary` para errores de renderizado

## 🛠 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/alexancelovici/crypto-pulse.git
Instala las dependencias:

bash
Copy
Edit
cd crypto-pulse
npm install
Corre el proyecto en local:

bash
Copy
Edit
npm run dev
🔗 Despliegue
El proyecto está desplegado con Netlify en la siguiente URL:

👉 https://crypto-pulse.netlify.app ← (actualiza esta URL si es diferente a la tuya real)

📁 Estructura del proyecto
bash
Copy
Edit
src/
├── components/         # Navbar y componentes reutilizables
├── hooks/              # Hooks personalizados para datos
├── pages/              # Páginas principales (Home, Detalle, Gráfico)
├── router/             # Definición de rutas
├── App.jsx             # Componente principal
└── main.jsx            # Entrada de la app
👨‍💻 Autor
Proyecto desarrollado por @alexancelovici como parte del Bootcamp Fullstack 💻

