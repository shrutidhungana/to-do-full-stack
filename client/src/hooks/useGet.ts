import { useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

interface UseGetReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (params?: Record<string, unknown>) => Promise<void>;
  params: Record<string, unknown>;
  setParams: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const useGet = <T>(url: string): UseGetReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>({});

  const fetchData = async (queryParams?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const config: AxiosRequestConfig = {};
      if (queryParams) config.params = queryParams;
      const response = await axios.get<T>(url, config);
      setData(response.data);
      if (queryParams) setParams(queryParams);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData, params, setParams };
};

export default useGet;
