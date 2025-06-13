import React from "react";
import { Typography } from "@mui/material";
import SkeletonPlaceholder from "../../components/Skeleton";
import GenericListItem, {type ListItemData } from "../../components/List";
import { useTodoHandlers } from "../../hooks";
import Empty from "../../components/Empty";
import { motion } from "framer-motion";
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
        {todosData.data.todos.map((todo, index) => {
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

          const isEven = index % 2 === 0;
          const directionX = isEven ? -50 : 50;

          return (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, x: directionX }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <GenericListItem
                item={itemData}
                onEdit={handleEdit}
                onDelete={() => handleDeleteClick(todo._id)}
              />
            </motion.div>
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
