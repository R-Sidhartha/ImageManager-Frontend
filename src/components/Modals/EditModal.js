import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, onSave, fromImage }) => {
  const [newName, setNewName] = useState('');

  const handleSave = () => {
    onSave(newName);
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
      <div className={`bg-white p-4 rounded shadow-md ${fromImage ? 'md:w-1/3 w-2/3' : 'w-2/3'}`}>
        <h2 className="text-lg font-bold mb-2">Edit Name</h2>
        <input
          type="text"
          value={newName}
          placeholder='Enter new name'
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditModal;
