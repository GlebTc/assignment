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
    <div className={`p-4 md:p-8 min-h-screen transition-colors duration-300`}>
      {/* Fixed toggle button for dark mode */}
      <div className="fixed right-4 top-12 z-[100]">
        <DisplayModeToggle onToggle={handleModeToggle} />
      </div>

      {/* Main content section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Target Management Dashboard
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Monitor and analyze acquisition targets easily
          </p>
        </div>

        {/* Filter and additional controls */}
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label
              htmlFor="filter"
              className={`text-sm md:text-lg font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
            >
              Filter by Status:
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
        </div>

        {/* Bar Chart */}
        <div className="mt-8">
          <BarChart chartData={filteredData} isDarkMode={isDarkMode} />
        </div>

        {/* Target Table */}
        <div className="mt-8">
          <TargetTable chartData={filteredData} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}
