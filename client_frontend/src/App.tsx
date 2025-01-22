import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
// import Dashboard from './pages/Dashboard';
// import HousingContracts from './pages/HousingContracts';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
