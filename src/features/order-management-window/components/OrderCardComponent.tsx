import React, { useState } from 'react';
import { Order } from '../interfaces/OrderDetails';
import { formatDate } from '../utils/formatDate';

type Props = {
  order: Order;
};

function OrderCardComponent({ order }: Props) {
  const [viewMore, setViewMore] = useState(false);

  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <div className='bg-white shadow-md rounded-lg p-4 border mx-16 mt-2'>
      <div className='flex items-center justify-between'>
        <div className='flex justify-end flex-col'>
          <p className='text-gray-700'>
            At Branch <span className=' font-semibold'>#{order.branchId}</span>
          </p>
          <p className='text-gray-700'>
            By Employer{' '}
            <span className=' font-semibold'>#{order.employerId}</span>
          </p>
        </div>
        <div className='flex flex-col justify-end'>
          <p className='text-gray-700'>On {formatDate(order.orderDate)}</p>
          <p className='text-gray-700'>
            Total of{' '}
            <span className=' font-semibold'>LKR {order.total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* <p>Number of Items {order.groupedOrderDetails.orderCount}</p> */}
      {viewMore && (
        <>
          <p className='text-gray-700 font-bold mb-2'>Order Details</p>
          <table className='w-full text-sm text-left rtl:text-right text-gray-600'>
            <thead className='text-xs font-semibold uppercase bg-gray-200 sticky top-0'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Item ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {order.groupedOrderDetails.orderDetails.map((orderDetail) => (
                <tr
                  key={orderDetail.id.toString()}
                  className='bg-white border-b border-gray-200'
                >
                  <td className='px-6 py-4'>{orderDetail.id}</td>
                  <td className='px-6 py-4'>{orderDetail.name}</td>
                  <td className='px-6 py-4'>{orderDetail.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className='text-gray-700 font-bold mb-2'>Payment Details</p>
          {order.groupedOrderDetails.paymentDetails ? (
            <table className='w-full text-sm text-left rtl:text-right text-gray-600'>
              <thead className='text-xs font-semibold uppercase bg-gray-200 sticky top-0'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Payment Method
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Amount
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Notes
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Discount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='px-6 py-4'>
                    {order.groupedOrderDetails.paymentDetails.paymentMethod}
                  </td>
                  <td className='px-6 py-4'>
                    {order.groupedOrderDetails.paymentDetails.paymentAmount}
                  </td>
                  <td className='px-6 py-4'>
                    {order.groupedOrderDetails.paymentDetails.paymentDate.slice(
                      0,
                      10
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {order.groupedOrderDetails.paymentDetails.paymentNotes}
                  </td>
                  <td className='px-6 py-4'>
                    {order.groupedOrderDetails.paymentDetails.paymentDiscount}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className='text-gray-500 italic mt-2'>No payment details available</p>
          )}
        </>
      )}
      <button
        type='button'
        className='mt-4 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600'
        onClick={toggleViewMore}
      >
        {viewMore ? 'View less' : 'View more'}
      </button>
    </div>
  );
}

export default OrderCardComponent;
