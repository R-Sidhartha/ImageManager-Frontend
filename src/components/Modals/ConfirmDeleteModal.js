import React from 'react'

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, fromImage }) => {
    return isOpen ? (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className={`bg-white p-4 rounded shadow-md ${fromImage ? 'md:w-1/3 w-2/3' : 'w-2/3'}`}>
          <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Delete
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
  

export default ConfirmDeleteModal
