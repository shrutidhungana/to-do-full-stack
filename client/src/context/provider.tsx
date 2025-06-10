
import React, { type ReactNode } from "react";
import TodoContext from "./context"; // assuming you renamed your context for todo
import useStatesAndActions from "./useStatesAndActions";

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const value = useStatesAndActions(); // returns [state, actions]

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;