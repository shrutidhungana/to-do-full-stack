export type Todo = {
  _id: string;
  name: string;
  shortDescription: string;
  dateTime: string; // ISO string
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number; // based on your example API response
};

export type PaginatedTodos = {
  todos: Todo[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type ApiResponse<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T;
};
