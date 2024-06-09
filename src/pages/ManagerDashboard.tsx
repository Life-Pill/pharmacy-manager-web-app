import React, { useState } from 'react';
import SideBar from '../features/manager-dashboard/components/sidebar/SideBar';
import { useParams } from 'react-router-dom';
import { renderComponent } from '../utils/renderComponent';

type Props = {};

const ManagerDashboard: React.FC<Props> = () => {
  const { item } = useParams();
  const [activeComponent, setActiveComponent] = useState(item || 'dashboard');

  return (
    <div className='flex'>
      <SideBar setActiveComponent={setActiveComponent} />
      <div className='w-full'>{renderComponent(activeComponent)}</div>
    </div>
  );
};

export default ManagerDashboard;
