import React from "react";
import { Typography } from "@mui/material";
import SkeletonPlaceholder from "../../components/Skeleton";
import GenericListItem, {type ListItemData } from "../../components/List";
import { useTodoHandlers } from "../../hooks";


const TodoList: React.FC = () => {
  const {
    todosData,
    loadingTodosData,
    errorTodosData,
    handleEdit,
    handleDeleteClick,
  } = useTodoHandlers();

  if (loadingTodosData) {
    return (
      <SkeletonPlaceholder
        variant="rectangular"
        width="100%"
        height={80}
        count={5}
        className="rounded-lg"
      />
    );
  } else if (errorTodosData) {
    return (
      <Typography className="text-red-500 text-center">
        Error loading todos
      </Typography>
    );
  } else {
    if (todosData?.data?.todos?.length) {
      return (
        <>
          {todosData.data.todos.map((todo) => {
            const status: "done" | "upcoming" | undefined =
              todo.done === true
                ? "done"
                : todo.dateTime && new Date(todo.dateTime) > new Date()
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
          })}
        </>
      );
    } else {
      return (
        <Typography className="text-white text-center">
          No todos found
        </Typography>
      );
    }
  }
};

export default TodoList;
