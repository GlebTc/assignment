import React, { useState, useEffect } from 'react';
import { Target } from '@/lib/types';

interface TargetTableProps {
  chartData: Target[];
  isDarkMode: boolean;
}

const TargetTable: React.FC<TargetTableProps> = ({ chartData, isDarkMode }) => {
  const [editableData, setEditableData] = useState<Target[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [previousData, setPreviousData] = useState<Target | null>(null);

  useEffect(() => {
    const sortedData = [...chartData].sort(
      (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    setEditableData(sortedData);
  }, [chartData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: keyof Target) => {
    const newData = editableData.map((target) =>
      target.id === id ? { ...target, [field]: e.target.value } : target
    );
    setEditableData(newData);
  };

  const handleSave = async (id: number) => {
    const targetToUpdateIndex = editableData.findIndex((target) => target.id === id);

    if (targetToUpdateIndex !== -1) {
      const updatedTarget = {
        ...editableData[targetToUpdateIndex],
        lastUpdated: new Date().toISOString(),
      };

      const updatedData = [
        updatedTarget,
        ...editableData.filter((_, index) => index !== targetToUpdateIndex),
      ].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

      setEditableData(updatedData);
      setEditRowId(null);

      try {
        const res = await fetch('/api/targets', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (!res.ok) {
          console.error('Failed to update target');
        }
      } catch (error) {
        console.error('Error saving the target:', error);
      }
    }
  };

  const handleCancel = () => {
    if (previousData) {
      setEditableData((data) =>
        data.map((target) => (target.id === previousData.id ? previousData : target))
      );
    }
    setEditRowId(null);
    setPreviousData(null);
  };

  const startEditing = (target: Target) => {
    setPreviousData({ ...target });
    setEditRowId(target.id);
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
            <th className="py-2 px-4 border-b border-[var(--foreground)]">Name</th>
            <th className="py-2 px-4 border-b border-[var(--foreground)]">Description</th>
            <th className="py-2 px-4 border-b border-[var(--foreground)]">Markets</th>
            <th className="py-2 px-4 border-b border-[var(--foreground)]">Pipeline Status</th>
            <th className="py-2 px-4 border-b border-[var(--foreground)]">Last Updated</th>
            <th className="py-2 px-4 border-b border-[var(--foreground)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((target) => (
            <tr key={target.id} className="border-b border-[var(--foreground)]">
              <td className="py-2 px-4">
                {editRowId === target.id ? (
                  <input
                    type="text"
                    value={target.name}
                    onChange={(e) => handleInputChange(e, target.id, 'name')}
                    size={target.name.length || 1} // Adjust input size to text length
                    className="w-full border p-1 rounded"
                    style={{ minWidth: '100%' }} // Ensure input takes full cell width
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
                    size={target.description.length || 1}
                    className="w-full border p-1 rounded"
                    style={{ minWidth: '100%' }}
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
                    size={target.markets.join(', ').length || 1}
                    className="w-full border p-1 rounded"
                    style={{ minWidth: '100%' }}
                  />
                ) : (
                  target.markets.join(', ')
                )}
              </td>
              <td className="py-2 px-4">
                {editRowId === target.id ? (
                  <input
                    type="text"
                    value={target.pipelineStatus || 'Unknown'}
                    onChange={(e) => handleInputChange(e, target.id, 'pipelineStatus')}
                    size={(target.pipelineStatus || 'Unknown').length || 1}
                    className="w-full border p-1 rounded"
                    style={{ minWidth: '100%' }}
                  />
                ) : (
                  target.pipelineStatus || 'Unknown'
                )}
              </td>
              <td className="py-2 px-4">
                {new Date(target.lastUpdated).toLocaleDateString('en-US')}
              </td>
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                  {editRowId === target.id ? (
                    <>
                      <button
                        onClick={() => handleSave(target.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(target)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TargetTable;
