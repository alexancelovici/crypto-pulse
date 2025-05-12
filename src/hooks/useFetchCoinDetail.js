import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCoinDetail = (id) => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoin(res.data);
      } catch (err) {
        console.error("Error al obtener detalles:", err);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { coin, loading };
};

export default useFetchCoinDetail;

