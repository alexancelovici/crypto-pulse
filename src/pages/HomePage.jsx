import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchCoins from "../hooks/useFetchCoins";

const HomePage = () => {
  const { coins, loading, refetch } = useFetchCoins();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p className="text-center mt-10">Cargando monedas...</p>;

  if (coins.length === 0) {
    return (
      <div className="text-center mt-10 text-red-600 font-bold">
        ❌ No se encontraron monedas.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Monedas Populares</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {coins.map((coin) => (
          <div key={coin.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-200 cursor-pointer text-center">
            <img
              src={coin.image}
              alt={coin.name}
              className="h-12 w-12 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-blue-600">{coin.name}</h2>
            <p className="text-sm text-gray-500">
              ${coin.current_price.toLocaleString()}
            </p>

            {/* Botón a detalles */}
            <Link to={`/coin/${coin.id}`} className="block mt-2 text-blue-500 underline text-sm">
              Ver detalles
            </Link>

            {/* Botón a gráfico */}
            <Link to={`/chart/${coin.id}`} className="block text-purple-600 underline text-sm mt-1">
              Ver gráfico
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

