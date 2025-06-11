
import {useGet} from "../hooks";
import type { ApiResponse, PaginatedTodos } from "../types";
import { apiEndpoints } from "../utils/api";

export interface UseTodoApiState {
  todosData: ApiResponse<PaginatedTodos> | null;
  loadingTodosData: boolean;
  errorTodosData: string | null;
  todosParams: Record<string, unknown>;
}

export interface UseTodoApiActions {
  fetchData: (params?: Record<string, unknown>) => Promise<void>;
  setParams: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const useTodoAPIServices = (): [UseTodoApiState, UseTodoApiActions] => {
    // Pass '/list' as URL param to useGet
    
    const {list} = apiEndpoints
const {
  data: todosData,
  error: errorTodosData,
  loading: loadingTodosData,
  fetchData,
  params: todosParams,
  setParams: setTodosParams,
} = useGet<ApiResponse<PaginatedTodos>>(list);

  const apiState: UseTodoApiState = {
    todosData,
    loadingTodosData,
    errorTodosData,
    todosParams,
  };

  const apiActions: UseTodoApiActions = {
     fetchData,
    setParams: setTodosParams,
  };

  return [apiState, apiActions];
};

export default useTodoAPIServices;


