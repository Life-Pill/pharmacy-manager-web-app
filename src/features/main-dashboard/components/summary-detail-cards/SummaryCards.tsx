import React from 'react';
import {
  GiReceiveMoney,
  GiShoppingCart,
  GiWalk,
  GiFactory,
} from 'react-icons/gi';

type Props = {};

function SummaryCards({}: Props) {
  return (
    <div className='flex gap-4 w-full'>
      {/* Total Sales Card */}
      <div className='bg-white rounded-lg shadow-md p-6 flex-1'>
        <div className='flex items-center'>
          <GiReceiveMoney className='text-green-500 text-3xl mr-4' />
          <h2 className='text-xl font-semibold'>Total Sales</h2>
        </div>
        <div className='mt-4'>
          <p className='text-gray-600 text-lg'>Total Amount:</p>
          <p className='text-2xl font-semibold text-green-700'>$1000</p>
        </div>
      </div>

      {/* Total Orders Card */}
      <div className='bg-white rounded-lg shadow-md p-6 flex-1'>
        <div className='flex items-center'>
          <GiShoppingCart className='text-blue-500 text-3xl mr-4' />
          <h2 className='text-xl font-semibold'>Total Orders</h2>
        </div>
        <div className='mt-4'>
          <p className='text-gray-600 text-lg'>Number of Orders:</p>
          <p className='text-2xl font-semibold text-blue-700'>150</p>
        </div>
      </div>

      {/* Total Workers Card */}
      <div className='bg-white rounded-lg shadow-md p-6 flex-1'>
        <div className='flex items-center'>
          <GiWalk className='text-yellow-500 text-3xl mr-4' />
          <h2 className='text-xl font-semibold'>Total Workers</h2>
        </div>
        <div className='mt-4'>
          <p className='text-gray-600 text-lg'>Number of Workers:</p>
          <p className='text-2xl font-semibold text-yellow-700'>120</p>
        </div>
      </div>

      {/* Total Branches Card */}
      <div className='bg-white rounded-lg shadow-md p-6 flex-1'>
        <div className='flex items-center'>
          <GiFactory className='text-red-500 text-3xl mr-4' />
          <h2 className='text-xl font-semibold'>Total Branches</h2>
        </div>
        <div className='mt-4'>
          <p className='text-gray-600 text-lg'>Number of Branches:</p>
          <p className='text-2xl font-semibold text-red-700'>5</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
