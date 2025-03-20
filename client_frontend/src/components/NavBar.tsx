import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../components/ui/button"; // ✅ Adjust import paths

const NavBar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => (location.pathname === path ? "underline font-semibold" : "");

  return (
    <header className="bg-background border-b border-border h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="text-2xl font-bold text-primary">
              StudentSwap
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link
              to="/list-with-us"
              className={`text-base font-medium text-muted-foreground hover:text-foreground transition-colors ${isActive("/list-with-us")}`}
            >
              List With Us
            </Link>
            <Link
              to="/contracts"
              className={`text-base font-medium text-muted-foreground hover:text-foreground transition-colors ${isActive("/contracts")}`}
            >
              Contracts
            </Link>
            <Link
              to="/account"
              className={`text-base font-medium text-muted-foreground hover:text-foreground transition-colors ${isActive("/account")}`}
            >
              Account
            </Link>
          </nav>

          {/* Right Section: Theme Toggle + Auth Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <span className="font-semibold">{user?.fullName}</span>
                <button onClick={logout} className="hover:underline text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="hidden sm:inline-flex">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        
      </div>
    </header>
  );
};

export default NavBar;
