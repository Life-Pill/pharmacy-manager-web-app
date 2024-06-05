import { Branch } from '../interfaces/Branch';

type Props = {
  branch: Branch;
  closeTab: () => void;
};

function BranchDetailCard({ branch, closeTab }: Props) {
  return (
    <div className='bg-white shadow-md fixed z-50 w-1/2'>
      <div className='bg-gray-700 p-4 text-white'>
        <h2 className='text-xl font-bold'>{branch.branchName}</h2>
        <p>{branch.branchLocation}</p>
      </div>
      <div className='p-4'>
        <div className='mb-5 flex flex-row gap-4 items-center'>
          <label
            htmlFor='branchContact'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Contact
          </label>
          <input
            type='branchContact'
            id='branchContact'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchContact}
            required
          />

          <label
            htmlFor='branchFax'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Fax
          </label>
          <input
            type='branchFax'
            id='branchFax'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchFax}
            required
          />
        </div>

        <div className='mb-5 flex flex-row gap-4 items-center'>
          <label
            htmlFor='branchEmail'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Email
          </label>
          <input
            type='branchEmail'
            id='branchEmail'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchEmail}
            required
          />
        </div>

        <div className='mb-5 flex flex-row gap-4 items-center'>
          <label
            htmlFor='branchDescription'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Description
          </label>
          <input
            type='textarea'
            id='branchDescription'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchDescription}
            required
          />
        </div>

        <div className='mb-5 flex flex-row gap-4 items-center'>
          <label
            htmlFor='branchStatus'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Status
          </label>
          <select
            id='branchStatus'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchStatus ? 'Active' : 'Inactive'}
            required
          >
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </div>

        <div className='mb-5 flex flex-row gap-4 items-center'>
          <label
            htmlFor='branchLocation'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Location
          </label>
          <input
            type='branchLocation'
            id='branchLocation'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            value={branch.branchLocation}
          />
        </div>

        <div className='mb-5 flex flex-row gap-4 items-center'>
          <label
            htmlFor='branchCreatedOn'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            CreatedOn
          </label>
          <input
            type='date'
            id='branchCreatedOn'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchCreatedOn}
          />
          <label
            htmlFor='text'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Created by
          </label>
          <input
            type='text'
            id='branchCreatedBy'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={branch.branchCreatedBy}
            required
          />
        </div>
        <div className='flex flex-row items-center gap-8 justify-center'>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={closeTab}
          >
            Close
          </button>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default BranchDetailCard;
