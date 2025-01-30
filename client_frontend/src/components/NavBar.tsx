import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            {/* Left Side Links */}
            <div className='flex space-x-4'>
                {isAuthenticated && (
                    <>
                        <Link to='/dashboard' className="hover:underline">Dashboard</Link>
                        <Link to='/listings' className="hover:underline">Listings</Link>
                        <Link to='/subleases' className="hover:underline">Subleases</Link>
                        <Link to='/market' className="hover:underline">Market</Link>
                    </>
                )}
                <Link to='/resources' className="hover:underline">Resources</Link>
            </div>

            {/* Right Side Links */}
            <div className='flex space-x-4'>
                {isAuthenticated ? (
                    <>
                        <span className="font-semibold">{user?.fullName}</span>
                        <Link to='/list-with-us' className="hover:underline">List with us</Link>
                        <Link to='/account' className="hover:underline">Account</Link>
                        <button onClick={logout} className="hover:underline">Logout</button>
                    </>
                ) : (
                    <Link to='/login' className="hover:underline">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
