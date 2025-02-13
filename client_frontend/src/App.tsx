import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import ContractsPage from './pages/ContractsPage';
import Account from './pages/Account';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ListWithUs from './pages/ListWithUs';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contracts" element={<ContractsPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/list-with-us" element={<ListWithUs />} />
          </Route>

          <Route path="/resources" element={<div>Resources Page</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
