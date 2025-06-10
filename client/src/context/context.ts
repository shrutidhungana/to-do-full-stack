import { createContext } from "react";

import type { UseTodoApiActions, UseTodoApiState } from "./useAPIServices";

export type TodoContextType = [UseTodoApiState, UseTodoApiActions];

const defaultValue: TodoContextType = [
  {
    todosData: null,
    loadingTodosData: false,
    errorTodosData: null,
    todosParams: {},
  },
  {
    fetchData: async () => {},
    setParams: () => {},
  },
];

const TodoContext = createContext<TodoContextType>(defaultValue);

export default TodoContext;
