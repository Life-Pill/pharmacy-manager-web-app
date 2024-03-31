import React from 'react';
import SalesBarChart from '../components/sales-by-branch-bar-chart/SalesBarChart';
import OrderPieChart from '../components/order-by-branch-pie-chart/OrderPieChart';
import SummaryCards from '../components/summary-detail-cards/SummaryCards';

type Props = {};

function MainDashboard({}: Props) {
  return (
    <div className='p-4 max-h-screen overflow-y-hidden'>
      <SummaryCards />

      <div className='flex flex-row justify-evenly items-center'>
        <div className=' '>
          <SalesBarChart />
        </div>
        <div className=''>
          <OrderPieChart />
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
