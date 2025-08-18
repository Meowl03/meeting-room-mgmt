import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Meeting Room Manager</Link>
      </div>
      {token && (
        <div className="flex items-center space-x-4">
          <Link to="/rooms" className="hover:underline">
            Rooms
          </Link>
          <Link to="/bookings" className="hover:underline">
            Bookings
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <span>{user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
