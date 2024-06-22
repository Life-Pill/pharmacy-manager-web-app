import React from 'react';

type Props = {};

const BranchCreateCard: React.FC<Props> = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-lg p-6 w-[500px] border border-gray-200 space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Create New Branch
        </h2>

        {/* Form Inputs */}
        <div className='grid grid-cols-1 gap-4'>
          <label
            htmlFor='branchName'
            className='block text-sm font-medium text-gray-700'
          >
            Branch Name
          </label>
          <input type='text' id='branchName' className='input-box' />

          <label
            htmlFor='branchAddress'
            className='block text-sm font-medium text-gray-700'
          >
            Branch Address
          </label>
          <input type='text' id='branchAddress' className='input-box' />

          <label
            htmlFor='branchContact'
            className='block text-sm font-medium text-gray-700'
          >
            Branch Contact
          </label>
          <input type='text' id='branchContact' className='input-box' />

          <label
            htmlFor='branchEmail'
            className='block text-sm font-medium text-gray-700'
          >
            Branch Email
          </label>
          <input type='email' id='branchEmail' className='input-box' />

          <label
            htmlFor='branchDescription'
            className='block text-sm font-medium text-gray-700'
          >
            Branch Description
          </label>
          <textarea
            id='branchDescription'
            className='input-box h-20 resize-none'
          ></textarea>
        </div>

        {/* Buttons */}
        <div className='flex justify-end'>
          <button
            type='button'
            className='py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
          >
            Create
          </button>
          <button
            type='button'
            className='ml-2 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchCreateCard;
