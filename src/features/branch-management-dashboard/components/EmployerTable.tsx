import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';
import { useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsEye, BsTrash } from 'react-icons/bs';
import { useEffect, useState } from 'react';

type Props = {
  branchEmployers: CashierDetailsType[];
};

function EmployerTable({ branchEmployers }: Props) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onUpdateClick = (employer: CashierDetailsType) => {
    console.log(employer.employerId);
    navigate(`/update-cashier/${employer.employerId}`);
  };

  const onViewClick = (employer: CashierDetailsType) => {
    console.log(employer.employerId);
    navigate(`/view-cashier/${employer.employerId}`);
  };

  const filteredEmployers = branchEmployers.filter((employer) =>
    employer.employerFirstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='flex justify-between items-center'>
        <p className='text-lg font-semibold text-gray-800'>
          Employer in the branch
        </p>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search by name...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
      </div>

      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Cashier ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Gender
            </th>
            <th scope='col' className='px-6 py-3'>
              Phone Number
            </th>
            <th scope='col' className='px-6 py-3'>
              Active Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Monthly Payment Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Salary
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployers.map((worker) => (
            <tr
              className='bg-slate-50 border-b'
              id={worker.employerId.toString()}
            >
              <td className='px-6 py-4'>{worker.employerId}</td>
              <td className='px-6 py-4'>{worker.employerFirstName}</td>
              <td className='px-6 py-4'>{worker.gender.toLocaleLowerCase()}</td>
              <td className='px-6 py-4'>{worker.employerPhone}</td>
              <td className='px-6 py-4'>
                {
                  <div
                    className={`rounded-full p-1 w-24 flex items-center justify-center ${
                      worker.activeStatus ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  >
                    <span
                      className={`${
                        worker.activeStatus ? 'text-white' : 'text-black'
                      }`}
                    >
                      {worker.activeStatus ? 'Online' : 'Offline'}
                    </span>
                  </div>
                }
              </td>
              <td className='px-6 py-4'>
                {
                  <div
                    className={`rounded-full p-1 w-24 flex items-center justify-center ${
                      worker.activeStatus ? 'bg-green-500' : 'bg-red'
                    }`}
                  >
                    <span
                      className={`${
                        worker.activeStatus ? 'text-white' : 'text-black'
                      }`}
                    >
                      {worker.activeStatus ? 'Paid' : 'Not Paid'}
                    </span>
                  </div>
                }
              </td>
              <td className='px-6 py-4'>{worker.employerSalary}</td>
              <td className='px-6 py-4'>
                <button
                  className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                  onClick={() => {
                    onUpdateClick(worker);
                  }}
                >
                  <BsPencilSquare className=' text-blue-500 font-bold text-lg' />
                </button>
                {/* View Button */}
                <button
                  className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                  onClick={() => {
                    onViewClick(worker);
                  }}
                >
                  <BsEye className='text-blue-500 font-bold text-lg' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployerTable;
