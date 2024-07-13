import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { getCookie } from '../utils/getCookie';

function useAxiosInstance() {
  const { cookie } = useUserContext();
  const instance = axios.create({
    baseURL: 'http://54.158.221.104/lifepill/v1',
    // baseURL: '/lifepill/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('Auth')}`,
    },
  });

  console.log(getCookie('Auth'));

  useEffect(() => {
    // Update instance headers when cookie changes
    instance.defaults.headers.common['Authorization'] = `Bearer ${getCookie(
      'Auth'
    )}`;
    console.log(`Bearer ${getCookie('Auth')}`);
  }, [cookie, instance]);

  useEffect(() => {
    // console.log(cookie);
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
