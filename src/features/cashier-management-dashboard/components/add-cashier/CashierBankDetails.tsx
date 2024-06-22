import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCashierContext } from '../../layouts/AddCashier';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import { Link } from 'react-router-dom';

const CashierBankDetails = () => {
  const { cashierDetails, cashierBankDetails, setCashierBankDetails } =
    useCashierContext();
  const { updateBankDetails, loading } = useBankCRUDService();

  useEffect(() => {
    setCashierBankDetails({
      ...cashierBankDetails,
      employerId: cashierDetails.employerId,
      monthlyPayment: cashierDetails.employerSalary,
    });
  }, []);

  const goToSummary = () => {
    console.log('Summary', cashierDetails);
    if (cashierDetails && cashierDetails.employerId) {
      updateBankDetails(cashierBankDetails, cashierDetails.employerId);
    } else {
      toast.error('No cashier created yet.');
    }
  };

  return (
    <div className='w-full p-6 md:p-8 lg:p-10 bg-slate-200 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Employee Bank Details
      </h2>

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
            className='mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500'
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
            className='mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500'
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
            className='mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500'
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
            className='mt-1 p-3 border border-gray-300 rounded-md w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-500'
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
            Base Salary (LKR)
          </label>
          <input
            type='text'
            id='baseSalary'
            className='mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-100'
            value={cashierDetails.employerSalary}
            readOnly
          />
        </div>
      </div>

      <div className='flex justify-center mt-6'>
        <button
          type='button'
          className='w-48 py-2.5 px-5 me-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
        >
          <Link to='/manager-dashboard/cashiers'>Back</Link>
        </button>
        <button
          type='button'
          className={`py-2.5 px-5 rounded-lg text-white w-48 ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={goToSummary}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default CashierBankDetails;
