import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Target } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData, isDarkMode }: { chartData: Target[], isDarkMode: boolean }) => {
  const pipelineStatusCounts = chartData.reduce((acc, target) => {
    const status = target.pipelineStatus || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(pipelineStatusCounts),
    datasets: [
      {
        label: 'Number of Targets',
        data: Object.values(pipelineStatusCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: '#36a2eb',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: '#36a2eb',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#f5f5f5' : '#171717', // Adjust text color based on theme
        },
      },
      title: {
        display: true,
        text: 'Number of Acquisition Targets by Pipeline Status',
        color: isDarkMode ? '#f5f5f5' : '#171717', // Adjust title color based on theme
        font: {
          size: 18,
        },
      },
      tooltip: {
        bodyColor: isDarkMode ? '#f5f5f5' : '#171717',
        backgroundColor: isDarkMode ? '#333333' : '#ffffff', // Adjust tooltip background
        titleColor: isDarkMode ? '#f5f5f5' : '#171717',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#f5f5f5' : '#171717', // X-axis text color
        },
        grid: {
          display: false, // Hide grid lines
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#f5f5f5' : '#171717', // Y-axis text color
        },
        grid: {
          display: false, // Hide grid lines
        },
      },
    },
  };

  return (
    <div
      className={`relative h-96 w-full p-4 shadow-md rounded-lg ${
        isDarkMode ? 'bg-gray-900 border border-gray-700 shadow-xl' : 'bg-white border border-gray-300 shadow-lg'
      } transition-shadow duration-300`}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
