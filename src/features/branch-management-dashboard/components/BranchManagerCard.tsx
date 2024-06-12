import React from 'react';
import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';

type Props = {
  branchManager: CashierDetailsType;
  onClose: () => void;
};

function BranchManagerCard({ branchManager, onClose }: Props) {
  const {
    employerFirstName,
    employerLastName,
    employerEmail,
    employerPhone,
    employerAddress,
    gender,
    dateOfBirth,
    role,
  } = branchManager;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>Branch Manager Details</h2>
        <button
          onClick={onClose}
          className='text-gray-600 hover:text-gray-800 focus:outline-none'
        >
          Close
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='text-gray-600'>First Name:</p>
          <p>{employerFirstName}</p>
        </div>
        <div>
          <p className='text-gray-600'>Last Name:</p>
          <p>{employerLastName}</p>
        </div>
        <div>
          <p className='text-gray-600'>Email:</p>
          <p>{employerEmail}</p>
        </div>
        <div>
          <p className='text-gray-600'>Phone:</p>
          <p>{employerPhone}</p>
        </div>
        <div>
          <p className='text-gray-600'>Address:</p>
          <p>{employerAddress}</p>
        </div>
        <div>
          <p className='text-gray-600'>Gender:</p>
          <p>{gender}</p>
        </div>
        <div>
          <p className='text-gray-600'>Date of Birth:</p>
          <p>{new Date(dateOfBirth).toLocaleString()}</p>
        </div>
        <div>
          <p className='text-gray-600'>Role:</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

export default BranchManagerCard;
