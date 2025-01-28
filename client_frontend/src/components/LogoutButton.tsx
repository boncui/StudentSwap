import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); // Clear user data
        navigate('/'); 
        window.location.reload(); // Refresh the app state
    };

    return (
        <button
            onClick={handleLogout}
            className = "bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
};

export default LogoutButton;