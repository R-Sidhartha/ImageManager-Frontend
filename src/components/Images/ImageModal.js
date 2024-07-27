import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black px-2 py-1 rounded"
        >
          &#10006;
        </button>
        <img
          src={imageUrl}
          alt="Full Size"
          className="max-w-full max-h-[90vh]"
        />
      </div>
    </div>
  );
};

export default ImageModal;
