import { createContext } from "react";
import type {
  ExtendedTodoApiState,
  ExtendedTodoApiActions,
} from "./useStatesAndActions";
import { noop } from "../utils/noop"; 

export type TodoContextType = [ExtendedTodoApiState, ExtendedTodoApiActions];

const defaultValue: TodoContextType = [
  {
    // UseTodoApiState
    todosData: null,
    loadingTodosData: false,
    errorTodosData: null,
    todosParams: {},

    // ExtendedTodoApiState additions
    success: noop,
    error: noop,
    filter: "all",
    page: 1,
    drawerOpen: false,
    formData: {
      name: "",
      description: "",
      dueDate: "",
    },
    showWarningModal: false,
    selectedTodo: null,
    showDeleteModal: false,
    todoToDelete: null,
    isEditMode: false,
  },
  {
    // UseTodoApiActions
    fetchData: async () => {},
    setParams: () => {},

    // ExtendedTodoApiActions additions
    saveToDoData: async () => {},
    updateToDoData: async () => {},
    deleteToDoData: async () => {},

    setFilter: () => {},
    setPage: () => {},
    setDrawerOpen: () => {},
    setFormData: () => {},
    setShowWarningModal: () => {},
    setSelectedTodo: () => {},
    setShowDeleteModal: () => {},
    setTodoToDelete: () => {},
  },
];

const TodoContext = createContext<TodoContextType>(defaultValue);

export default TodoContext;
