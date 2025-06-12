// ListPage.tsx
import React, { useEffect, useState } from "react";
import useTodo from "../../context/useTodo";
import Header from "../../components/Header";
import { PrimaryButton } from "../../components/Buttons";
import SelectDropdown from "../../components/Select";
import GenericListItem, { type ListItemData } from "../../components/List";
import Pagination from "../../components/Pagination";
import { type SelectChangeEvent, Box, Typography } from "@mui/material";
import ReusableDrawer from "../../components/Drawer";
import CommonForm from "../../components/Forms";
import { todoFormControls } from "../../config";
import { WarningModal, DeleteModal } from "../../components/Modals";
import type { Todo } from "../../types";



type indexProps = {};

const filterOptions = [
  { label: "All", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Done", value: "done" },
];

const ListPage: React.FC<indexProps> = () => {
  const [
    { todosData, loadingTodosData, errorTodosData, success, error },
    { fetchData, saveToDoData, updateToDoData, deleteToDoData },
  ] = useTodo();

  const [filter, setFilter] = useState<string>("");
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

  useEffect(() => {
    fetchData({ filter, page, limit: 5 });
  }, [filter, page]);

  const handleFilterChange = (e: SelectChangeEvent) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAddClick = () => {
    setSelectedTodo(null); // reset for add
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
          : "", // for input[type=datetime-local]
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
     setFormData({
       name: "",
       description: "",
       dueDate: "",
     });
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
      const response = await deleteToDoData({id: todoToDelete._id } );
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
      if (isEditMode && selectedTodo) {
        
        const response = await updateToDoData(payload, {
          id: selectedTodo._id,
        });
        if (response?.success) {
          success(response.message || "Todo updated successfully");
        } else {
          error(response?.message ?? "Failed to update todo");
          return;
        }
      } else {
        const response = await saveToDoData(payload);
       
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


  return (
    <>
      <Header
        logoSrc="/title.jpeg"
        title="My Todo List"
        middleContent={
          <div className="w-48">
            <SelectDropdown
              label="Filter Todos"
              value={filter}
              options={filterOptions}
              onChange={handleFilterChange}
            />
          </div>
        }
        rightContent={
          <PrimaryButton onClick={handleAddClick}>Add Todo</PrimaryButton>
        }
      />

      <main className="px-4 py-6 min-h-screen  bg-gradient-to-r from-[#FDEBD0] to-[#F9D7E3] flex justify-center items-start pt-10">
        <Box
          sx={{
            width: { xs: "95%", sm: "80%", md: "600px" },
            maxWidth: "100%",
            mx: "auto",
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: "16px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",

            background: "linear-gradient(to right, #FFB6C1, #FFD700)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",

            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {loadingTodosData ? (
            <Typography className="text-white text-center">
              Loading todos...
            </Typography>
          ) : errorTodosData ? (
            <Typography className="text-red-500 text-center">
              Error loading todos
            </Typography>
          ) : (
            <>
              {todosData?.data?.todos?.length ? (
                todosData.data.todos.map((todo) => {
                  const status: "done" | "upcoming" | undefined =
                    todo.done === true
                      ? "done"
                      : todo.dateTime && new Date(todo.dateTime) > new Date() // Check if dateTime exists before comparing
                      ? "upcoming"
                      : undefined;

                  const itemData: ListItemData = {
                    id: todo._id,
                    name: todo.name,
                    description: todo.shortDescription,
                    dateTime: todo.dateTime,
                    status,
                  };

                  return (
                    <GenericListItem
                      key={todo._id}
                      item={itemData}
                      onEdit={handleEdit}
                      onDelete={() => handleDeleteClick(todo._id)}
                    />
                  );
                })
              ) : (
                <Typography className="text-white text-center">
                  No todos found
                </Typography>
              )}
            </>
          )}
        </Box>
      </main>
      {todosData && todosData?.data?.totalPages > 1 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            py: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            zIndex: 1000, // Ensure it stays on top
          }}
        >
          <Pagination
            count={todosData.data.totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      )}
      {drawerOpen && (
        <ReusableDrawer
          open={drawerOpen}
          onClose={handleConfirmDrawerClose}
          title={isEditMode ? "Update To Do" : "Add To Do"}
        >
          <CommonForm
            formControls={todoFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            buttonText={isEditMode ? "Update" : "Add"}
            secondaryAction={handleDrawerCloseInitiate}
            secondaryButtonText="Cancel"
            isBtnDisabled={false}
          />
        </ReusableDrawer>
      )}
      {showWarningModal && (
        <WarningModal
          open={showWarningModal}
          onClose={handleCancelWarningModal}
          title="Discard Changes?"
          question="Are you sure you want to discard these changes?"
          additionalText="Any unsaved progress will be lost. You will not be able to see them again."
          onConfirm={handleConfirmDrawerClose}
          confirmText="Yes, Discard"
          onCancel={handleCancelWarningModal}
          cancelText="No, Keep Editing"
        />
      )}
      {todoToDelete && (
        <DeleteModal
          open={showDeleteModal}
          onClose={handleCloseDeleteModal}
          title="Delete Todo?"
          question={`Are you sure you want to delete "${todoToDelete.name}"?`}
          onConfirm={handleConfirmDelete}
          confirmText="Delete"
          onCancel={handleCloseDeleteModal}
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default ListPage;
