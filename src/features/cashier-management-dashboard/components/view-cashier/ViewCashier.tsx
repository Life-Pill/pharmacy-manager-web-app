import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import Loader from '../../../../shared/Loader';
import useCashierCRUDService from '../../services/cashierCRUDService';
import TableRow from '../../../../shared/TableRow';

type Props = {};

function ViewCashierComponent({}: Props) {
  const { employerId } = useParams();

  const { cashierBankDetails, fetchBankDetailsById } = useBankCRUDService();
  const {
    cashierDetails,
    fetchCashierById,
    deleteCashierById,
    loading,
    fetchImageOfEmployer,
    fetchProfilePicture,
    profileImageUrl,
  } = useCashierCRUDService();

  useEffect(() => {
    console.log(employerId);
    if (employerId) {
      fetchBankDetailsById(parseInt(employerId));
      fetchCashierById(parseInt(employerId));
      fetchImageOfEmployer(parseInt(employerId));
    }
  }, []);

  const deleteCashier = () => {
    if (employerId) {
      deleteCashierById(parseInt(employerId));
    }
  };

  return (
    <div className='flex flex-row-reverse justify-evenly items-center max-h-screen p-8'>
      {/* Image Section */}
      <div className='flex justify-center items-center flex-col gap-2'>
        {fetchProfilePicture ? (
          <Loader />
        ) : (
          <img
            src={
              profileImageUrl ||
              'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
            }
            alt='Profile'
            className='w-64 h-64 rounded-full'
          />
        )}
        <p className='text-lg font-bold mb-2'>
          Employee {cashierDetails.employerFirstName}
        </p>
        <div className='flex items-center justify-center flex-col gap-2'>
          {/* Employment Details Section */}
          <p className='text-lg font-bold mb-2'>Bank Details</p>
          <table className='min-w-full divide-y divide-gray-200 rounded-lg'>
            <tbody className='bg-white divide-y divide-gray-200 rounded-lg'>
              <TableRow
                label='Account Number'
                value={cashierBankDetails.bankAccountNumber}
              />
              <TableRow label='Bank Name' value={cashierBankDetails.bankName} />
              <TableRow
                label='Branch Name'
                value={cashierBankDetails.bankBranchName}
              />

              <TableRow
                label='Base Salary (LKR)'
                value={cashierBankDetails.monthlyPayment}
              />
              <TableRow
                label='Additional Notes'
                value={cashierBankDetails.employerDescription}
              />
            </tbody>
          </table>
        </div>
        <div className='flex justify-center items-center gap-4'>
          <>
            <button
              type='button'
              className=' w-48 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-gray-100 rounded-lg border border-gray hover:bg-gray-400'
            >
              <Link to='/manager-dashboard/cashiers'>Back</Link>
            </button>
            <button
              type='button'
              className=' w-48 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray hover:bg-red-700'
              onClick={deleteCashier}
            >
              Delete Cashier
            </button>
          </>
        </div>
      </div>

      <div className='flex justify-center items-center flex-col gap-2'>
        <p className='text-lg font-bold mb-2'>Employment Information</p>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='bg-white divide-y divide-gray-200'>
            <TableRow label='EmployerID' value={cashierDetails.employerId} />
            <TableRow
              label='First Name'
              value={cashierDetails.employerFirstName}
            />
            <TableRow
              label='Last Name'
              value={cashierDetails.employerLastName}
            />
            <TableRow label='Nic Name' value={cashierDetails.employerNicName} />
            <TableRow label='NIC Number' value={cashierDetails.employerNic} />
            <TableRow label='E-mail' value={cashierDetails.employerEmail} />
            <TableRow
              label='Phone Number'
              value={cashierDetails.employerPhone}
            />
            <TableRow label='Address' value={cashierDetails.employerAddress} />
            <TableRow
              label='Date of Birth'
              value={cashierDetails.dateOfBirth.toString().slice(0, 10)}
            />
            <TableRow
              label='Gender'
              value={cashierDetails.gender.toUpperCase()}
            />
            <TableRow label='Role' value={cashierDetails.role.toUpperCase()} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCashierComponent;
