import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';

function useAxiosInstance() {
  const { cookie } = useUserContext();
  const instance = axios.create({
    baseURL: 'http://localhost:8081/lifepill/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHRAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJST0xFX09XTkVSIiwiaWF0IjoxNzE2MTQ4OTQyLCJleHAiOjE3MTYyMzUzNDJ9.BAcUP8QSd7ngHotYYmQUe-Tbh_eS2OSBFSABAnTiH04`,
    },
  });

  useEffect(() => {
    console.log(cookie);
    instance.interceptors.response.use(
      (response) => {
        // Handle successful responses
        return response;
      },
      (error) => {
        // Handle error responses
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Response error status:', error.response.status);
          console.log('Response error data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request error:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }, [instance]);

  return instance;
}

export default useAxiosInstance;
