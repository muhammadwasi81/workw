import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: true,
        text: 'Activity',
        position: 'top',
        align: 'start',
        color: '#526bb1',
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'This week',
        data: [33, 53, 85, 41, 44, 65, 1],
        borderColor: '#526bb1',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#526bb1',
        pointHoverBackgroundColor: '#526bb1',
        pointHoverBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} height={100} />
    </div>
  );
}

export default Chart;
