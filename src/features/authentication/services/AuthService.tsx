import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../../services/useAxiosInstance';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeResponseToIEmployee';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setCookie } = useUserContext();
  const http = useAxiosInstance();

  const login = async (username: string, password: string) => {
    setLoading(true);

    try {
      const res = await http.post('auth/authenticate', {
        employerEmail: username,
        employerPassword: password,
      });
      console.log(res.data);

      if (
        res.data.authenticationResponse.message === 'Successfully logged in.'
      ) {
        alert('Logged in successfully');
        const employee = mapEmployeeReponseToIEmployee(
          res.data.employerDetails
        );
        console.log(employee);

        // Set user data or store cookie if needed
        setCookie(res.data.authenticationResponse.access_token);

        return employee;
      }
    } catch (error) {
      console.log(error);
      alert('Incorrect password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Call the API to logout
  };

  return {
    login,
    logout,
    loading,
  };
};
