import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
// import HousingContracts from './pages/HousingContracts';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path ="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/listings" element={<div>Listings Page</div>} />
        <Route path="/subleases" element={<div>Subleases Page</div>} />
        <Route path="/market" element={<div>Market Page</div>} />
        <Route path="/resources" element={<div>Resources Page</div>} />
        <Route path="/account" element={<div>Account Page</div>} />
        <Route path="/list-with-us" element={<div>List with Us Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
