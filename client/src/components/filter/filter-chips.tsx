// src/components/Todo/FilterChips.tsx
import React from "react";
import { Chip } from "@mui/material";

type FilterType = "all" | "done" | "upcoming";

interface FilterChipsProps {
  currentFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  currentFilter,
  onChange,
}) => {
  const filters: FilterType[] = ["all", "done", "upcoming"];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter.toUpperCase()}
          color={currentFilter === filter ? "primary" : "default"}
          onClick={() => onChange(filter)}
          className="cursor-pointer"
          clickable
          sx={{ fontWeight: "bold" }}
        />
      ))}
    </div>
  );
};

export default FilterChips;
