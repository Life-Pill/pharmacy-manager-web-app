import React, { useEffect } from 'react';
import useOrderManagementService from '../services/OrderManagementServices';
import OrderCardComponent from '../components/OrderCardComponent';
import Loader from '../../../shared/Loader';

type Props = {};

function OrderManagementWindow({}: Props) {
  const { loading, orderData, fetchOrderData } = useOrderManagementService();

  useEffect(() => {
    fetchOrderData();
  }, []);
  return (
    <div className='max-h-screen overflow-y-scroll'>
      {loading ? (
        <Loader />
      ) : (
        orderData?.map((order) => <OrderCardComponent order={order} />)
      )}
    </div>
  );
}

export default OrderManagementWindow;
