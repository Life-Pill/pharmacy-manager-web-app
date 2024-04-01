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

type Props = {};

function BranchManagement({}: Props) {
  return (
    <div className=''>
      {fakeBranchData.map((pharmacy) => (
        <div className='flex items-center justify-center space-x-4'>
          <img src={Logo} alt='image' className='w-16 h-16 rounded-full' />
          <div className='text-left'>
            <p className='text-lg font-bold'>{pharmacy.name}</p>
            <p className='text-sm'>{pharmacy.branchLocation}</p>
            <p className='text-sm'>
              <FaUserTie className='inline mr-2' />
              {pharmacy.manager}
            </p>
            <p className='text-sm'>
              <FaDollarSign className='inline mr-2' />
              {pharmacy.sales}
            </p>
            <p className='text-sm'>
              <FaShoppingCart className='inline mr-2' />
              {pharmacy.orders}
            </p>
            <p className='text-sm'>
              <FaUserFriends className='inline mr-2' />
              100
            </p>
            <p className='text-sm'>
              <FaCheckCircle className='inline mr-2 text-green-500' />
              {pharmacy.branchStatus}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BranchManagement;
