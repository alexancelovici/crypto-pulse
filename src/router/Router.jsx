import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import CoinChartPage from "../pages/CoinChartPage";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "../components/Navbar";

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/coin/:id" element={<DetailPage />} />
      <Route path="/chart/:id" element={<CoinChartPage />} /> {/* ✅ Nueva ruta */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

