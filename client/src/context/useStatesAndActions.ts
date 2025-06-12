import { useState } from "react";

import useAPIServices, {
  type UseTodoApiState,
  type UseTodoApiActions,
} from "./useAPIServices";

import { useToast } from "../hooks";
import type { Todo } from "../types";

export interface ExtendedTodoApiState extends UseTodoApiState {
  success: (msg: string) => void;
  error: (msg: string) => void;
  filter: string;
  page: number;
  drawerOpen: boolean;
  formData: {
    name: string;
    description: string;
    dueDate: string;
  };
  showWarningModal: boolean;
  selectedTodo: Todo | null;
  showDeleteModal: boolean;
  todoToDelete: Todo | null;
  isEditMode: boolean;
}

export interface ExtendedTodoApiActions extends UseTodoApiActions {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      dueDate: string;
    }>
  >;
  setShowWarningModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoToDelete: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const useStatesAndActions = (): [
  ExtendedTodoApiState,
  ExtendedTodoApiActions
] => {
  const [apiState, apiActions] = useAPIServices();
  const { success, error } = useToast();
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const isEditMode = Boolean(selectedTodo);

  const state = {
    success,
    error,
    filter,
    page,
    drawerOpen,
    formData,
    showWarningModal,
    selectedTodo,
    showDeleteModal,
    todoToDelete,
    isEditMode,
    ...apiState,
  };
  const action = {
    setFilter,
    setPage,
    setDrawerOpen,
    setFormData,
    setShowWarningModal,
    setSelectedTodo,
    setShowDeleteModal,
    setTodoToDelete,
    ...apiActions,
  };

  return [state, action];
};

export default useStatesAndActions;
