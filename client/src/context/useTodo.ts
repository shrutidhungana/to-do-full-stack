import { useContext } from "react";
import TodoContext, { type TodoContextType } from "./context"; 

const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }

  return context;
};

export default useTodo;
