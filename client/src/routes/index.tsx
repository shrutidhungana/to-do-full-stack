import React from "react";
import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import ListPage from "../pages/list-page";
import NotFoundPage from "../pages/notfound";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/todo" replace />} />
        <Route path="/todo" element={<ListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
