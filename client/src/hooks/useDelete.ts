import { useState } from "react";
import axios, {type  AxiosRequestConfig } from "axios";

type Params = Record<string, string | number>;
type OnSuccess<T> = (data: T) => void;
type OnFailure = (error: unknown) => void;

interface UseDeleteReturn<T> {
  deleteData: (
    params: Params,
    onSuccess?: OnSuccess<T>,
    onFailure?: OnFailure
  ) => Promise<T | void>;
  loading: boolean;
  data: T | null;
  error: unknown;
}

const useDelete = <T = unknown>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): UseDeleteReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const deleteData = async (
    params: Params,
    onSuccess?: OnSuccess<T>,
    onFailure?: OnFailure
  ): Promise<T | void> => {
    setLoading(true);
    setError(null);

    try {
      let dynamicEndpoint = endpoint;
      Object.keys(params).forEach((key) => {
        dynamicEndpoint = dynamicEndpoint.replace(
          `{${key}}`,
          String(params[key])
        );
      });

      const response = await axios.delete<T>(dynamicEndpoint, options);
      setData(response.data);

      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.message ?? err.message ?? "Axios error occurred";
      }

      setError(errorMessage);
      if (onFailure) onFailure(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, data, error };
};

export default useDelete;
