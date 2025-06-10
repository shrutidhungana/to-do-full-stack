import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: SelectChangeEvent) => void;
  className?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  className,
}) => {
  return (
    <FormControl fullWidth className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
        className="bg-white shadow-sm"
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
