import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); //removes the token
        navigate('/'); //redirects users to the landing page
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