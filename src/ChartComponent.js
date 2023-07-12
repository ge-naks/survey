import React from 'react';
import { Line } from 'react-chartjs-2';

function generateT(dT, z) {
  const t = [];
  for (let i = 0; i < z; i++) {
    t[i] = i * dT;
  }
  return t;
}

function gaussianRandom(mean, stdev) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

function generateX(dT, z, initialWealth, a, b) {
  const x = [];
  x[0] = initialWealth;
  for (let i = 1; i < z; i++) {
    const dW = gaussianRandom(0, Math.sqrt(dT));
    const dX = a * dT + b * dW;
    x[i] = x[i - 1] + dX;
  }
  return x;
}

function ChartComponent({ dT, z, initialWealth, a, b }) {
  const x = generateX(dT, z, initialWealth, a, b);
  const t = generateT(dT, z);

  const data = {
    labels: t,
    datasets: [
      {
        label: 'Wealth',
        data: x,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: .3,
        pointRadius: 0
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
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      x: {
        type: 'linear',
        ticks: {
          stepSize: 50, // Set the x-axis step size
        },
      },
    },
  };
  return <Line data={data} options={options} />;
}

export default ChartComponent;
