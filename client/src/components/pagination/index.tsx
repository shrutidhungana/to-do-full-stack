import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  count: number; // total pages
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
  className,
}) => {
  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
      />
    </div>
  );
};

export default Pagination;
