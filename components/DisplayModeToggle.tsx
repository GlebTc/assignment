'use client';

import { useEffect, useState } from 'react';

export default function DisplayModeToggle({ onToggle }: { onToggle: (isDark: boolean) => void }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      onToggle(true); // Update the parent with dark mode
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      onToggle(false); // Update the parent with light mode
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
      onToggle(false); // Notify parent about light mode
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
      onToggle(true); // Notify parent about dark mode
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 px-4 bg-gray-300 dark:bg-gray-700 rounded-full shadow-md focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
