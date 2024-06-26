import React, { useEffect, useState } from 'react';
import useOrderManagementService from '../services/OrderManagementServices';
import OrderCardComponent from '../components/OrderCardComponent';
import { Order } from '../interfaces/OrderDetails';
import { getToday } from '../../../utils/getToday';
import { BiLoader } from 'react-icons/bi';

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
    // fetchAllBranches();
  }, []);

  const filterOrdersByDateRange = (order: Order) => {
    const orderDate = new Date(order.orderDate).getTime();
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    // Check if the order falls within the date range
    const withinDateRange =
      orderDate >= startDateTime && orderDate <= endDateTime;

    // Check if the order belongs to the selected branch

    return withinDateRange;
  };

  useEffect(() => {
    const filtered = orderData?.filter(filterOrdersByDateRange);
    setFilteredOrderData(filtered);
  }, [startDate, endDate]);

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
  };

  return (
    <div className='overflow-y-scroll max-h-screen'>
      <div className='mx-16 bg-white flex flex-wrap items-center space-x-4 justify-between p-4 sticky top-0'>
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
        {/* <div className='flex items-center'>
          <label htmlFor='branch' className='mb-1'>
            Branch:
          </label>

          <select
            id='branch'
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className='border rounded p-1 w-auto px-2'
          >
            <option value=''>All</option>
            {branches?.map((branch) => (
              <option value={branch.branchId}>{branch.branchName}</option>
            ))}
          </select>
        </div> */}
        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      {loading ? (
        <BiLoader className='animate-spin text-4xl text-blue-500' />
      ) : (
        filteredOrderData?.map((order) => <OrderCardComponent order={order} />)
      )}
    </div>
  );
}

export default OrderManagementWindow;
