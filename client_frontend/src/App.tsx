import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import ContractsPage from './pages/ContractsPage';
import Account from './pages/Account';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ListWithUs from './pages/ListWithUs';
import Resources from './pages/Resources';
import ArchitectDashboard from './pages/ArchitectDashboard';
import "./styles/globals.css";
import Layout from "./layout";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        
        <Layout>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/contracts" element={<ContractsPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/list-with-us" element={<ListWithUs />} />
              {/* Architect Dashboard */}
              <Route path="/architect-dashboard" element={<ArchitectDashboard />} />
            </Route>
            
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </Layout>
        
      </Router>
    </AuthProvider>
  );
};

export default App;
