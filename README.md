# 💸 CryptoPulse

Live demo: https://effortless-panda-51cfeb.netlify.app

**CryptoPulse** is a web application built with **React + Vite + TailwindCSS** that lets users view information about popular cryptocurrencies, including updated details and historical price charts.

---

## 🚀 Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## 🎯 Main Features

- 📈 View popular cryptocurrencies and their real-time prices
- 🪙 Detail page with each coin's description and image
- 📊 Interactive historical chart with range selection
- 🔄 Automatic refetch when entering the Home page
- 🚫 Error handling with friendly pages through ErrorBoundary
- 📱 Responsive design with TailwindCSS

---

## 🧠 Key Learnings

- API consumption with `axios`
- Custom hooks (`useFetchCoins`, `useFetchCoinDetail`, `useFetchCoinHistory`)
- State management with `useState` and `useEffect`
- Routing with `react-router-dom`
- Data visualization with Chart.js
- Error handling with fallback components

---

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alexancelovici/crypto-pulse.git
   ```

2. Install dependencies and run locally:

   ```bash
   cd crypto-pulse
   npm install
   npm run dev
   ```

---

## 🔗 Deployment

The project is deployed with **Netlify** at the following URL:

👉 [https://effortless-panda-51cfeb.netlify.app](https://effortless-panda-51cfeb.netlify.app)

✅ Includes Single Page Application (SPA) support through the `_redirects` file.

---

## 📁 Project Structure

```text
src/
├── components/ # Navbar and reusable components
├── hooks/ # Custom data hooks
├── pages/ # Main views (Home, Detail, Chart)
├── router/ # Route definitions
├── App.jsx # Main component
└── main.jsx # Entry point

public/
└── _redirects # Netlify SPA rule
```

---

## 👨‍💻 Author

Project developed by [@alexancelovici](https://github.com/alexancelovici) as part of the Fullstack Bootcamp 💻
