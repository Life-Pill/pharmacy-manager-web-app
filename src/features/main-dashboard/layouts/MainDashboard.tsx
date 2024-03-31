import React from 'react';
import SalesBarChart from '../components/sales-by-branch-bar-chart/SalesBarChart';
import OrderPieChart from '../components/order-by-branch-pie-chart/OrderPieChart';
import SummaryCards from '../components/summary-detail-cards/SummaryCards';

type Props = {};

function MainDashboard({}: Props) {
  return (
    <div className='p-4 max-h-screen overflow-y-hidden w-full'>
      <div>
        <SummaryCards />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className=' bg-blue-200'>
          <SalesBarChart />
        </div>
        <div className=' bg-green-200'>
          <OrderPieChart />
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
