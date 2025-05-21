import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorDia = ({ dias, totales_por_dia }) => {
  const data = {
    labels: dias,
    datasets: [
      {
        label: 'Ventas por Día',
        data: totales_por_dia,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
        text: 'Ventas Totales por Día',
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
          text: 'Días',
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

export default VentasPorDia;
