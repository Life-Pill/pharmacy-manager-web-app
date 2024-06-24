import React, { useEffect, useState } from 'react';
import useSummaryService from '../services/SummaryService';
import SalesChart from '../components/SalesChart';
import OrdersChart from '../components/OrdersChart';

const SummaryPage: React.FC = () => {
  const { getAllBranchesSales, branchSalesOrders } = useSummaryService();

  useEffect(() => {
    getAllBranchesSales();
  }, []);

  return (
    <div className='flex justify-center items-center flex-col'>
      <SalesChart branchSalesOrders={branchSalesOrders} />
      <OrdersChart branchSalesOrders={branchSalesOrders} />
    </div>
  );
};

export default SummaryPage;
