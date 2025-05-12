import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetchCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = useCallback(() => {
    setLoading(true);
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coins:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCoins(); // fetch inicial
  }, [fetchCoins]);

  return { coins, loading, refetch: fetchCoins };
};

export default useFetchCoins;
