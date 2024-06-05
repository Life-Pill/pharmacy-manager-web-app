import React, { useEffect, useState } from 'react';
import useOrderManagementService from '../services/OrderManagementServices';
import OrderCardComponent from '../components/OrderCardComponent';
import Loader from '../../../shared/Loader';
import { Order } from '../interfaces/OrderDetails';
import { getToday } from '../../../utils/getToday';

type Props = {};

function OrderManagementWindow({}: Props) {
  const {
    loading,
    orderData,
    fetchOrderData,
    filteredOrderData,
    setFilteredOrderData,
    fetchAllBranches,
    branches,
  } = useOrderManagementService();

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(getToday());
  const [selectedBranch, setSelectedBranch] = useState('All');

  useEffect(() => {
    fetchOrderData();
    fetchAllBranches();
  }, []);

  const filterOrdersByDateRange = (order: Order) => {
    const orderDate = new Date(order.orderDate).getTime();
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    // Check if the order falls within the date range
    const withinDateRange =
      orderDate >= startDateTime && orderDate <= endDateTime;

    // Check if the order belongs to the selected branch
    const branchFilter =
      selectedBranch === '' || order.branchId.toString() === selectedBranch;

    return withinDateRange && branchFilter;
  };

  useEffect(() => {
    const filtered = orderData?.filter(filterOrdersByDateRange);
    setFilteredOrderData(filtered);
  }, [startDate, endDate, selectedBranch]);

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
    setSelectedBranch('');
  };

  return (
    <div className='max-h-screen overflow-y-scroll'>
      <div className='bg-white flex flex-wrap items-center space-x-4 justify-between'>
        <div className='flex items-center'>
          <label htmlFor='startDate' className='mb-1'>
            Start Date:
          </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            onChange={(e) => setEndDate(e.target.value)}
            className='border rounded p-1'
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='branch' className='mb-1'>
            Branch:
          </label>

          <select
            id='branch'
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className='border rounded p-1'
          >
            <option value=''>All</option>
            {branches?.map((branch) => (
              <option value={branch.branchId}>{branch.branchName}</option>
            ))}
          </select>
        </div>
        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        filteredOrderData?.map((order) => <OrderCardComponent order={order} />)
      )}
    </div>
  );
}

export default OrderManagementWindow;
