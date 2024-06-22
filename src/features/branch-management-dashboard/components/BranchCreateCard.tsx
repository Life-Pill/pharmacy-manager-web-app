import React from 'react';

type Props = {};

function BranchCreateCard({}: Props) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200 space-y-2'></div>
    </div>
  );
}

export default BranchCreateCard;
