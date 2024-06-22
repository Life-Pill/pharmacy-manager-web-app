import React, { useState } from 'react';
import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';
import { ChangeBranchManagerDTO } from '../interfaces/ChangeBranchManagerDTO';
import useBranchManagementService from '../services/BranchManagementService';

type Props = {
  onClose: () => void;
  branchEmployers: CashierDetailsType[];
};

function ChangeBranchManager({ onClose, branchEmployers }: Props) {
  const [changeBranchManagerDTO, setChangeBranchManagerDTO] =
    useState<ChangeBranchManagerDTO>();

  const { changeBranchManagerMethod, updatingManager } =
    useBranchManagementService();

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200 space-y-2'>
        <h2 className='text-lg font-semibold text-white'>
          Change Branch Manager
        </h2>

        {branchEmployers.map((employer) => (
          <div key={employer.employerId} className='flex justify-between mb-4'>
            {(employer.role === 'MANAGER' || employer.role === 'OWNER') && (
              <>
                <p className='text-white'>
                  {employer.employerFirstName} {employer.employerLastName}
                </p>
                <button
                  type='button'
                  className='text-white hover:text-blue-700 bg-blue-700 hover:bg-white font-medium rounded-lg text-sm p-2 '
                  onClick={() => {
                    setChangeBranchManagerDTO({
                      formerManagerId: employer.employerId || 0,
                      branchId: employer.branchId,
                      newManagerId: employer.employerId,
                      currentManagerNewRole: 'MANAGER',
                      newManagerRole: 'MANAGER',
                    });

                    changeBranchManagerDTO &&
                      changeBranchManagerMethod(changeBranchManagerDTO);
                  }}
                >
                  {updatingManager ? 'Updating...' : 'Assign'}
                </button>
              </>
            )}
          </div>
        ))}

        <div className='flex justify-between mt-4'>
          <button
            type='button'
            onClick={onClose}
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            Back
          </button>
          {/* <button
            type='button'
            className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={() => updateBranchImage(parseInt(branchId))}
          >
            {updatingImage ? <Loader /> : 'Update'}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ChangeBranchManager;
