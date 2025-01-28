import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import SubleasePage from './pages/SubleasePage';
import Account from './pages/Account';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path ="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/listings" element={<div>Listings Page</div>} />
          <Route path="/subleases" element={<SubleasePage />} />
          <Route path="/market" element={<div>Market Page</div>} />
          <Route path="/resources" element={<div>Resources Page</div>} />
          <Route path="/account" element={<Account />} />
          <Route path="/list-with-us" element={<div>List with Us Page</div>} />
        </Routes>
      </Router>
    </AuthProvider>
    
  );
};

export default App;
