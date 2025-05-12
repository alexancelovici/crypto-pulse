import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFetchCoinDetail from "../hooks/useFetchCoinDetail";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coin, loading } = useFetchCoinDetail(id);

  // 🔄 Redirigir si no hay moneda válida después de cargar
  useEffect(() => {
    if (!loading && !coin) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000); // redirecciona después de 3 segundos
      return () => clearTimeout(timeout);
    }
  }, [loading, coin, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Cargando detalles...</p>;
  }

  if (!coin) {
    return (
      <div className="text-center mt-10 text-red-600 font-bold">
        ❌ No se encontró la moneda solicitada.
        <p className="mt-2 text-sm text-gray-500">Redirigiendo al inicio...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{coin.name}</h1>
      <div className="text-center">
        <img src={coin.image?.large} alt={coin.name} className="w-24 mx-auto mb-4" />
        <p className="text-xl font-semibold text-green-600 mb-2">
          Precio actual: ${coin.market_data?.current_price?.usd.toLocaleString()}
        </p>
        <p
          className="text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              coin.description?.en?.split(". ")[0]?.concat(".") ||
              "Descripción no disponible.",
          }}
        />
      </div>
    </div>
  );
};

export default DetailPage;

