import { useState } from 'react';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { BranchSalesData } from '../interfaces/BranchSales';

const useSummaryService = () => {
  const http = useAxiosInstance();

  const [branchSalesOrders, setBranchSalesOrders] = useState(
    [] as BranchSalesData[]
  );
  const [filterBranchSalesData, setFilterBranchSalesData] = useState(
    [] as BranchSalesData[]
  );

  const getAllBranchesSales = async () => {
    try {
      const res = await http.get(
        '/branch/summary/daily-sales'
      );

      console.log(res.data.data);
      setBranchSalesOrders(res.data.data);
      setFilterBranchSalesData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllBranchesSales,
    branchSalesOrders,
    filterBranchSalesData,
  };
};

export default useSummaryService;
