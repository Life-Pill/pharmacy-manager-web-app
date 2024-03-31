import React from 'react';
import SalesBarChart from '../components/sales-by-branch-bar-chart/SalesBarChart';
import OrderPieChart from '../components/order-by-branch-pie-chart/OrderPieChart';
import LatestTransactionDetails from '../components/latest-transaction-details-branches/LatestTransactionDetails';

type Props = {};

function MainDashboard({}: Props) {
  return (
    <div className='p-4 max-h-screen overflow-y-hidden w-full'>
      <div className='grid grid-cols-2 gap-4'>
        <div className=' bg-blue-200'>
          <SalesBarChart />
        </div>
        <div className=' bg-green-200'>
          <OrderPieChart />
        </div>
        <div className=' bg-yellow-200'>
          <LatestTransactionDetails />
        </div>
        <div className=' bg-red-200'>Content for area 4</div>
      </div>
    </div>
  );
}

export default MainDashboard;
