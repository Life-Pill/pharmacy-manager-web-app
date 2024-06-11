import React from 'react';
import { Item } from '../../item-management-window/interfaces/Item';

type Props = {
  items: Item[];
};

function ItemsTable({ items }: Props) {
  return (
    <>
      <p>Items Available In Branch</p>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Medicine ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Image
            </th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Quantity
            </th>
            <th scope='col' className='px-6 py-3'>
              Expire On
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((medicine) => (
            <tr className='bg-slate-50 border-b' key={medicine.itemId}>
              <td className='px-6 py-4'>{medicine.itemId}</td>
              <td className='px-6 py-4'>{medicine.itemImage}</td>
              <td className='px-6 py-4'>{medicine.itemName}</td>
              <td className='px-6 py-4'>{medicine.sellingPrice}</td>
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
              <td className='px-6 py-4'>{medicine.expireDate.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ItemsTable;
