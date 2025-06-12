// ListPage.tsx
import React, { useEffect, useState } from "react";
import useTodo from "../../context/useTodo";
import Header from "../../components/header";
import { PrimaryButton,  } from "../../components/buttons";
import SelectDropdown from "../../components/select";
import GenericListItem, { type ListItemData } from "../../components/list"; 
import Pagination from "../../components/pagination";
import { type SelectChangeEvent, Box, Typography } from "@mui/material";
import ReusableDrawer from "../../components/drawer";
import CommonForm from "../../components/forms";
import { todoFormControls } from "../../config";

type indexProps = {};

const filterOptions = [
  { label: "All", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Done", value: "done" },
];

const ListPage: React.FC<indexProps> = () => {
  const [{ todosData, loadingTodosData, errorTodosData, success, error }, { fetchData, saveToDoData }] =
    useTodo();

 
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
   const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
   
  });
  
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
     setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
     setFormData({
       name: "",
       description: "",
       dueDate: "",
      
     });
     setDrawerOpen(false);
   };
  
const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); 

  try {
    const payload = {
      name: formData.name.trim(),
      shortDescription: formData.description.trim(),
      dateTime: new Date(formData.dueDate).toISOString(),
    };

    const response = await saveToDoData(payload); // Custom hook should return server response

    if (response?.success) {
      success(response.message || "Todo added successfully");
      setDrawerOpen(false);
      setFormData({ name: "", description: "", dueDate: ""});
      setPage(1); // Go to first page
      fetchData({ filter, page: 1, limit: 5 }); 
    } else {
      error(response?.message ?? "Failed to add todo");
    }
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
                      onEdit={(id) => alert(`Edit ${id}`)}
                      onDelete={(id) => alert(`Delete ${id}`)}
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
          onClose={handleDrawerClose}
          title="Add To Do"
        >
          <CommonForm
            formControls={todoFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            buttonText="Add"
            secondaryAction={handleDrawerClose}
            secondaryButtonText="Cancel"
            isBtnDisabled={false} 
          />
        </ReusableDrawer>
      )}
    </>
  );
};

export default ListPage;
