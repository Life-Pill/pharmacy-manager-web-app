import { useState } from 'react';
import { IAllBranchDetails } from '../interfaces/IAllBranchDetails';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { toast } from 'react-toastify';

const useBranchService = () => {
  const [allBranchData, setAllBranchData] = useState<IAllBranchDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserContext();
  const http = useAxiosInstance();

  const fetchAllBranchDataSummary = async () => {
    setLoading(true);

    try {
      const res = await http.get('branch-summary/all-branches-summary');
      console.log(res.data);
      setAllBranchData(res.data);
      console.log(allBranchData);
    } catch (error) {
      console.log(error);
      toast.error(error as string);
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
