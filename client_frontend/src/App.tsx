import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HousingContracts from './pages/HousingContracts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  )
}


export default App;
