
import React, { type ReactNode } from "react";
import TodoContext from "./context"; 
import useStatesAndActions from "./useStatesAndActions";

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const value = useStatesAndActions(); 

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;