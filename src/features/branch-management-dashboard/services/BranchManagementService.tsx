import { useState } from 'react';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { toast } from 'react-toastify';
import { IBranchAndSales } from '../interfaces/IBranchAndSales';

const useBranchManagementService = () => {
  const http = useAxiosInstance();

  const [allBranchSales, setAllBranchSales] = useState<IBranchAndSales[]>();
  const [loadingAllBranchSales, setLoadingAllBranchSales] =
    useState<boolean>(false);
  const fetchAllBranchSales = async () => {
    setLoadingAllBranchSales(true);
    try {
      const response = await http.get('branch-summary/sales-summary');
      const { data } = response;
      setAllBranchSales(data.data);
      console.log(allBranchSales);
    } catch (error) {
      console.log(error);
      toast.error('error');
    } finally {
      setLoadingAllBranchSales(false);
    }
  };

  return {
    allBranchSales,
    loadingAllBranchSales,
    fetchAllBranchSales,
  };
};

export default useBranchManagementService;
