import axios from 'axios';
import { useEffect } from 'react';

function useAxiosInstance() {
  const cookie =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHRAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJST0xFX09XTkVSIiwiaWF0IjoxNzE0NjM4NTI3LCJleHAiOjE3MTQ3MjQ5Mjd9.j0QbtCu_S6JWuN4PxdwBX9vaBphwpWkdXhbxaOxQeKM';

  const instance = axios.create({
    baseURL: 'http://localhost:8081/lifepill/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`,
    },
  });

  useEffect(() => {
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
