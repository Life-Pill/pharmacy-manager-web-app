import Branches from '../features/manager-dashboard/components/branches/Branches';
import Cashier from '../features/manager-dashboard/components/cashier/Cashier';
import Dashboard from '../features/manager-dashboard/components/dashboard/Dashboard';
import Summary from '../features/manager-dashboard/components/summary/Summary';
import OrderManagementWindow from '../features/order-management-window/layouts/OrderManagementWindow';

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
    case 'orders':
      return <OrderManagementWindow />;
    default:
      return null;
  }
};
