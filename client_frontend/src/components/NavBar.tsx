import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../theme/theme-toggle";

const NavBar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => (location.pathname === path ? "underline font-semibold" : "");

  return (
    <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
      {/* Left Side Links */}
      <div className="flex space-x-4">
        {isAuthenticated && (
          <>
            <Link to="/home" className={`hover:underline ${isActive("/home")}`}>Home</Link>
            <Link to="/contracts" className={`hover:underline ${isActive("/contracts")}`}>Contracts</Link>

            {/* ✅ Show Architect Dashboard ONLY if user is an Architect */}
            {user?.role === "Architect" && (
              <Link to="/architect-dashboard" className={`hover:underline ${isActive("/architect-dashboard")}`}>
                Dashboard
              </Link>
            )}
          </>
        )}
        <Link to="/resources" className={`hover:underline ${isActive("/resources")}`}>Resources</Link>
      </div>

      {/* Right Side Links */}
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <span className="font-semibold">{user?.fullName}</span>
            <Link to="/list-with-us" className={`hover:underline ${isActive("/list-with-us")}`}>List with us</Link>
            <Link to="/account" className={`hover:underline ${isActive("/account")}`}>Account</Link>
            <button onClick={logout} className="hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/login" className={`hover:underline ${isActive("/login")}`}>Login</Link>
        )}
        {/* ✅ Add Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
