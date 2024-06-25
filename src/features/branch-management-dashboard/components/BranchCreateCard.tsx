import React, { ChangeEvent } from 'react';
import useBranchManagementService from '../services/BranchManagementService';
import { useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline } from 'react-icons/io5';

type Props = {};

const BranchCreateCard: React.FC<Props> = () => {
  const {
    setCreateBranchDTO,
    createBranch,
    creating,
    setBranchImageDTO,
    branchImageDTO,
    createBranchDTO,
  } = useBranchManagementService();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setCreateBranchDTO((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBranchImageDTO(file);
          setCreateBranchDTO((prev: any) => ({
            ...prev,
            branchProfileImageUrl: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-lg p-6 w-[700px] border border-gray-200 space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Create New Branch
        </h2>

        {/* Form Inputs */}
        <div className='flex justify-center items-center gap-16'>
          <div className='flex items-center justify-center gap-4 flex-col'>
            {branchImageDTO ? (
              <div className='mt-4'>
                <img
                  src={createBranchDTO.branchProfileImageUrl}
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
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='branchName'
              className='block text-sm font-medium text-gray-700'
            >
              Branch Name
            </label>
            <input
              type='text'
              id='branchName'
              className='input-box'
              onChange={handleInputChange}
            />

            <label
              htmlFor='branchAddress'
              className='block text-sm font-medium text-gray-700'
            >
              Branch Address
            </label>
            <input
              type='text'
              id='branchAddress'
              className='input-box'
              onChange={handleInputChange}
            />

            <label
              htmlFor='branchContact'
              className='block text-sm font-medium text-gray-700'
            >
              Branch Contact
            </label>
            <input
              type='text'
              id='branchContact'
              className='input-box'
              onChange={handleInputChange}
            />

            <label
              htmlFor='branchEmail'
              className='block text-sm font-medium text-gray-700'
            >
              Branch Email
            </label>
            <input
              type='email'
              id='branchEmail'
              className='input-box'
              onChange={handleInputChange}
            />

            <label
              htmlFor='branchLocation'
              className='block text-sm font-medium text-gray-700'
            >
              Branch Location
            </label>
            <input
              type='text'
              id='branchLocation'
              className='input-box'
              onChange={handleInputChange}
            />

            <label
              htmlFor='branchDescription'
              className='block text-sm font-medium text-gray-700'
            >
              Branch Description
            </label>
            <textarea
              id='branchDescription'
              className='input-box h-20 resize-none'
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-center items-center'>
          <button
            type='button'
            className='py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            onClick={createBranch}
          >
            {creating ? 'Creating...' : 'Create Branch'}
          </button>
          <button
            type='button'
            className='ml-2 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400'
            onClick={() => {
              navigate('/manager-dashboard/branches');
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchCreateCard;
