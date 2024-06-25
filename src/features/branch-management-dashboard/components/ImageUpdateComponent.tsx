import React, { ChangeEvent, useEffect, useState } from 'react';
import useBranchManagementService from '../services/BranchManagementService';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Loader from '../../../shared/Loader';

type Props = {
  onClose: () => void;
  branchId: string;
};

function ImageUpdateComponent({ onClose, branchId }: Props) {
  const {
    fetchBranchImage,
    branchImage,
    setBranchImageUpdate,
    branchImageUpdate,
    setBranch,
    branch,
    updateBranchImage,
    updatingImage,
    branchImageFetch,
  } = useBranchManagementService();

  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    fetchBranchImage(parseInt(branchId));
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBranchImageUpdate(file);
          setUpdateImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200 space-y-8'>
        <h2 className='text-lg font-semibold mb-4 text-white'>
          Branch Image Update
        </h2>

        <div className='flex justify-center items-center flex-col gap-8'>
          <div className='mt-4'>
            {updateImage ? (
              <img
                src={
                  branchImageUpdate
                    ? URL.createObjectURL(branchImageUpdate)
                    : ''
                }
                alt='Preview'
                className='w-64 h-64 rounded-full'
              />
            ) : branchImageFetch ? (
              <Loader />
            ) : (
              <img
                src={
                  branchImage ||
                  'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
                }
                alt='Profile'
                className='w-64 h-64 rounded-full'
              />
            )}
          </div>

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

        <div className='flex justify-between'>
          <button
            type='button'
            onClick={onClose}
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            Back
          </button>
          <button
            type='button'
            className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={() => updateBranchImage(parseInt(branchId))}
          >
            {updatingImage ? <Loader /> : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpdateComponent;
