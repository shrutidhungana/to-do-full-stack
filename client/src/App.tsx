import React from "react";

import AppRoutes from "./routes";
import TodoProvider from "./context/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <AppRoutes />
      <ToastContainer />
    </TodoProvider>
  );
};

export default App;
