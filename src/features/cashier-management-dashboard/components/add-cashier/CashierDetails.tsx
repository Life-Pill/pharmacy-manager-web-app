import { ChangeEvent, useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ComponentState, useCashierContext } from '../../layouts/AddCashier';
import useCashierCRUDService from '../../services/cashierCRUDService';

const CashierDetails = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { setCurrentComponent, cashierDetails, setCashierDetails } =
    useCashierContext();

  const {
    createCashier,
    loading,
    fetchAllBranches,
    branches,
    setProfilePicture,
    profilePicture,
  } = useCashierCRUDService();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePicture(file);
          setCashierDetails((prev: any) => ({
            ...prev,
            profileImageUrl: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const goToBankDetails = () => {
    // console.log(cashierDetails);
    createCashier(cashierDetails).then((res: any) => {
      if (res) {
        setCashierDetails({
          ...cashierDetails,
          employerId: res,
        });
      }
    });
  };

  useEffect(() => {
    fetchAllBranches();
  }, []);

  return (
    <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
      <p className='text-2xl font-bold text-center mb-4'>
        Creating A New Cashier
      </p>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-center'>
        <div className='flex items-center justify-center gap-4 flex-col'>
          {profilePicture ? (
            <div className='mt-4'>
              <img
                src={cashierDetails.profileImageUrl}
                alt='Preview'
                className='w-64 h-64 rounded-full'
              />
            </div>
          ) : (
            <div className='mt-4'>
              <img
                src='https://randomuser.me/api/portraits/men/1.jpg'
                alt='Preview'
                className='w-64 h-64 rounded-full'
              />
            </div>
          )}
          <label className='w-64 flex flex-row items-center p-2 justify-center gap-2 bg-white rounded-lg'>
            <IoCloudUploadOutline size={25} />
            <span className='text-base leading-normal'>Select an image</span>
            <input
              type='file'
              className='hidden'
              onChange={handleImageChange}
              accept='image/*'
            />
          </label>
        </div>
        {/* First Column */}
        <div>
          <label
            htmlFor='nickname'
            className='block text-sm font-medium text-black mt-4'
          >
            Nickname
          </label>
          <input
            type='text'
            id='nickname'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerNicName}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerNicName: e.target.value,
              })
            }
          />

          <label
            htmlFor='nicNumber'
            className='block text-sm font-medium text-black mt-4'
          >
            NIC Number
          </label>
          <input
            type='text'
            id='nicNumber'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerNic}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerNic: e.target.value,
              })
            }
          />

          <label
            htmlFor='telephone'
            className='block text-sm font-medium text-black mt-4'
          >
            Telephone Number
          </label>
          <input
            type='tel'
            id='telephone'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerPhone}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerPhone: e.target.value,
              })
            }
            accept='tel'
          />

          <label
            htmlFor='email'
            className='block text-sm font-medium text-black mt-4'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerEmail}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerEmail: e.target.value,
              })
            }
          />

          <label
            htmlFor='firstName'
            className='block text-sm font-medium text-black mt-4'
          >
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerFirstName}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerFirstName: e.target.value,
              })
            }
          />

          <label
            htmlFor='lastName'
            className='block text-sm font-medium text-black mt-4'
          >
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerLastName}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerLastName: e.target.value,
              })
            }
          />
        </div>

        {/* Second Column */}
        <div>
          <label
            htmlFor='branch'
            className='block text-sm font-medium text-black'
          >
            Branch
          </label>
          <select
            id='branch'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.branchId}
            onChange={(e) =>
              setCashierDetails({ ...cashierDetails, branchId: e.target.value })
            }
          >
            {branches.map((branch) => (
              <option value={branch.branchId}>{branch.branchName}</option>
            ))}
          </select>

          <label
            htmlFor='gender'
            className='block text-sm font-medium text-black mt-4'
          >
            Gender
          </label>
          <select
            id='gender'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.gender}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                gender: e.target.value,
              })
            }
          >
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
            <option value='OTHER'>Other</option>
          </select>

          <label
            htmlFor='addressLine'
            className='block text-sm font-medium text-black mt-4'
          >
            Address
          </label>
          <input
            type='text'
            id='addressLine1'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerAddress}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerAddress: e.target.value,
              })
            }
          />

          <label
            htmlFor='dateOfBirth'
            className='block text-sm font-medium text-black mt-4'
          >
            Date of Birth
          </label>
          <input
            type='date'
            id='dateOfBirth'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.dateOfBirth.toISOString().split('T')[0]}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                dateOfBirth: new Date(e.target.value),
              })
            }
          />

          <label
            htmlFor='role'
            className='block text-sm font-medium text-black mt-4'
          >
            Role
          </label>
          <input
            type='text'
            id='role'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.role}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                role: e.target.value,
              })
            }
          />

          <label
            htmlFor='baseSalary'
            className='block text-sm font-medium text-black mt-4'
          >
            Base Salary (LKR)
          </label>
          <input
            type='number'
            id='baseSalary'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerSalary}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerSalary: parseFloat(e.target.value),
              })
            }
            accept='number'
          />
        </div>
        {/* Third Column */}
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-black mt-4'
          >
            Password
          </label>
          <input
            type='text'
            id='password'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.employerPassword}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                employerPassword: e.target.value,
              })
            }
          />

          <label
            htmlFor='pin'
            className='block text-sm font-medium text-black mt-4'
          >
            Pin
          </label>
          <input
            type='number'
            id='pin'
            className='mt-1 p-2 border-gray rounded-md w-64'
            value={cashierDetails.pin}
            onChange={(e) =>
              setCashierDetails({
                ...cashierDetails,
                pin: parseInt(e.target.value),
              })
            }
            accept='number'
          />
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 w-full mt-8'>
        <button
          type='button'
          className='w-48 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
        >
          <Link to='/manager-dashboard/cashiers'>Back</Link>
        </button>
        <button
          type='button'
          className={`w-48 text-white py-2.5 px-5 me-2 mb-2 rounded-lg ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={goToBankDetails}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create'}
        </button>
      </div>
    </div>
  );
};
export default CashierDetails;
