import { useState } from "react";
import axios, {type AxiosRequestConfig } from "axios";

type Params = Record<string, string | number>;
type OnSuccess<T> = (data: T) => void;
type OnFailure = (error: unknown) => void;

interface UseUpdateReturn<T> {
  updateData: (
    payload: unknown,
    params?: Params,
    onSuccess?: OnSuccess<T>,
    onFailure?: OnFailure
  ) => Promise<T | void>;
  loading: boolean;
  data: T | null;
  error: unknown;
}

const useUpdate = <T = unknown>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): UseUpdateReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const updateData = async (
    payload: unknown,
    params: Params = {},
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

      const response = await axios.put<T>(dynamicEndpoint, payload, options);
      setData(response.data);

      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err: unknown) {
      setError(err);
      if (onFailure) onFailure(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, data, error };
};

export default useUpdate;
