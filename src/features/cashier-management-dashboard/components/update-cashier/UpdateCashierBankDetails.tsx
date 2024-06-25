import { useEffect } from 'react';
import { useCashierContext, ComponentState } from '../../layouts/AddCashier';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import useCashierCRUDService from '../../services/cashierCRUDService';
import { useParams } from 'react-router-dom';

const UpdateCashierBankDetails = () => {
  const { employerId } = useParams();
  const { setCurrentComponent } = useCashierContext();
  const {
    updateBankDetails,
    fetchBankDetailsById,
    cashierBankDetails,
    setCashierBankDetails,
  } = useBankCRUDService();

  const { fetchCashierById, cashierDetails } = useCashierCRUDService();
  const goToSummary = () => {
    if (employerId) {
      updateBankDetails(cashierBankDetails, parseInt(employerId));
    }
  };
  const goToBack = () => {
    setCurrentComponent(ComponentState.Details);
  };

  useEffect(() => {
    if (employerId) {
      fetchCashierById(parseInt(employerId as string));

      fetchBankDetailsById(parseInt(employerId));
    }
  }, []);

  return (
    <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
      {/* First Column */}

      <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
        {/* First Column */}
        <div>
          <label
            htmlFor='bankName'
            className='block text-sm font-medium text-black mt-4'
          >
            Bank Name
          </label>
          <input
            type='text'
            id='bankName'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.bankName}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                bankName: e.target.value,
              })
            }
          />

          <label
            htmlFor='branchName'
            className='block text-sm font-medium text-black mt-4'
          >
            Branch Name
          </label>
          <input
            type='text'
            id='branchName'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.bankBranchName}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                bankBranchName: e.target.value,
              })
            }
          />

          <label
            htmlFor='accountNumber'
            className='block text-sm font-medium text-black mt-4'
          >
            Account Number
          </label>
          <input
            type='number'
            id='accountNumber'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.bankAccountNumber}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                bankAccountNumber: parseInt(e.target.value),
              })
            }
          />

          <label
            htmlFor='additionalNotes'
            className='block text-sm font-medium text-black mt-4'
          >
            Additional Notes
          </label>
          <textarea
            id='additionalNotes'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.employerDescription}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                employerDescription: e.target.value,
              })
            }
          ></textarea>

          <label
            htmlFor='baseSalary'
            className='block text-sm font-medium text-black mt-4'
          >
            Base Salary
          </label>
          <input
            type='text'
            id='baseSalary'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierDetails.employerSalary}
            readOnly
          />
        </div>
      </div>

      <div className='flex items-center justify-center gap-8 w-full'>
        <button
          type='button'
          className='text-white bg-blue-500 hover:bg-blue-600 font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
          onClick={goToSummary}
        >
          Create & Continue
        </button>
        <button
          type='button'
          className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-gray-300 rounded-lg border border-gray hover:bg-gray-500'
          onClick={goToBack}
        >
          Back To Details Page
        </button>
      </div>
    </div>
  );
};

export default UpdateCashierBankDetails;
