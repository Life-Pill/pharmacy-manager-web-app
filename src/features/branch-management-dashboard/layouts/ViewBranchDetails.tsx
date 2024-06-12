import { useNavigate, useParams } from 'react-router-dom';
import useBranchManagementService from '../services/BranchManagementService';
import { useEffect, useState } from 'react';
import OrdersChart from '../components/OrdersChart';
import SalesChart from '../components/SalesChart';
import { getToday } from '../../../utils/getToday';
import { generateMonthlySalesSummary } from '../utils/monthlySalesSummary';
import BranchDetailCard from '../components/BranchDetailCard';
import EmployerTable from '../components/EmployerTable';
import ItemsTable from '../components/ItemsTable';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFax,
  FaUser,
  FaCalendarAlt,
} from 'react-icons/fa';
import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';
import BranchManagerCard from '../components/BranchManagerCard';

type Props = {};

function ViewBranchDetails({}: Props) {
  const { branchId } = useParams();
  const {
    fetchBranchById,
    getSalesSummary,
    salesSummary,
    fetchEmployersByBranchId,
    branchEmployers,
    branch,
    fetchItemsByBranchId,
    items,
    fetchBranchMangerById,
    branchManager,
  } = useBranchManagementService();

  useEffect(() => {
    if (branchId) {
      fetchBranchById(branchId);
      getSalesSummary(branchId);
      fetchEmployersByBranchId(branchId);
      fetchItemsByBranchId(branchId);
      fetchBranchMangerById(branchId);
    }
  }, []);

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(getToday());
  const [filterByMonth, setFilterByMonth] = useState(false);
  const [filterByYear, setFilterByYear] = useState('');
  const [showSales, setShowSales] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [showBranchDetails, setShowBranchDetails] = useState(false);
  const [showBranchManger, setShowBranchManager] = useState(false);

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleYearChange = (e: any) => {
    setFilterByYear(e.target.value);
  };

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
    setFilterByMonth(false);
    setFilterByYear('');
  };

  const filteredSalesData = salesSummary.filter((data) => {
    const dataYear = new Date(data.date).getFullYear().toString();
    const withinDateRange = data.date >= startDate && data.date <= endDate;
    const matchesYear = filterByYear ? dataYear === filterByYear : true;

    return withinDateRange && matchesYear;
  });

  useEffect(() => {
    const totalOrders = filteredSalesData.reduce(
      (acc, curr) => acc + curr.orders,
      0
    );
    const totalSales = filteredSalesData.reduce(
      (acc, curr) => acc + curr.sales,
      0
    );

    setTotalOrders(totalOrders);
    setTotalSales(totalSales);
  }, [salesSummary, startDate, endDate, filterByYear, filterByMonth]);

  const handleToggleClick = () => {
    setShowBranchDetails(!showBranchDetails);
  };

  const handleBranchManagerClick = () => {
    setShowBranchManager(!showBranchManger);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (branchId) {
      fetchBranchById(branchId);
    }
  }, [showBranchDetails]);

  return (
    <div className='flex flex-col space-y-8 h-screen p-4 m-4'>
      <div className='flex flex-col items-center gap-2 bg-gray-100 p-4 rounded-lg shadow-md'>
        {branch && (
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdhUtDLZiByDiz05R15jG3TLrCIS2MiCZnTQ&s'
            alt='image'
            className='rounded-full w-auto h-24'
          />
        )}
        <p className='text-xl font-semibold'>{branch.branchName}</p>
        <div className='flex flex-row w-full gap-8 justify-center '>
          <div className='flex items-center'>
            <FaMapMarkerAlt className='text-gray-700 mr-2' />
            <p className='text-gray-700'>{branch.branchAddress}</p>
          </div>
          <div className='flex items-center'>
            <FaPhone className='text-gray-700 mr-2' />
            <p className='text-gray-700'>{branch.branchContact}</p>
          </div>
          <div className='flex items-center'>
            <FaEnvelope className='text-gray-700 mr-2' />
            <p className='text-gray-700'>{branch.branchEmail}</p>
          </div>
        </div>
        <div className='flex flex-row justify-center w-full gap-8'>
          <div className='flex items-center'>
            <FaFax className='text-gray-700 mr-2' />
            <p className='text-gray-700'>{branch.branchFax}</p>
          </div>
          <div className='flex items-center'>
            <FaUser className='text-gray-700 mr-2' />
            <p className='text-gray-700'>{branch.branchCreatedBy}</p>
          </div>
          <div className='flex items-center'>
            <FaCalendarAlt className='text-gray-700 mr-2' />
            <p className='text-gray-700'>
              {branch.branchCreatedOn?.split(' ')[0]}
            </p>
          </div>
        </div>
        <p className='text-gray-700'>{branch.branchDescription}</p>
        <div className='cursor-pointer'>
          <p onClick={handleBranchManagerClick}>
            {branchManager.employerEmail
              ? branchManager.employerEmail
              : 'No manager assigned'}
          </p>
          {showBranchManger && (
            <BranchManagerCard
              onClose={handleBranchManagerClick}
              branchManager={branchManager}
            />
          )}
        </div>
        <div className='flex flex-row justify-center items-center gap-8'>
          <div className='text-lg'>
            Total Orders: <span className='font-bold'>{totalOrders}</span>
          </div>
          <div className='text-lg'>
            Total Sales: <span className='font-bold'>{totalSales}</span>
          </div>
        </div>
      </div>

      <div className='bg-white flex flex-wrap items-center space-x-4 justify-between'>
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
        <div className='flex flex-row gap-2'>
          <label htmlFor='filterByMonth' className='mb-1'>
            Filter By Month:
          </label>
          <input
            type='checkbox'
            id='filterByMonth'
            checked={filterByMonth}
            onChange={() => setFilterByMonth(!filterByMonth)}
            className='border p-1'
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='filterByYear' className='mb-1'>
            Filter By Year:
          </label>
          <input
            type='text'
            id='filterByYear'
            value={filterByYear}
            onChange={handleYearChange}
            placeholder='YYYY'
            className='border rounded p-1'
          />
        </div>
        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleToggleClick}
        >
          Show Branch Details
        </button>
        <div className='flex items-center ml-auto'>
          <button
            className={`px-4 py-2 font-bold rounded-l-lg ${
              showSales ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setShowSales(true)}
          >
            Sales
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-r-lg ${
              !showSales
                ? 'bg-gray-800 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setShowSales(false)}
          >
            Orders
          </button>
        </div>
        {/* <button
          className='bg-green-800 text-white px-4 py-2 font-bold rounded-lg ml-4 flex items-center justify-center'
          onClick={() => exportToExcel(filteredSalesData)}
          data-tip='Export to Excel'
        >
          <AiFillFileExcel size={24} />
        </button>
        <button
          className='bg-red-800 text-white px-4 py-2 font-bold rounded-lg ml-4 flex items-center justify-center'
          onClick={() => exportToPDF(filteredSalesData)}
          data-tooltip-content={'Export to PDF'}
          data-tip='Export to PDF'
        >
          <AiFillFilePdf size={24} />
        </button> */}
      </div>

      <div className='flex flex-col justify-between space-y-8'>
        {showBranchDetails && (
          <BranchDetailCard branch={branch} closeTab={handleToggleClick} />
        )}
        {filterByMonth ? (
          showSales ? (
            <SalesChart
              salesData={generateMonthlySalesSummary(filteredSalesData)}
            />
          ) : (
            <OrdersChart
              salesData={generateMonthlySalesSummary(filteredSalesData)}
            />
          )
        ) : showSales ? (
          <SalesChart salesData={filteredSalesData} />
        ) : (
          <OrdersChart salesData={filteredSalesData} />
        )}
      </div>

      <EmployerTable branchEmployers={branchEmployers} />
      <ItemsTable items={items} />

      <button
        type='button'
        onClick={() => navigate('/manager-dashboard/branches')}
        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
      >
        Back
      </button>
    </div>
  );
}

export default ViewBranchDetails;
