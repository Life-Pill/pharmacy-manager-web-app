import React, { useState } from 'react';
import { Item } from '../../item-management-window/interfaces/Item';

type Props = {
  items: Item[];
};

function ItemsTable({ items }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const dateA = new Date(a.expireDate).getTime();
    const dateB = new Date(b.expireDate).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <p className='text-lg font-semibold text-gray-800'>
          Items in the branch
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

      <table className='w-full text-sm text-left rtl:text-right text-slate-700'>
        <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Medicine ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Description
            </th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Price (LKR) per Unit
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Quantity
            </th>
            <th
              scope='col'
              className='px-6 py-3 cursor-pointer'
              onClick={toggleSortOrder}
            >
              Expire On
              {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((medicine) => (
            <tr className='bg-slate-50 border-b' key={medicine.itemId}>
              <td className='px-6 py-4'>{medicine.itemId}</td>
              <td className='px-6 py-4'>{medicine.itemDescription}</td>
              <td className='px-6 py-4'>{medicine.itemName}</td>
              <td className='px-6 py-4'>
                <strong>{medicine.sellingPrice} </strong>per{' '}
                {medicine.measuringUnitType}
              </td>
              <td className='px-6 py-4'>
                <div
                  className={`rounded-full p-1 w-24 flex items-center justify-center ${
                    medicine.itemQuantity > 0 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  <span
                    className={`${
                      medicine.itemQuantity > 0 ? 'text-white' : 'text-black'
                    }`}
                  >
                    {medicine.itemQuantity > 0 ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
              </td>
              <td className='px-6 py-4'>
                <div
                  className={`rounded-full p-1 w-24 flex items-center justify-center ${
                    medicine.itemQuantity > 0 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  <span
                    className={`${
                      medicine.itemQuantity > 0 ? 'text-white' : 'text-black'
                    }`}
                  >
                    {medicine.itemQuantity}
                  </span>
                </div>
              </td>
              <td
                className={`px-6 py-4 ${
                  new Date(medicine.expireDate) < new Date()
                    ? 'text-red-500'
                    : ''
                }`}
              >
                {medicine.expireDate.split('T')[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ItemsTable;
