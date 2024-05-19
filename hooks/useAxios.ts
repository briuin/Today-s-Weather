// hooks/useAxios.ts
import { useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const useAxios = () => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const request = useCallback(async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
      const response = await instance.request<T>(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        throw error;
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }, [instance]);

  return { request };
};

export default useAxios;
