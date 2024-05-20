import React, { useState } from 'react';
import SideBar from '../features/manager-dashboard/components/sidebar/SideBar';
import Dashboard from '../features/manager-dashboard/components/dashboard/Dashboard';
import Cashier from '../features/manager-dashboard/components/cashier/Cashier';
import Branches from '../features/manager-dashboard/components/branches/Branches';
import Summary from '../features/manager-dashboard/components/summary/Summary';
import { useParams } from 'react-router-dom';

type Props = {};

const ManagerDashboard: React.FC<Props> = () => {
  const { item } = useParams();
  const [activeComponent, setActiveComponent] = useState(item || 'dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'branches':
        return <Branches />;
      case 'cashiers':
        return <Cashier />;
      case 'summary':
        return <Summary />;
      default:
        return null;
    }
  };

  return (
    <div className='flex'>
      <SideBar setActiveComponent={setActiveComponent} />
      <div className='w-full'>{renderComponent()}</div>
    </div>
  );
};

export default ManagerDashboard;
