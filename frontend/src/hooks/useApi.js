import { useState, useCallback } from 'react';
import api from '../services/api';
import { toastSuccess, toastError } from '../utils/toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, successMsg = null) => {
    setLoading(true);
    setError(null);
    try {
      // Axios signature difference for delete
      const response = method === 'delete' 
        ? await api.delete(url) 
        : await api[method](url, data);
        
      const responseMsg = response.data?.message || successMsg;
      if (responseMsg) {
        toastSuccess(responseMsg);
      }
      
      return response.data;
    } catch (err) {
      console.error(`API Call failed (${method.toUpperCase()} ${url}):`, err);
      // Fallback ordered by priority parsing typical backend python errors
      const errorMsg = err.response?.data?.error 
                      || err.response?.data?.message 
                      || err.message 
                      || "An error occurred while connecting to the server";
      
      setError(errorMsg);
      toastError(errorMsg);
      throw err; // Re-throw to allow component-level handling if desired
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    get: useCallback((url) => request('get', url), [request]),
    post: useCallback((url, data, msg) => request('post', url, data, msg), [request]),
    put: useCallback((url, data, msg) => request('put', url, data, msg), [request]),
    remove: useCallback((url, msg) => request('delete', url, null, msg), [request]),
  };
};
