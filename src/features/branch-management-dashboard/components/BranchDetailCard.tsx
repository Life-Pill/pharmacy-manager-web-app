import { useState } from 'react';
import { Branch } from '../interfaces/Branch';
import useBranchManagementService from '../services/BranchManagementService';

type Props = {
  branch: Branch;
  closeTab: () => void;
};

function BranchDetailCard({ branch, closeTab }: Props) {
  const [formData, setFormData] = useState(branch);

  const { updateBranch, updating } = useBranchManagementService();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBranch(branch.branchId, formData);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-white'>
          Branch Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='branchName' className='label-text'>
              Company Name
            </label>
            <input
              type='text'
              id='branchName'
              name='branchName'
              value={formData.branchName}
              onChange={handleChange}
              className='input-box'
              required
            />
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='branchAddress' className='label-text'>
                Company Address
              </label>
              <input
                type='text'
                id='branchAddress'
                name='branchAddress'
                value={formData.branchAddress}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='branchContact' className='label-text'>
                Contact
              </label>
              <input
                type='text'
                id='branchContact'
                name='branchContact'
                value={formData.branchContact}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='branchEmail' className='label-text'>
                Branch Email
              </label>
              <input
                type='email'
                id='branchEmail'
                name='branchEmail'
                value={formData.branchEmail}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='branchFax' className='label-text'>
                Branch Fax
              </label>
              <input
                type='text'
                id='branchFax'
                name='branchFax'
                value={formData.branchFax}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor='branchDescription' className='label-text'>
              Branch Description
            </label>
            <input
              id='branchDescription'
              name='branchDescription'
              value={formData.branchDescription}
              className='input-box'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='branchImage' className='label-text'>
              Branch Image
            </label>
            <input
              type='text'
              id='branchImage'
              name='branchImage'
              value={formData.branchImage}
              onChange={handleChange}
              className='input-box'
            />
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='branchStatus' className='label-text'>
                Status
              </label>
              <select
                id='branchStatus'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                value={formData.branchStatus ? 'Active' : 'Inactive'}
                required
                onChange={
                  (e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      branchStatus: e.target.value === 'Active',
                    })) // Convert string to boolean
                }
              >
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
              </select>
            </div>
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={closeTab}
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
              Back
            </button>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={() => updateBranch(branch.branchId, formData)}
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BranchDetailCard;
