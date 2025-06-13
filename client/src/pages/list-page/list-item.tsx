import React from "react";
import { Typography } from "@mui/material";
import SkeletonPlaceholder from "../../components/Skeleton";
import GenericListItem, {type ListItemData } from "../../components/List";
import { useTodoHandlers } from "../../hooks";
import Empty from "../../components/Empty";

const TodoList: React.FC = () => {
  const {
    todosData,
    loadingTodosData,
    errorTodosData,
    filter,
    handleEdit,
    handleDeleteClick,
    handleAddClick,
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
  }

  if (errorTodosData) {
    return (
      <Typography className="text-red-500 text-center">
        Error loading todos
      </Typography>
    );
  }

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
  }

  // Dynamic titles/descriptions
  const emptyContent = {
    all: {
      title: "No Todos Found",
      description: "Start by adding your first todo.",
    },
    done: {
      title: "No Done Todos Found",
      description: "You haven’t completed any tasks yet.",
    },
    upcoming: {
      title: "No Upcoming Todos Found",
      description: "Plan ahead by adding an upcoming task.",
    },
  };

  const { title, description } =
    emptyContent[filter as "all" | "done" | "upcoming"] || emptyContent.all;

  return (
    <Empty
      title={title}
      description={description}
      buttonText="Add Todo"
      onButtonClick={handleAddClick}
      variant="card"
    />
  );
};

export default TodoList;
