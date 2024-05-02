import Logo from '../../../assets/logo.png';
import { FaUserTie, FaUserFriends, FaCheckCircle } from 'react-icons/fa';
import { fakeBranchData } from '../../../interfaces/PharmacyBranch';
import { GoLocation } from 'react-icons/go';

function BranchManagement() {
  return (
    <div className='grid grid-cols-2 gap-6 p-8 overflow-y-scroll max-h-screen'>
      {fakeBranchData.map((pharmacy) => (
        <div
          key={pharmacy.branchId}
          className='bg-white rounded-lg shadow-md p-6 space-y-4'
        >
          <div className='flex items-center space-x-4'>
            <img
              src={Logo}
              alt='Branch Logo'
              className='w-16 h-16 rounded-md'
            />
            <div>
              <p className='text-xl font-bold'>{pharmacy.name}</p>
              <div className='flex items-center gap-2'>
                <GoLocation className='text-blue-500' />
                <p className='text-base text-gray-500'>
                  {pharmacy.branchAddress}
                </p>
              </div>
              <div className='flex items-center space-x-2 mt-2'>
                <FaUserTie className='text-black' />
                <p className='text-base'>{pharmacy.manager}</p>
              </div>

              <p className='text-lg font-medium'>
                Total Sales: LKR {pharmacy.sales}
              </p>

              <p className='text-lg font-medium'>
                Total Orders:{' '}
                <span className='text-blue-500'>{pharmacy.orders}</span>
              </p>
              <div className='flex items-center space-x-2'>
                <FaUserFriends className='text-purple-500' />
                <p className='text-base'>100</p>{' '}
                {/* Assuming static value for employees */}
              </div>
              <div className='flex items-center space-x-2'>
                <FaCheckCircle
                  className={`text-lg ${
                    pharmacy.branchStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                <p
                  className={`text-base ${
                    pharmacy.branchStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {pharmacy.branchStatus ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
          {/* View More Button */}
          <button className='text-blue-500 font-semibold py-2 px-4 mt-4 w-full bg-blue-100 hover:bg-blue-200 rounded-md transition duration-300 ease-in-out'>
            View More
          </button>
        </div>
      ))}
    </div>
  );
}

export default BranchManagement;