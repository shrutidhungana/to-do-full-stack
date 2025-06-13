

import useTodo from "../context/useTodo";
import {type  SelectChangeEvent } from "@mui/material";

 const useTodoHandlers = () => {
  const [
    {
      todosData,
      loadingTodosData,
      errorTodosData,
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
    },
    {
      fetchData,
      saveToDoData,
      updateToDoData,
      deleteToDoData,
      setFilter,
      setPage,
      setDrawerOpen,
      setFormData,
      setShowWarningModal,
      setSelectedTodo,
      setShowDeleteModal,
      setTodoToDelete,
    },
  ] = useTodo();

 

  const handleFilterChange = (e: SelectChangeEvent) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAddClick = () => {
    setSelectedTodo(null);
    setFormData({ name: "", description: "", dueDate: "" });
    setDrawerOpen(true);
  };

  const handleEdit = (id: string | number) => {
    const todo = todosData?.data?.todos.find((t) => t._id === id);
    if (todo) {
      setSelectedTodo(todo);
      setFormData({
        name: todo.name,
        description: todo.shortDescription || "",
        dueDate: todo.dateTime
          ? new Date(todo.dateTime).toISOString().slice(0, 16)
          : "",
      });
      setDrawerOpen(true);
    }
  };

  const isFormDirty = () => {
    if (!selectedTodo) {
      return formData.name || formData.description || formData.dueDate;
    }

    return (
      formData.name !== selectedTodo.name ||
      formData.description !== (selectedTodo.shortDescription || "") ||
      formData.dueDate !==
        new Date(selectedTodo.dateTime).toISOString().slice(0, 16)
    );
  };

  const handleDrawerCloseInitiate = () => {
    if (!isFormDirty()) {
      handleConfirmDrawerClose();
    } else {
      setShowWarningModal(true);
    }
  };

  const handleConfirmDrawerClose = () => {
    setFormData({ name: "", description: "", dueDate: "" });
    setDrawerOpen(false);
    setSelectedTodo(null);
    setShowWarningModal(false);
  };

  const handleCancelWarningModal = () => {
    setShowWarningModal(false);
  };

  const handleDeleteClick = (id: string | number) => {
    const todo = todosData?.data?.todos.find((t) => t._id === id);
    if (todo) {
      setTodoToDelete(todo);
      setShowDeleteModal(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    try {
      const response = await deleteToDoData({ id: todoToDelete._id });
      if (response?.success) {
        success(response.message || "Todo deleted successfully");
        fetchData({ filter, page, limit: 5 });
      } else {
        error(response?.message ?? "Failed to delete todo");
      }
    } catch (err) {
      console.error("Delete error:", err);
      error("Unexpected error while deleting");
    } finally {
      setShowDeleteModal(false);
      setTodoToDelete(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.dueDate
    ) {
      error("All fields are required");
      return;
    }

    const date = new Date(formData.dueDate);
    if (isNaN(date.getTime())) {
      error("Invalid due date");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      shortDescription: formData.description.trim(),
      dateTime: new Date(formData.dueDate).toISOString(),
    };

    try {
      let response;
      if (isEditMode && selectedTodo) {
        response = await updateToDoData(payload, { id: selectedTodo._id });
        if (response?.success) {
          success(response.message || "Todo updated successfully");
        } else {
          error(response?.message ?? "Failed to update todo");
          return;
        }
      } else {
        response = await saveToDoData(payload);
        if (response?.success) {
          success(response.message || "Todo added successfully");
        } else {
          error(response?.message ?? "Failed to add todo");
          return;
        }
      }

      setDrawerOpen(false);
      setSelectedTodo(null);
      setFormData({ name: "", description: "", dueDate: "" });
      setPage(1);
      fetchData({ filter, page: 1, limit: 5 });
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred");
    }
  };

  return {
    todosData,
    loadingTodosData,
    errorTodosData,
    drawerOpen,
    formData,
    isEditMode,
    showWarningModal,
    showDeleteModal,
      todoToDelete,
      filter,
    page,
      fetchData,
    setFormData,
    handleFilterChange,
    handlePageChange,
    handleAddClick,
    handleEdit,
    handleDrawerCloseInitiate,
    handleConfirmDrawerClose,
    handleCancelWarningModal,
    handleDeleteClick,
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleFormSubmit,
  };
};

export default useTodoHandlers