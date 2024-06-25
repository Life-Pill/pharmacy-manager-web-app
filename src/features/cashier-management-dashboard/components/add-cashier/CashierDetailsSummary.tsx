import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentState, useCashierContext } from '../../layouts/AddCashier';
import TableRow from '../../../../shared/TableRow';

function CashierDetailsSummary() {
  const { cashierDetails, setCurrentComponent, cashierBankDetails } =
    useCashierContext();

  const goToBankDetails = () => {
    setCurrentComponent(ComponentState.BankDetails);
  };

  return (
    <div className='flex flex-row-reverse justify-evenly items-center max-h-screen p-8'>
      {/* Image Section */}
      <div className='flex justify-center items-center flex-col gap-2'>
        <img
          src={cashierDetails.profileImageUrl} // Assuming profileImage is an array of strings (URLs)
          alt='Profile'
          className=' h-56 w-56 rounded-full object-cover mr-2'
        />
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
          <button
            type='button'
            className=' w-32 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-500 focus:outline-none bg-white rounded-lg border border-gray hover:bg-slate-100'
          >
            <Link to='/manager-dashboard/cashiers'>Finish</Link>
          </button>
          <button
            type='button'
            className='text-white bg-blue-500 hover:bg-blue-600 font-medium py-2.5 px-5 me-2 mb-2 rounded-lg w-32'
            onClick={goToBankDetails}
          >
            Back
          </button>
        </div>
      </div>

      {/* Personal Information Section */}

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

      {/* Buttons */}
    </div>
  );
}

export default CashierDetailsSummary;
