import React, { useEffect, useState } from 'react';
import SalesChart from '../components/SalesChart';
import OrdersChart from '../components/OrdersChart';
import { getToday } from '../../../utils/getToday'; // Adjust path as per your project structure
import { BranchSalesData } from '../interfaces/BranchSales';
import useSummaryService from '../services/SummaryService';

const SummaryPage: React.FC = () => {
  const { getAllBranchesSales, branchSalesOrders, filterBranchSalesData } =
    useSummaryService();
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(getToday());

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    getAllBranchesSales();
  }, []);

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
  };

  // Filtering logic based on date range
  const filteredSalesData = branchSalesOrders.filter(
    (data: BranchSalesData) => {
      return data.dailySalesSummary.some((summary) => {
        const dataDate = new Date(summary.date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return dataDate >= startDateObj && dataDate <= endDateObj;
      });
    }
  );

  return (
    <div className='flex justify-center items-center flex-col'>
      {/* <div className='bg-white flex flex-wrap items-center space-x-4 justify-between p-8'>
        <div className='flex items-center'>
          <label htmlFor='startDate' className='mb-1'>
            Start Date:
          </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={handleStartDateChange}
            className='border rounded p-1'
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='endDate' className='mb-1'>
            End Date:
          </label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            onChange={handleEndDateChange}
            className='border rounded p-1'
          />
        </div>

        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div> */}

      <SalesChart branchSalesOrders={filteredSalesData} />
      <OrdersChart branchSalesOrders={filteredSalesData} />
    </div>
  );
};

export default SummaryPage;
