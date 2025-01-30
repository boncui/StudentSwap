import React from 'react';
// import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const Dashboard:React.FC = () => {
    return (
        <div className = "flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className = "text-3xl font-bold mb-8">Welcome to Student Swap Dashboard</h1>
            {/* <LogoutButton/> */}
        </div>
    );
};

export default Dashboard;