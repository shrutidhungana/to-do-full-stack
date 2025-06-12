
import {useGet, useSave, useUpdate} from "../hooks";
import type { ApiResponse, PaginatedTodos, Todo } from "../types";
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
  saveToDoData: (
    payload: unknown,
    params?: Record<string, string | number>,
    onSuccess?: (data: ApiResponse<Todo>) => void,
    onFailure?: (error: unknown) => void
  ) => Promise<ApiResponse<Todo> | void>;
  updateToDoData: (
    payload: unknown,
    params?: Record<string, string | number>,
    onSuccess?: (data: ApiResponse<Todo>) => void,
    onFailure?: (error: unknown) => void
  ) => Promise<ApiResponse<Todo> | void>;
}

const useTodoAPIServices = (): [UseTodoApiState, UseTodoApiActions] => {
 
    
    const {list, add, update} = apiEndpoints
const {
  data: todosData,
  error: errorTodosData,
  loading: loadingTodosData,
  fetchData,
  params: todosParams,
  setParams: setTodosParams,
} = useGet<ApiResponse<PaginatedTodos>>(list);
  
  const {
    saveData: saveToDoData,
   
  } = useSave<ApiResponse<Todo>>(add);

  const { updateData: updateToDoData } = useUpdate<ApiResponse<Todo>>(update);

  const apiState: UseTodoApiState = {
    todosData,
    loadingTodosData,
    errorTodosData,
    todosParams,
  };

  

  const apiActions: UseTodoApiActions = {
    fetchData,
    setParams: setTodosParams,
    saveToDoData,
    updateToDoData,
  };

  return [apiState, apiActions];
};

export default useTodoAPIServices;


