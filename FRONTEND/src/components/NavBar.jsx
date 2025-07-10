import React from 'react';
import { Link } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice'; // Adjust path if needed
import { useNavigate } from '@tanstack/react-router';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user?.name); // Adjust according to your state shape
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // Optionally handle error (e.g., show a message)
      // console.error('Logout failed', err);
    }
    dispatch(logout());
    navigate({to: '/auth'});
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Adjust according to your state shape

  return (
    <nav className="bg-white border border-b-black">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>
          
          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome {userName}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;