import React from 'react';

const Loading = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin ${
            isDarkMode ? 'border-gray-200' : 'border-gray-800'
          }`}
        ></div>
        <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
