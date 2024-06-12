import React, { useState } from 'react';
import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';

type Props = {
  branchManager: CashierDetailsType;
  onClose: () => void;
};

function BranchManagerCard({ branchManager, onClose }: Props) {
  const [formData, setFormData] = useState(branchManager);
  const [editable, setEditable] = useState(false);

  const handleSubmit = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditable = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-white'>
          Branch Manager Info
        </h2>

        <div className='flex justify-center items-center'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNXQN49BC5ALTU_rWah1zC5WQaPqyd81wmxA&s'
            alt='branchmanageimage'
            className='rounded-full p-2 h-32 w-32'
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='employerFirstName' className='label-text'>
              First Name
            </label>
            <input
              type='text'
              id='employerFirstName'
              name='employerFirstName'
              value={formData.employerFirstName}
              onChange={handleChange}
              className='input-box'
              readOnly={!editable}
              required
            />
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='employerLastName' className='label-text'>
                Last Name
              </label>
              <input
                type='text'
                id='employerLastName'
                name='employerLastName'
                value={formData.employerLastName}
                onChange={handleChange}
                className='input-box'
                readOnly={!editable}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='employerPhone' className='label-text'>
                Contact
              </label>
              <input
                type='text'
                id='employerPhone'
                name='employerPhone'
                value={formData.employerPhone}
                onChange={handleChange}
                className='input-box'
                readOnly={!editable}
                required
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='employerEmail' className='label-text'>
                Email
              </label>
              <input
                type='email'
                id='employerEmail'
                name='employerEmail'
                value={formData.employerEmail}
                onChange={handleChange}
                className='input-box'
                readOnly={!editable}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='employerAddress' className='label-text'>
                Address
              </label>
              <input
                type='text'
                id='employerAddress'
                name='employerAddress'
                value={formData.employerAddress}
                onChange={handleChange}
                className='input-box'
                readOnly={!editable}
                required
              />
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor='employerSalary' className='label-text'>
              Salary
            </label>
            <input
              id='employerSalary'
              name='employerSalary'
              value={formData.employerSalary}
              className='input-box'
              readOnly={!editable}
              onChange={handleChange}
            />
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
              Back
            </button>
            {/* <button
              type='button'
              onClick={toggleEditable}
              className='focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              {editable ? 'Save' : 'Edit'}
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BranchManagerCard;
