import { useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const useGet = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<T>(url, config);
      setData(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useGet;
