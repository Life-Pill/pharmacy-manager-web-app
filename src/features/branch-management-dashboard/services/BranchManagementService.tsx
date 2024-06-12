import { useState } from 'react';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { toast } from 'react-toastify';
import { IBranchAndSales } from '../interfaces/IBranchAndSales';
import { Branch } from '../interfaces/Branch';
import { BranchSalesDetails } from '../interfaces/BranchSalesDetails';
import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';
import { Item } from '../../item-management-window/interfaces/Item';

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

  //TODO: add cors issue is there
  const [branch, setBranch] = useState<Branch>({} as Branch);

  const fetchBranchById = async (branchId: string) => {
    try {
      const res = await http.get(`/branch/get-by-id/?id=${parseInt(branchId)}`);
      console.log(res);
      setBranch(res.data);
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

  const [branchEmployers, setBranchEmployers] = useState<CashierDetailsType[]>(
    []
  );
  const fetchEmployersByBranchId = async (branchId: string) => {
    try {
      const res = await http.get(
        `/branch/employer/by-branch/${parseInt(branchId)}`
      );
      console.log(res);
      setBranchEmployers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [items, setItems] = useState<Item[]>([]);
  // /lifepill/v1/branch/update-branch/{id}
  const fetchItemsByBranchId = async (branchId: string) => {
    try {
      const res = await http.get(
        `/item/branched/get-item/${parseInt(branchId)}`
      );
      console.log(res.data.data);
      setItems(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [updating, setUpdating] = useState(false);
  const updateBranch = async (id: number, branch: Branch) => {
    try {
      console.log(branch);
      setUpdating(true);
      const res = await http.put(`/branch/update/${id}`, branch);
      console.log(res);

      if (res.status === 200) {
        toast.success('Updated the branch succesfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const [branchManager, setBranchManager] = useState<CashierDetailsType>(
    {} as CashierDetailsType
  );

  const fetchBranchMangerById = async (branchId: string) => {
    try {
      const res = await http.get(
        `/branch-manager/managers/by-branch/${parseInt(branchId)}`
      );
      console.log(res.data);

      if (res.data.code === 200) {
        setBranchManager(res.data.data);
      }
    } catch (error) {
      console.log(error);
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
    fetchEmployersByBranchId,
    branchEmployers,
    branch,
    fetchItemsByBranchId,
    items,
    updating,
    updateBranch,
    fetchBranchMangerById,
    branchManager,
  };
};

export default useBranchManagementService;
