import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorAnio = ({ anios, totales_por_anio }) => {
  const data = {
    labels: anios,
    datasets: [
      {
        label: 'Ventas por Año',
        data: totales_por_anio,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas Totales por Año',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total de ventas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Años',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default VentasPorAnio;
