import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ImageManager</Link>
        <nav className="flex items-center">
          {userInfo && (
            <Link to="/dashboard" className="mr-4 text-white hover:opacity-70">Dashboard</Link>
          )}
          {userInfo ? (
            <div className="relative">
              <FaUserCircle
                className="text-2xl cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-4 w-40 z-50">
                  <div className="flex flex-col items-center mb-2">
                    <FaUserCircle className="text-4xl mb-2" />
                    <span>{userInfo.username}</span>
                  </div>
                  <button
                    onClick={logoutHandler}
                    className="bg-red-500 p-2 rounded hover:bg-red-600 w-full text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-white hover:opacity-70">Login</Link>
              <Link to="/register" className="text-white hover:opacity-70">Register &rarr;</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
