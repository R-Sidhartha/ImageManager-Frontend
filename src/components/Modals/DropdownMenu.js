import React, { useState, useRef, useEffect } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";

const DropdownMenu = ({ isOpen, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <BiDotsVerticalRounded  className="text-xl" />
      </button>
      {menuOpen && (
        <div className="absolute bottom-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
