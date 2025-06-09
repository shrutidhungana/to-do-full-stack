import React from "react";
import { Routes, Route, } from "react-router-dom";

import NotFoundPage from "../pages/notfound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
    
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
