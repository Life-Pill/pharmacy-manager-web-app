import React from 'react';
import Logo from '../../../assets/logo.png';
import {
  FaUserTie,
  FaDollarSign,
  FaShoppingCart,
  FaUserFriends,
  FaCheckCircle,
} from 'react-icons/fa';
import { fakeBranchData } from '../../../interfaces/PharmacyBranch';
import { FaLocationPin } from 'react-icons/fa6';
import { GoLocation } from 'react-icons/go';

function BranchManagement() {
  return (
    <div className='grid grid-cols-3 gap-6 p-8 overflow-y-scroll max-h-screen'>
      {fakeBranchData.map((pharmacy) => (
        <div
          key={pharmacy.branchId}
          className='bg-white rounded-lg shadow-md px-6 pt-6'
        >
          <div className='flex items-center space-x-4'>
            <img
              src={Logo}
              alt='Branch Logo'
              className='w-16 h-16 rounded-md'
            />
            <div>
              <p className='text-lg font-bold'>{pharmacy.name}</p>
              <div className='flex w-full items-center gap-4'>
                <GoLocation className='text-blue-500' />
                <p className='text-sm text-gray-500'>
                  {pharmacy.branchAddress}
                </p>
              </div>
              <div className='flex items-center space-x-2 mt-2'>
                <FaUserTie className='text-blue-500' />
                <p className='text-sm'>{pharmacy.manager}</p>
              </div>
              <div className='flex items-center space-x-2 mt-1'>
                <FaDollarSign className='text-green-500' />
                <p className='text-sm'>{pharmacy.sales}</p>
              </div>
              <div className='flex items-center space-x-2 mt-1'>
                <FaShoppingCart className='text-yellow-500' />
                <p className='text-sm'>{pharmacy.orders}</p>
              </div>
              <div className='flex items-center space-x-2 mt-1'>
                <FaUserFriends className='text-purple-500' />
                <p className='text-sm'>100</p>{' '}
                {/* Assuming static value for employees */}
              </div>
              <div className='flex items-center space-x-2 mt-1'>
                <FaCheckCircle
                  className={`text-green-500 ${
                    pharmacy.branchStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                <p
                  className={`text-sm ${
                    pharmacy.branchStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {pharmacy.branchStatus ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
          {/* View More Button */}
          <button className=' text-blue-500 font-semibold py-2 px-4 w-full cursor-pointer'>
            View More
          </button>
        </div>
      ))}
    </div>
  );
}

export default BranchManagement;
