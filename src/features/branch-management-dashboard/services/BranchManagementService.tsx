import { useState } from 'react';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { toast } from 'react-toastify';
import { IBranchAndSales } from '../interfaces/IBranchAndSales';
import { Branch } from '../interfaces/Branch';
import { BranchSalesDetails } from '../interfaces/BranchSalesDetails';

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

  const [branch, setBranch] = useState<Branch>({} as Branch);

  const fetchBranchById = async (branchId: string) => {
    try {
      const res = await http.get(`/branch/get-by-id/?Id=${parseInt(branchId)}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);
  const [salesSummary, setSalesSummary] = useState<BranchSalesDetails[]>([]);

  const getSalesSummary = async (branchId: string) => {
    setLoading(true);
    try {
      const response = await http.get(
        `/branch-summary/sales-summary/daily/${parseInt(branchId)}`
      );
      console.log(response.data.data);
      setSalesSummary(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allBranchSales,
    loadingAllBranchSales,
    fetchAllBranchSales,
    fetchBranchById,
    loading,
    getSalesSummary,
    salesSummary,
  };
};

export default useBranchManagementService;
