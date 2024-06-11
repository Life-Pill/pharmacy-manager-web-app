import React, { useState } from 'react';
import {
  FaHome,
  FaUserFriends,
  FaBuilding,
  FaChartBar,
  FaBox,
  FaClipboardList,
  FaSignOutAlt,
} from 'react-icons/fa';
import Logo from '../../../../assets/logo.png';
import useAuth from '../../../authentication/services/AuthService';
import Loader from '../../../../shared/Loader';

type SideBarProps = {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
};

const SideBar: React.FC<SideBarProps> = ({ setActiveComponent }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setActiveComponent(item);
  };

  const { logout, loggingOut } = useAuth();
  return (
    <div className='flex flex-row w-full bg-gray-900 sidebar justify-between px-8 py-2 sticky top-0 z-50'>
      <div className='flex items-center justify-center h-16 bg-gray-900 text-white text-xl font-bold'>
        <img src={Logo} alt='Logo' className='mr-2 h-12' />
      </div>
      <div className='flex flex-row items-center justify-evenly gap-16 text-white'>
        <div
          className={`hover:bg-gray-700 w-full flex items-center justify-center cursor-pointer p-4 rounded-md ${
            activeItem === 'dashboard' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('dashboard')}
        >
          <FaHome className='mr-2' />
          Dashboard
        </div>

        <div
          className={`hover:bg-gray-700 w-full flex items-center justify-center cursor-pointer p-4 rounded-md${
            activeItem === 'branches' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('branches')}
        >
          <FaBuilding className='mr-2' />
          Branches
        </div>
        <div
          className={`hover:bg-gray-700 w-full flex items-center justify-center cursor-pointer p-4 rounded-md${
            activeItem === 'cashiers' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('cashiers')}
        >
          <FaUserFriends className='mr-2' />
          Cashiers
        </div>
        <div
          className={`hover:bg-gray-700 w-full flex items-center justify-center cursor-pointer p-4 rounded-md${
            activeItem === 'summary' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('summary')}
        >
          <FaChartBar className='mr-2' />
          Summary
        </div>
        <div
          className={`hover:bg-gray-700 w-full flex items-center justify-center cursor-pointer p-4 rounded-md${
            activeItem === 'orders' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('orders')}
        >
          <FaBox className='mr-2' />
          Orders
        </div>
        <div
          className={`hover:bg-gray-700 w-full flex items-center justify-center cursor-pointer p-4 rounded-md${
            activeItem === 'items' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('items')}
        >
          <FaClipboardList className='mr-2' />
          Items
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          className='hover:bg-gray-700 flex items-center justify-center cursor-pointer p-4 rounded-md text-white'
          onClick={logout}
        >
          {loggingOut ? <Loader /> : <FaSignOutAlt className='mr-2' />}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
