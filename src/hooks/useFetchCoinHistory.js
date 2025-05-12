import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCoinHistory = (coinId, startDate, endDate) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId || !startDate || !endDate) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const fromTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
        const toTimestamp = Math.floor(new Date(endDate).getTime() / 1000);
        const now = Math.floor(Date.now() / 1000);

        if (fromTimestamp >= toTimestamp) {
          throw new Error('La fecha de inicio debe ser anterior a la fecha de fin.');
        }
        if (fromTimestamp >= now || toTimestamp > now) {
          throw new Error('No se pueden usar fechas futuras.');
        }

        console.log(`Fetching: ${coinId} from ${fromTimestamp} to ${toTimestamp}`);

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`,
          {
            params: {
              vs_currency: 'usd',
              from: fromTimestamp,
              to: toTimestamp,
            },
          }
        );

        if (!response.data.prices || response.data.prices.length === 0) {
          throw new Error('No hay datos disponibles para el rango seleccionado.');
        }

        setHistoryData(response.data.prices);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al obtener datos históricos.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [coinId, startDate, endDate]);

  return { historyData, loading, error };
};

export default useFetchCoinHistory;
