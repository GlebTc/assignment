'use client';
import { useState, useEffect } from 'react';
import BarChart from '@/components/BarChart';
import TargetTable from '@/components/TargetTable';
import targets from '@/data/targets.json';
import { Target } from '@/lib/types';
import DisplayModeToggle from '@/components/DisplayModeToggle';

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync dark mode toggle state
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  // Filter chartData based on the selected pipelineStatus
  const filteredData = filterStatus
    ? targets.filter((target: Target) => {
        const status = target.pipelineStatus || 'Unknown';
        return status === filterStatus;
      })
    : targets;

  const handleModeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  return (
    <div
      className={`p-8 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      } min-h-screen transition-colors duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Target Management Dashboard
          </h1>
          <p className="text-sm">
            Bar chart and target table should be added here on the same page
          </p>
        </div>

        {/* Right-side with toggle and filter next to each other */}
        <div className="flex space-x-4 items-center">
          {/* Filter Dropdown */}
          <div className="flex gap-4 items-center">
            <label
              htmlFor="filter"
              className={`text-lg font-medium ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              } mb-2`}
            >
              Filter by Status
            </label>
            <select
              id="filter"
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2`}
            >
              <option value="">All</option>
              <option value="Hot">Hot</option>
              <option value="Active">Active</option>
              <option value="Passed">Passed</option>
              <option value="Cold">Cold</option>
              <option value="Closed">Closed</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <DisplayModeToggle onToggle={handleModeToggle} />
        </div>
      </div>

      <div className="mt-8">
        {/* Pass the dark mode state to the BarChart */}
        <BarChart chartData={filteredData} isDarkMode={isDarkMode} />

        {/* Add the TargetTable below the chart */}
        <div className="mt-8">
          <TargetTable chartData={filteredData} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}
