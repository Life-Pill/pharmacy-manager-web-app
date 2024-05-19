import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import AddCashier from './features/cashier-management-dashboard/layouts/AddCashier';
import CashierBankDetails from './features/cashier-management-dashboard/components/add-cashier/CashierBankDetails';
import UpdateCashier from './features/cashier-management-dashboard/layouts/UpdateCashier';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ManagerDashboard />} />
        <Route path='/add-cashier' element={<AddCashier />} />
        <Route path='/cashier-bank-details' element={<CashierBankDetails />} />
        {/* <Route path='/update-cashier/:employerId' element={<UpdateCashier />} /> */}
        <Route path='/manager-dashboard/:item' element={<ManagerDashboard />} />
        <Route
          path='/update-cashier/:employerId'
          element={<UpdateCashier />}
        />{' '}
      </Routes>
    </Router>
  );
}

export default App;
