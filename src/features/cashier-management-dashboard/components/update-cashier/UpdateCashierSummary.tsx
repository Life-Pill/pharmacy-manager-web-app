import { Link, useParams } from 'react-router-dom';
import { useCashierContext, ComponentState } from '../../layouts/AddCashier';
import { useEffect } from 'react';
import useCashierCRUDService from '../../services/cashierCRUDService';
import useBankCRUDService from '../../services/BankDetailsCRUDService';

const UpdateCashierSummary = () => {
  const { employerId } = useParams();

  const { cashierDetails, fetchCashierById } = useCashierCRUDService();
  const { cashierBankDetails, fetchBankDetailsById } = useBankCRUDService();
  const { setCurrentComponent } = useCashierContext();

  useEffect(() => {
    if (employerId) {
      fetchCashierById(parseInt(employerId as string));
      fetchBankDetailsById(parseInt(employerId as string));
    }
  }, []);

  const goToBack = () => {
    setCurrentComponent(ComponentState.BankDetails);
  };

  return (
    <div className='flex justify-center items-stretch flex-col h-screen p-32'>
      <p className='text-2xl font-semibold mb-4 text-gray-900 mx-auto'>
        Employer Details Summary
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 justify-between'>
        <div className='bg-white shadow-lg rounded-md p-6'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900'>
            Personal Information
          </h2>
          <div className='space-y-4'>
            <p className='text-gray-800'>
              <span className='font-semibold'>Name:</span>{' '}
              {cashierDetails.employerFirstName}{' '}
              {cashierDetails.employerLastName}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Nickname:</span>{' '}
              {cashierDetails.employerNicName}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Email:</span>{' '}
              {cashierDetails.employerEmail}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Phone Number:</span>{' '}
              {cashierDetails.employerPhone}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Address Line 1:</span>{' '}
              {cashierDetails.employerAddress}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Date of Birth:</span>{' '}
              {cashierDetails.dateOfBirth.split('T')[0]}
            </p>
          </div>
        </div>
        <div className='bg-white shadow-lg rounded-md p-6'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900'>
            Employment Details
          </h2>
          <div className='space-y-4'>
            <p className='text-gray-800'>
              <span className='font-semibold'>Role:</span> {cashierDetails.role}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Assign Branch:</span>{' '}
              {cashierDetails.branchId}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Base Salary:</span>{' '}
              {cashierDetails.employerSalary}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Bank Account Number:</span>{' '}
              {cashierBankDetails.bankAccountNumber}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Bank Name:</span>{' '}
              {cashierBankDetails.bankName}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Branch Name:</span>{' '}
              {cashierBankDetails.bankBranchName}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Additional Notes:</span>{' '}
              {cashierBankDetails.employerDescription}
            </p>
            <p className='text-gray-800'>
              <span className='font-semibold'>Monthly Payment:</span>{' '}
              {cashierBankDetails.monthlyPayment}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 mt-4 gap-8'>
        <Link
          to='/manager-dashboard/cashiers'
          className='text-white bg-blue-500 hover:bg-blue-600 font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out text-center md:text-left'
        >
          Confirm and Update
        </Link>
        <button
          type='button'
          className='text-blue-500 hover:text-blue-600 font-medium py-3 px-8 rounded-lg border border-blue-500 hover:bg-blue-50 transition duration-300 ease-in-out'
          onClick={goToBack}
        >
          Go To Bank Details
        </button>
      </div>
    </div>
  );
};

export default UpdateCashierSummary;
