
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartOptions } from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const data = {
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  datasets: [
    {
      label: 'Activity',
      data: [100, 120, 150, 170, 190, 130, 160, 110, 290, 360, 380, 400],
      backgroundColor: '#2a8beb',
      borderRadius: 10,
      barThickness: 15,
      maxBarThickness: 20,
      minBarLength: 2,
    },
  ],
};

const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#9ca3af',
        font: {
          family: 'Arial',
          size: 12,
        },
      },
    },
    y: {
      max: 400,
      grid: {
        display: false,
      },
      ticks: {
        color: '#000',
        font: {
          family: 'Arial',
          size: 12,
        },
        stepSize: 100,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Activity',
      align: 'start',
      font: {
        family: 'Arial',
        size: 16,
        weight: 'bold',
      },
      color: '#4D4D4D',
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  },
};

export function BarChart() {
  return <Bar data={data} options={options} />;
}
