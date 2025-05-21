import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorEmpleado = ({ empleados, totales_por_empleado }) => {
  // Validate inputs
  const validEmpleados = Array.isArray(empleados) && empleados.length > 0 ? empleados : ['No data'];
  const validTotales = Array.isArray(totales_por_empleado) && totales_por_empleado.length > 0 
    ? totales_por_empleado.map(val => (typeof val === 'number' ? val : 0)) 
    : [0];

  // Define chart data
  const data = {
    labels: validEmpleados,
    datasets: [
      {
        data: validTotales,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',   // Red
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 206, 86, 0.6)',   // Yellow
          'rgba(75, 192, 192, 0.6)',   // Teal
          'rgba(153, 102, 255, 0.6)',  // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: 'right',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const percentage = value / data.datasets[0].data.reduce((a, b) => a + b, 0) * 100;
                return {
                  text: `${label}: ${percentage.toFixed(1)}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                };
              });
            }
            return [];
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: C$${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Ventas por Empleado</Card.Title>
        {validEmpleados[0] === 'No data' ? (
          <div className="text-center text-muted">No hay datos disponibles</div>
        ) : (
          <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
            <Pie data={data} options={options} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;