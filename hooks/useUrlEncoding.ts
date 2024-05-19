import { useCallback } from 'react';

const useUrlEncoding = () => {
  const encodeUrl = useCallback((data: string): string => {
    return encodeURIComponent(data);
  }, []);

  const decodeUrl = useCallback((data: string): string => {
    return decodeURIComponent(data);
  }, []);

  return { encodeUrl, decodeUrl };
};

export default useUrlEncoding;