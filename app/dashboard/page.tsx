'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BarChart from '@/components/BarChart';
import TargetTable from '@/components/TargetTable';
import { Target } from '@/lib/types';
import DisplayModeToggle from '@/components/DisplayModeToggle';
import Loading from '@/components/Loading';

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [targets, setTargets] = useState<Target[]>([]); // Dynamic data state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [pipelineStatuses, setPipelineStatuses] = useState<string[]>([]); 

  // Fetch data from the API with an artificial delay
  useEffect(() => {
    async function fetchTargets() {
      try {
        // Introduce an artificial delay of 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        const res = await fetch('/api/targets'); // Make sure your API route is set up as /api/targets
        const data: Target[] = await res.json();
  
        setTargets(data);
        setLoading(false);
  
        // Extract unique pipeline statuses and ensure the type is string[]
        const statuses: string[] = Array.from(new Set(data.map((target: Target) => target.pipelineStatus || 'Unknown')));
        setPipelineStatuses(statuses);
      } catch (error) {
        console.error('Error fetching targets:', error);
        setLoading(false);
      }
    }
  
    fetchTargets();
  
    // Sync dark mode toggle state
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

  if (loading) {
    return (
      <div>
        <Loading isDarkMode={isDarkMode} />
      </div>
    ); // Display loading while data is being fetched
  }

  return (
    <div className={`p-4 md:p-8 min-h-screen transition-colors duration-300`}>
      {/* Fixed toggle button for dark mode */}

      {/* Fixed home button at the bottom right */}
      <div className='fixed right-4 bottom-12 z-[100] grid gap-4'>
        <DisplayModeToggle onToggle={handleModeToggle} />

        <Link
          href='/'
          passHref
          className='flex items-center justify-center w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full shadow-md focus:outline-none hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors'
          aria-label='Go Home'
        >
          🏠
        </Link>
      </div>

      {/* Main content section */}
      <div className='max-w-4xl mx-auto text-center space-y-6'>
        <div className='mb-8'>
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Target Management Dashboard
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Monitor and analyze acquisition targets easily
          </p>
        </div>

        {/* Filter and additional controls */}
        <div className='flex justify-center space-x-6'>
          <div className='flex flex-col md:flex-row gap-2 items-center'>
            <label
              htmlFor='filter'
              className={`text-sm md:text-lg font-medium ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Filter by Status:
            </label>
            <select
              id='filter'
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2`}
            >
              <option value=''>All</option>
              {pipelineStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bar Chart */}
        <div className='mt-8'>
          <BarChart
            chartData={filteredData}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Target Table */}
        <div className='mt-8'>
          <TargetTable
            chartData={filteredData}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}
