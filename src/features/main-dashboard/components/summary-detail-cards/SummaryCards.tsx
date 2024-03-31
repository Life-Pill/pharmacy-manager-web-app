import React from 'react';
import { GiReceiveMoney } from 'react-icons/gi';

type Props = {};

function SummaryCards({}: Props) {
  return (
    <div>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center'>
          <GiReceiveMoney className='text-green-500 text-3xl mr-4' />
          <h2 className='text-xl font-semibold'>Total Sales</h2>
        </div>
        <div className='mt-4'>
          <p className='text-gray-600 text-lg'>Total Amount:</p>
          <p className='text-2xl font-semibold text-green-700'>${}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
