import React, { useState } from 'react';
import { Order } from '../interfaces/OrderDetails';

type Props = {
  order: Order;
};

function OrderCardComponent({ order }: Props) {
  const [viewMore, setViewMore] = useState(false);

  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };
  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <p>At branch #{order.branchId} </p>
      <p>By Employer #{order.employerId} </p>
      <p>On {order.orderDate}</p>
      <p>Total of {order.total}</p>
      {/* <p>Number of Items {order.groupedOrderDetails.orderCount}</p> */}
      {viewMore && (
        <>
          <p>Order Details</p>
          <table className='w-full text-sm text-left rtl:text-right text-slate-950 '>
            <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Item id
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
                  id={orderDetail.id.toString()}
                  className='bg-slate-50 border-b'
                >
                  <td className='px-6 py-4'>{orderDetail.id}</td>
                  <td className='px-6 py-4'>{orderDetail.name}</td>
                  <td className='px-6 py-4'>{orderDetail.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>Payment Details</p>
          <table className='w-full text-sm text-left rtl:text-right text-slate-950 '>
            <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
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
              <tr
                id={order.groupedOrderDetails.orderDetails.toString()}
                className='bg-slate-50 border-b'
              >
                <td className='px-6 py-4'>
                  {order.groupedOrderDetails.paymentDetails.paymentMethod}
                </td>
                <td className='px-6 py-4'>
                  {order.groupedOrderDetails.paymentDetails.paymentAmount}
                </td>
                <td className='px-6 py-4'>
                  {order.groupedOrderDetails.paymentDetails.paymentDate}
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
        </>
      )}
      <button onClick={toggleViewMore}>
        {viewMore ? 'View less' : 'View more'}
      </button>
    </div>
  );
}

export default OrderCardComponent;
