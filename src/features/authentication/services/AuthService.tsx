import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeResponseToIEmployee';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { IEmployeeInterface } from '../../../interfaces/IEmployeeInterface';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setCookie, setUser, user } = useUserContext();
  const http = useAxiosInstance();
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setLoading(true);

    try {
      const res = await http.post('/auth/authenticate', {
        employerEmail: username,
        employerPassword: password,
      });
      console.log(res);

      if (
        res.data.authenticationResponse.message === 'Successfully logged in.'
      ) {
        const employee = mapEmployeeReponseToIEmployee(
          res.data.employerDetails
        );
        // console.log(employee);
        setUser(employee);
        if (employee.role.toLocaleLowerCase() === 'owner') {
          toast.success('Logged in as owner');
          navigate('/dashboard');
          //store cookie and user in local storage
          localStorage.setItem('user', JSON.stringify(employee));
          setCookie(res.data.authenticationResponse.access_token);
          Cookies.set('Auth', res.data.authenticationResponse.access_token, {
            expires: 7,
          });
        } else {
          toast.error('Authentication failed: Incorrect username or password');
        }
        return employee;
      }
    } catch (error) {
      console.log(error);
      toast.error('error');
    } finally {
      setLoading(false);
    }
  };

  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const logout = async () => {
    try {
      setLoggingOut(true);
      const res = await http.post('/auth/logout', {
        username: user?.employerEmail,
      });

      if (res.status === 200) {
        navigate('/');
        toast.success('Logged out successfully');
        setUser({} as IEmployeeInterface);
        setCookie('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoggingOut(false);
    }
  };

  return {
    login,
    loading,
    logout,
    loggingOut,
  };
};

export default useAuth;
