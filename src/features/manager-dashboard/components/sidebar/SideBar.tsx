import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBuilding, FaChartBar } from 'react-icons/fa';
import Logo from '../../../../assets/logo.png';

type SideBarProps = {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
};

const SideBar: React.FC<SideBarProps> = ({ setActiveComponent }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setActiveComponent(item);
  };

  return (
    <div className='flex flex-col w-80 bg-gray-900 h-screen'>
      <div className='flex items-center justify-center h-auto bg-gray-900 text-white text-xl font-bold'>
        <img src={Logo} alt='Logo' className='mr-2' />
      </div>
      <div className='flex flex-col items-center justify-center h-auto text-white'>
        <div
          className={`hover:bg-gray-700 w-full h-16 flex items-center justify-center ${
            activeItem === 'dashboard' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('dashboard')}
        >
          <FaHome className='mr-2' />
          Dashboard
        </div>

        <div
          className={`hover:bg-gray-700 w-full h-16 flex items-center justify-center ${
            activeItem === 'branches' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('branches')}
        >
          <FaBuilding className='mr-2' />
          Branches
        </div>
        <div
          className={`hover:bg-gray-700 w-full h-16 flex items-center justify-center ${
            activeItem === 'cashiers' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('cashiers')}
        >
          <FaUserFriends className='mr-2' />
          Cashiers
        </div>
        <div
          className={`hover:bg-gray-700 w-full h-16 flex items-center justify-center ${
            activeItem === 'summary' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleItemClick('summary')}
        >
          <FaChartBar className='mr-2' />
          Summary
        </div>
      </div>
    </div>
  );
};

export default SideBar;
