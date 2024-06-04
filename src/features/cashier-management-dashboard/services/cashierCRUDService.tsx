import { useState } from 'react';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { ComponentState, useCashierContext } from '../layouts/AddCashier';
import { validateEmail } from '../utils/validators/EmailValidator';
import { passwordsMatch } from '../utils/validators/PasswordValidator';
import { useNavigate } from 'react-router-dom';
import { Branch } from '../interfaces/Branch';

const useCashierCRUDService = () => {
  const http = useAxiosInstance();
  const [loading, setLoading] = useState(false);
  const { setCurrentComponent } = useCashierContext();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const createCashier = async (employer: CashierDetailsType) => {
    if (
      !employer ||
      !employer.branchId ||
      !employer.employerNicName ||
      !employer.employerFirstName ||
      !employer.employerLastName ||
      !employer.employerPassword ||
      !employer.employerConfirmPassword ||
      !employer.employerEmail ||
      !employer.employerPhone ||
      !employer.employerAddress ||
      !employer.employerSalary ||
      !employer.employerNic ||
      !employer.gender ||
      !employer.dateOfBirth ||
      !employer.role ||
      !employer.pin
    ) {
      toast.error('Please provide all required information.');
      return;
    }

    if (
      !passwordsMatch(
        employer.employerPassword,
        employer.employerConfirmPassword
      )
    ) {
      toast.error('Passwords do not match.');
      return;
    }

    if (
      !['OWNER', 'CASHIER', 'MANAGER'].includes(employer.role.toUpperCase())
    ) {
      toast.error(
        'Invalid role. Role should be either OWNER, CASHIER, or MANAGER.'
      );
      return;
    }

    if (!validateEmail(employer.employerEmail)) {
      toast.error('Invalid email');
      return;
    }

    setLoading(true);
    try {
      const res = await http.post('/employers/save-without-image', employer);

      console.log(res.data);
      if (res.data.code === 201) {
        const createdCashierData = res.data.data;
        setCurrentComponent(ComponentState.BankDetails);
        console.log('Created cashier:', createdCashierData.employerId);
        toast.success('Cashier created successfully!');
        return createdCashierData.employerId;
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create a cashier');
    } finally {
      setLoading(false);
    }
  };

  const [cashierDetails, setCashierDetails] = useState({
    employerNicName: '',
    employerFirstName: '',
    employerLastName: '',
    employerEmail: '',
    employerPhone: '',
    employerPassword: '',
    employerConfirmPassword: '',
    profileImage: '',
    branchId: 0,
    employerNic: '',
    dateOfBirth: new Date(),
    employerAddress: '',
    pin: 0,
    role: 'CASHIER',
    employerSalary: 0,
    gender: 'MALE',
  });

  const fetchCashierById = async (id: Number) => {
    try {
      setLoading(true);
      console.log('Fetching cashier by id', id);
      const res = await http.get('/employers/get-by-id', { params: { id } });
      console.log(res);
      if (res.status === 200) {
        setCashierDetails(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const updateCashier = async (employer: any) => {
    try {
      if (
        !employer ||
        !employer.branchId ||
        !employer.employerNicName ||
        !employer.employerFirstName ||
        !employer.employerLastName ||
        !employer.employerPassword ||
        !employer.employerConfirmPassword ||
        !employer.employerEmail ||
        !employer.employerPhone ||
        !employer.employerAddress ||
        !employer.employerSalary ||
        !employer.employerNic ||
        !employer.gender ||
        !employer.dateOfBirth ||
        !employer.role ||
        !employer.pin
      ) {
        toast.error('Please provide all required information.');
        return;
      }

      // if (   !passwordsMatch(
      //     employer.employerPassword,
      //     employer.employerConfirmPassword
      //   )
      // ) {
      //   toast.error('Passwords do not match.');
      //   return;
      // }

      if (
        !['OWNER', 'CASHIER', 'MANAGER'].includes(employer.role.toUpperCase())
      ) {
        toast.error(
          'Invalid role. Role should be either OWNER, CASHIER, or MANAGER.'
        );
        return;
      }

      if (!validateEmail(employer.employerEmail)) {
        toast.error('Invalid email');
        return;
      }

      setUpdating(true);
      const res = await http.put(
        `/employers/update/${employer.employerId}`,
        employer
      );
      if (res.status === 200) {
        toast.success('Cashier updated successfully!');
        setCurrentComponent(ComponentState.BankDetails);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update cashier');
    } finally {
      setUpdating(false);
    }
  };

  const deleteCashierById = async (id: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete cashier ${id}?`
    );
    if (confirmed) {
      try {
        setLoading(true);
        console.log('Deleting cashier by id', id);
        const res = await http.delete(`/employers/delete-employerId/${id}`);
        console.log(res);
        toast.success('Cashier deleted successfully');
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete cashier');
      } finally {
        setLoading(false);
        navigate('/manager-dashboard/cashiers');
      }
    } else {
      // Show message if user cancels deletion
      toast.info('Deletion canceled.');
    }
  };

  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchAllBranches = async () => {
    try {
      const res = await http.get('/branch/get-all-branches');
      console.log(res);
      setBranches(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch branches');
    }
  };

  return {
    createCashier,
    loading,
    fetchCashierById,
    cashierDetails,
    setCashierDetails,
    updateCashier,
    updating,
    deleteCashierById,
    fetchAllBranches,
    branches,
  };
};
export default useCashierCRUDService;
