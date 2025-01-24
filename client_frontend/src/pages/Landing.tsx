import React from 'react';
import {useNavigate} from 'react-router-dom';

const Landing:React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Welcome to Student Swap</h1>
            <div className="space-x-4">
                <button
                    onClick={() => navigate('/login')}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/register')}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Landing;