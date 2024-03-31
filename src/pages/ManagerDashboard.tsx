import React, { useState } from 'react';
import SideBar from '../features/manager-dashboard/components/sidebar/SideBar';
import Dashboard from '../features/manager-dashboard/components/dashboard/Dashboard';
import Cashier from '../features/manager-dashboard/components/cashier/Cashier';
import Branches from '../features/manager-dashboard/components/branches/Branches';
import Summary from '../features/manager-dashboard/components/summary/Summary';

type Props = {};

const ManagerDashboard: React.FC<Props> = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'cashiers':
        return <Cashier />;
      case 'branches':
        return <Branches />;
      case 'summary':
        return <Summary />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-row'>
      <SideBar setActiveComponent={setActiveComponent} />
      <div className=''>{renderComponent()}</div>
    </div>
  );
};

export default ManagerDashboard;
