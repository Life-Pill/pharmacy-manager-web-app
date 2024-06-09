import { useState } from 'react';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { Order } from '../interfaces/OrderDetails';
import { Branch } from '../../branch-management-dashboard/interfaces/Branch';

const useOrderManagementService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();
  const [orderData, setOrderData] = useState<Order[]>();
  const [filteredOrderData, setFilteredOrderData] = useState<Order[]>();

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const res = await http.get('/order/getAllOrdersWithDetails');
      console.log(res.data.data);
      setOrderData(res.data.data);
      setFilteredOrderData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(orderData);
      setLoading(false);
    }
  };

  const [branches, setBranches] = useState<Branch[]>();

  const fetchAllBranches = async () => {
    try {
      const res = await http.get('/branch/get-all-branches');
      console.log(res);
      setBranches(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    orderData,
    fetchOrderData,
    setFilteredOrderData,
    filteredOrderData,
    branches,
    fetchAllBranches,
  };
};

export default useOrderManagementService;
