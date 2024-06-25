import { useState } from 'react';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { toast } from 'react-toastify';
import { IBranchAndSales } from '../interfaces/IBranchAndSales';
import { Branch } from '../interfaces/Branch';
import { BranchSalesDetails } from '../interfaces/BranchSalesDetails';
import { CashierDetailsType } from '../../cashier-management-dashboard/interfaces/CashierDetailsType';
import { Item } from '../../item-management-window/interfaces/Item';
import { ChangeBranchManagerDTO } from '../interfaces/ChangeBranchManagerDTO';
import { CreateBranchDTO } from '../interfaces/CreateBranchDTO';
import { useNavigate } from 'react-router-dom';

const useBranchManagementService = () => {
  const http = useAxiosInstance();

  const [allBranchSales, setAllBranchSales] = useState<IBranchAndSales[]>();
  const [loadingAllBranchSales, setLoadingAllBranchSales] =
    useState<boolean>(false);
  const fetchAllBranchSales = async () => {
    setLoadingAllBranchSales(true);
    try {
      const response = await http.get('/branch-summary/sales-summary');
      const { data } = response;
      console.log(response);
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
  const [branchManagerFetching, setBranchManagerFetching] = useState(false);

  const fetchBranchMangerById = async (branchId: string) => {
    try {
      setBranchManagerFetching(true);
      console.log(branchId);
      const res = await http.get(
        `/branch-manager/managers/by-branch/${parseInt(branchId)}`
      );
      console.log(res.data.data[0]);

      if (res.data.code === 200) {
        setBranchManager(res.data.data[0]);
        // toast.success('Fetched the branch manager successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBranchManagerFetching(false);
    }
  };

  const [branchImage, setBranchImage] = useState<any>();
  const [branchImageFetch, setBranchImageFetch] = useState(false);
  const fetchBranchImage = async (branchId: number) => {
    try {
      setBranchImageFetch(true);
      const res = await http.get(
        `/branch/view-branch-profile-image/${branchId}`,
        {
          responseType: 'arraybuffer', // Ensure response type is set correctly
        }
      );
      console.log(res);
      const base64String = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      setBranchImage(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {
      console.log(error);
    } finally {
      setBranchImageFetch(false);
    }
  };

  const [branchImageUpdate, setBranchImageUpdate] = useState<File | null>();
  const [updatingImage, setUpdatingImage] = useState(false);
  const updateBranchImage = async (branchId: number) => {
    const updateImageFormData = new FormData();
    if (branchImageUpdate) {
      updateImageFormData.append(
        'file',
        branchImageUpdate,
        branchImageUpdate?.name
      );
    } else {
      toast.warning('Please select a image');
    }
    try {
      setUpdatingImage(true);
      const res = await http.put(
        `/branch/update-branch-profile-image/${branchId}`,
        updateImageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res);
      toast.success('Updated the branch image successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingImage(false);
    }
  };

  const [updatingManager, setUpdatingMaager] = useState(false);
  const changeBranchManagerMethod = async (
    branchMaagerDTO: ChangeBranchManagerDTO
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to change the manager to ${branchMaagerDTO.newManagerId}?`
    );

    if (!confirmed) {
      return; // If not confirmed, exit the function
    }
    try {
      setUpdatingMaager(true);
      const res = await http.post(
        '/branch-manager/change-manager',
        branchMaagerDTO
      );
      console.log(res);
      if (res.data.code === 200) {
        toast.success(`${branchMaagerDTO.newManagerId} is now the manager`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while updating the manager');
    } finally {
      setUpdatingMaager(false);
    }
  };

  const [createBranchDTO, setCreateBranchDTO] = useState<CreateBranchDTO>({
    branchId: 0,
    branchName: '',
    branchAddress: '',
    branchContact: '',
    branchEmail: '',
    branchDescription: '',
    branchStatus: true,
    branchLocation: '',
    branchCreatedOn: '',
    branchCreatedBy: '',
    branchProfileImageUrl: '',
  });

  const [creating, setCreating] = useState(false);
  const [branchImageDTO, setBranchImageDTO] = useState<File | null>();
  const navigate = useNavigate();
  const createBranch = async () => {
    try {
      setCreating(true);
      const formData = new FormData();
      formData.append('branchS3DTO', JSON.stringify(createBranchDTO));

      formData.append('file', branchImageDTO as File, branchImageDTO?.name);
      const res = await http.post('/branch/save-branch', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      if (res.data.code === 201) {
        toast.success('Branch created successfully');
        navigate('/manager-dashboard/branches');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while creating the branch');
    } finally {
      setCreating(false);
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
    branchImage,
    fetchBranchImage,
    branchImageUpdate,
    setBranchImageUpdate,
    setBranch,
    updateBranchImage,
    updatingImage,
    changeBranchManagerMethod,
    updatingManager,
    branchManagerFetching,
    branchImageFetch,
    setCreateBranchDTO,
    createBranch,
    creating,
    setBranchImageDTO,
    branchImageDTO,
    createBranchDTO,
  };
};

export default useBranchManagementService;
