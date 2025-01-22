import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if the user is logged in
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthRoute;