import Branches from '../features/manager-dashboard/components/branches/Branches';
import Cashier from '../features/manager-dashboard/components/cashier/Cashier';
import Dashboard from '../features/manager-dashboard/components/dashboard/Dashboard';
import Summary from '../features/manager-dashboard/components/summary/Summary';

export const renderComponent = (activeComponent: string) => {
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
