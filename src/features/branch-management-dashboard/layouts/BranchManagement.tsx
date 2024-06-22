import Logo from '../../../assets/logo.png';
import {
  FaUserTie,
  FaUserFriends,
  FaCheckCircle,
  FaPlus,
} from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { useEffect } from 'react';
import useBranchManagementService from '../services/BranchManagementService';
import Lottie from 'lottie-react';
import loading from '../../../assets/lottie/loading.json';
import { useNavigate } from 'react-router-dom';
import { IBranchAndSales } from '../interfaces/IBranchAndSales';

function BranchManagement() {
  const { allBranchSales, loadingAllBranchSales, fetchAllBranchSales } =
    useBranchManagementService();

  useEffect(() => {
    fetchAllBranchSales();
  }, []);

  const navigate = useNavigate();

  const viewMoreClick = (worker: IBranchAndSales) => {
    navigate(`/view-branch/${worker.branchDTO.branchId}`);
  };

  return (
    <>
      {loadingAllBranchSales && (
        <div className='flex justify-center items-center h-screen branches'>
          <Lottie animationData={loading} width={150} height={150} />
        </div>
      )}
      <div className='grid grid-cols-2 gap-6 p-8 overflow-y-scroll max-h-screen branch'>
        {allBranchSales?.map((pharmacy) => (
          <div
            key={pharmacy.branchDTO.branchId}
            className='bg-white rounded-lg shadow-md p-6 space-y-4'
          >
            <div className='flex items-center space-x-4'>
              <img
                src={Logo}
                alt='Branch Logo'
                className='w-16 h-16 rounded-md'
              />
              <div>
                <p className='text-xl font-bold'>
                  {pharmacy.branchDTO.branchName}
                </p>
                <div className='flex items-center gap-2'>
                  <GoLocation className='text-blue-500' />
                  <p className='text-base text-gray-500'>
                    {pharmacy.branchDTO.branchLocation}
                  </p>
                </div>
                <div className='flex items-center space-x-2 mt-2'>
                  <FaUserTie className='text-black' />
                  <p className='text-base'>{pharmacy.manager}</p>
                </div>

                <p className='text-lg font-medium'>
                  Total Sales: LKR {pharmacy.sales.toFixed(2)}
                </p>

                <p className='text-lg font-medium'>
                  Total Orders:{' '}
                  <span className='text-blue-500'>{pharmacy.orders}</span>
                </p>
                <div className='flex items-center space-x-2'>
                  {/* <FaUserFriends className='text-purple-500' /> */}
                  {/* <p className='text-base'>25 Employees</p>{' '} */}
                  {/* Assuming static value for employees */}
                </div>
                <div className='flex items-center space-x-2'>
                  <FaCheckCircle
                    className={`text-lg ${
                      pharmacy.branchDTO.branchStatus
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  />
                  <p
                    className={`text-base ${
                      pharmacy.branchDTO.branchStatus
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {pharmacy.branchDTO.branchStatus ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>
            {/* View More Button */}
            <button
              className='text-blue-500 font-semibold py-2 px-4 mt-4 w-full bg-blue-100 hover:bg-blue-200 rounded-md transition duration-300 ease-in-out'
              onClick={() => viewMoreClick(pharmacy)}
            >
              View More
            </button>
          </div>
        ))}
      </div>

      <div className='fixed bottom-8 right-8'>
        <button className='flex items-center text-blue-500 font-semibold py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded-full shadow-lg transition duration-300 ease-in-out'>
          <FaPlus className='mr-2' /> Add Branch
        </button>
      </div>
    </>
  );
}

export default BranchManagement;
