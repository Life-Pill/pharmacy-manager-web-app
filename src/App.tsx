import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
