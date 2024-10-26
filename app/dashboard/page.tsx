'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BarChart from '@/components/BarChart';
import TargetTable from '@/components/TargetTable';
import { Target } from '@/lib/types';
import DisplayModeToggle from '@/components/DisplayModeToggle';
import Loading from '@/components/Loading';

export default function Dashboard() {
  const componentName = 'DASHBOARD';
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pipelineStatuses, setPipelineStatuses] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTargets() {
      try {
        // Added artificial delay of 1 second to stimulate laoding
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetch('/api/targets');
        const data: Target[] = await res.json();

        setTargets(data);
        setLoading(false);

        const statuses: string[] = Array.from(
          new Set(
            data.map((target: Target) => target.pipelineStatus || 'Unknown')
          )
        );
        setPipelineStatuses(statuses);
      } catch (error) {
        console.error('Error fetching targets:', error);
        setLoading(false);
      }
    }

    fetchTargets();
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  // Filter data by pipeline status
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
    );
  }

  return (
    <div
      className={`${componentName}_MAIN_CONTAINER p-4 md:p-8 min-h-screen transition-colors duration-300`}
    >
      <div className='fixed right-4 bottom-12 z-[100] grid gap-4'>
        <DisplayModeToggle onToggle={handleModeToggle} />
        <Link
          href='/'
          passHref
          className='btn'
          aria-label='Go Home'
        >
          🏠
        </Link>
      </div>
      <div className='max-w-4xl mx-auto text-center space-y-6'>
        <div className='mb-8'>
          <h1>Target Management Dashboard</h1>
          <h2>Monitor and analyze acquisition targets easily</h2>
        </div>
        <div className='flex justify-center space-x-6'>
          <div className='flex flex-col md:flex-row gap-2 items-center'>
            <label htmlFor='filter'>
              <p>Filter by Status:</p>
            </label>
            <select
              id='filter'
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2`}
            >
              <option value=''>All</option>
              {pipelineStatuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bar Chart Component*/}
        <div className='mt-8'>
          <BarChart
            chartData={filteredData}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Target Table Component*/}
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
