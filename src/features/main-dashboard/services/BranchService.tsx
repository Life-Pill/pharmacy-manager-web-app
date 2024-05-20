import { useState } from 'react';
import { IAllBranchDetails } from '../interfaces/IAllBranchDetails';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { toast } from 'react-toastify';

const useBranchService = () => {
  const [allBranchData, setAllBranchData] = useState<IAllBranchDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const http = useAxiosInstance();

  const fetchAllBranchDataSummary = async () => {
    setLoading(true);

    try {
      const res = await http.get('branch-summary/all-branches-summary');
      console.log(res.data);
      const { data } = res;
      setAllBranchData(data.data);
      console.log(allBranchData);
    } catch (error) {
      console.log(error);
      toast.error('error');
    } finally {
      setLoading(false);
    }
  };

  return {
    allBranchData,
    loading,
    fetchAllBranchDataSummary,
  };
};

export default useBranchService;
