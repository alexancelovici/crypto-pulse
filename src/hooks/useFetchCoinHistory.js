import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCoinHistory = (coinId, days) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId || !days) return;

    const controller = new AbortController();

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: { vs_currency: "usd", days },
            signal: controller.signal,
          }
        );

        if (!response.data.prices || response.data.prices.length === 0) {
          throw new Error("No hay datos disponibles para el rango seleccionado.");
        }

        setHistoryData(response.data.prices);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error(err);
        setError(err.message || "Error al obtener datos históricos.");
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    return () => controller.abort();
  }, [coinId, days]);

  return { historyData, loading, error };
};

export default useFetchCoinHistory;
