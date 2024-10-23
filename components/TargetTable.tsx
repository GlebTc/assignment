import React from 'react';
import { Target } from '@/lib/types';

interface TargetTableProps {
  chartData: Target[]; // The filtered data
  isDarkMode: boolean; // To toggle dark/light mode
}

const TargetTable: React.FC<TargetTableProps> = ({ chartData, isDarkMode }) => {
  return (
    <div
      className={`overflow-x-auto p-4 shadow-md rounded-lg ${
        isDarkMode ? 'bg-gray-900 border border-gray-700 shadow-xl' : 'bg-white border border-gray-300 shadow-lg'
      } transition-shadow duration-300`}
    >
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              Name
            </th>
            <th className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              Description
            </th>
            <th className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              Markets
            </th>
            <th className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((target) => (
            <tr key={target.id} className={`border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              <td className="py-2 px-4">{target.name}</td>
              <td className="py-2 px-4">{target.description}</td>
              <td className="py-2 px-4">{target.markets.join(', ')}</td>
              <td className="py-2 px-4">
                {new Date(target.lastUpdated).toLocaleDateString('en-GB')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TargetTable;
