import React, { useState } from 'react';
import { Target } from '@/lib/types';

interface TargetTableProps {
  chartData: Target[];
  isDarkMode: boolean;
}

const TargetTable: React.FC<TargetTableProps> = ({ chartData, isDarkMode }) => {
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editableData, setEditableData] = useState<Target[]>(chartData);

  // Handle input changes for the editable data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: keyof Target) => {
    const newData = editableData.map((target) =>
      target.id === id ? { ...target, [field]: e.target.value } : target
    );
    setEditableData(newData);
  };

  // Function to save the modified data
  const handleSave = async (id: number) => {
    const targetToUpdateIndex = editableData.findIndex((target) => target.id === id);

    if (targetToUpdateIndex !== -1) {
      const updatedTarget = {
        ...editableData[targetToUpdateIndex],
        lastUpdated: new Date().toISOString(), // Update the "lastUpdated" field to the current date
      };

      const updatedData = [...editableData];
      updatedData[targetToUpdateIndex] = updatedTarget;

      setEditableData(updatedData);

      try {
        const res = await fetch('/api/targets', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (res.ok) {
          console.log('Target updated successfully');
          setEditRowId(null); // Exit editing mode
        } else {
          console.error('Failed to update target');
        }
      } catch (error) {
        console.error('Error saving the target:', error);
      }
    }
  };

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
            <th className={`py-2 px-4 border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((target) => (
            <tr key={target.id} className={`border-b ${isDarkMode ? 'border-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}>
              <td className="py-2 px-4">
                {editRowId === target.id ? (
                  <input
                    type="text"
                    value={target.name}
                    onChange={(e) => handleInputChange(e, target.id, 'name')}
                    className={`w-full border p-1 rounded ${
                      isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                ) : (
                  target.name
                )}
              </td>
              <td className="py-2 px-4">
                {editRowId === target.id ? (
                  <input
                    type="text"
                    value={target.description}
                    onChange={(e) => handleInputChange(e, target.id, 'description')}
                    className={`w-full border p-1 rounded ${
                      isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                ) : (
                  target.description
                )}
              </td>
              <td className="py-2 px-4">
                {editRowId === target.id ? (
                  <input
                    type="text"
                    value={target.markets.join(', ')}
                    onChange={(e) => handleInputChange(e, target.id, 'markets')}
                    className={`w-full border p-1 rounded ${
                      isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                    }`}
                  />
                ) : (
                  target.markets.join(', ')
                )}
              </td>
              <td className="py-2 px-4">
                {new Date(target.lastUpdated).toLocaleDateString('en-GB')}
              </td>
              <td className="py-2 px-4">
                {editRowId === target.id ? (
                  <button
                    onClick={() => handleSave(target.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditRowId(target.id)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TargetTable;
