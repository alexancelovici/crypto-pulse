import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import useFetchCoinHistory from '../hooks/useFetchCoinHistory';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const CoinChartPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');

  const { historyData, loading, error } = useFetchCoinHistory(id, startDate, endDate);

  const chartData = historyData
    ? {
        labels: historyData.map((item) => {
          const date = new Date(item[0]);
          return date.toLocaleDateString();
        }),
        datasets: [
          {
            label: `Precio de ${id} en USD`,
            data: historyData.map((item) => item[1]),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
        ],
      }
    : null;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Historial de precios: {id}</h1>
      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      {loading && <p className="text-center">Cargando datos...</p>}
      {error && <p className="text-center text-red-500">Error al obtener datos históricos.</p>}
      {!loading && !error && chartData && <Line data={chartData} />}
    </div>
  );
};

export default CoinChartPage;
