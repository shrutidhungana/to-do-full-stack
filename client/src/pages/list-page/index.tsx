// ListPage.tsx
import React from "react";
import Header from "../../components/Header";
import { PrimaryButton } from "../../components/Buttons";
import SelectDropdown from "../../components/Select";

import Pagination from "../../components/Pagination";
import { Box } from "@mui/material";
import ReusableDrawer from "../../components/Drawer";
import CommonForm from "../../components/Forms";
import { todoFormControls, filterOptions } from "../../config";
import { useTodoHandlers } from "../../hooks";
import TodoList from "./list-item";
import TodoModals from "./to-do-modals";

type indexProps = {};

const ListPage: React.FC<indexProps> = () => {
  const {
    todosData,
    drawerOpen,
    formData,
    isEditMode,
    filter,
    page,
    setFormData,
    handleFilterChange,
    handlePageChange,
    handleAddClick,
    handleDrawerCloseInitiate,
    handleConfirmDrawerClose,
    handleFormSubmit,
  } = useTodoHandlers();

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
          <TodoList />
        </Box>
      </main>
      {todosData && todosData?.data?.totalPages && (
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
     <TodoModals />
    </>
  );
};

export default ListPage;
