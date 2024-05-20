import { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';

const useCashierService = () => {
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<CashierDetailsType[]>([]);
  const http = useAxiosInstance();
  const [filteredCashiers, setFilteredCashiers] = useState<
    CashierDetailsType[]
  >([]);

  const fetchEmployeeData = async () => {
    try {
      const res = await http.get('/employers/get-all-employers');
      console.log(res);
      const data: CashierDetailsType[] = res.data.data;
      // if (data.length === 0) return [];
      setWorkers(data);
      setFilteredCashiers(data);
      // return data;
    } catch (error) {
      console.error(error);
      toast.error('Error while fetching all employers');
    }
  };

  return {
    fetchEmployeeData,
    loading,
    workers,
    setWorkers,
    filteredCashiers,
    setFilteredCashiers,
  };
};

export default useCashierService;
