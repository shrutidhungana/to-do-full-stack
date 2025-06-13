import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";

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
 const menuProps = {
   PaperProps: {
     style: {
       maxHeight: 250,
       background:
         "linear-gradient(135deg, rgba(63,81,181,0.95), rgba(103,58,183,0.95))",
       color: "white",
       boxShadow: "0 4px 8px rgba(0,0,0,0.3), 0 6px 20px rgba(0,0,0,0.22)",
       borderRadius: 8,
     },
   },
   anchorOrigin: { vertical: "bottom", horizontal: "left" } as const,
   transformOrigin: { vertical: "top", horizontal: "left" } as const,
   getContentAnchorEl: null,
 };

  return (
    <FormControl
      fullWidth
      className={className}
      sx={{
        "& .MuiInputBase-root": {
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 1.5,
          color: "white",
          minWidth: 150,
          "&:hover": { background: "rgba(255, 255, 255, 0.15)" },
          "&.Mui-focused": {
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 8px 2px rgba(103, 58, 183, 0.7)",
          },
        },
        "& .MuiSelect-icon": { color: "white" },
        "& .MuiMenuItem-root": { color: "white", fontWeight: 500 },
        "& .MuiMenuItem-root.Mui-selected": {
          background: "rgba(103, 58, 183, 0.8) !important",
          color: "white",
        },
        "& .MuiMenuItem-root:hover": {
          background: "rgba(103, 58, 183, 0.5) !important",
          color: "white",
        },
      }}
    >
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        MenuProps={menuProps}
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                {label}
              </Typography>
            );
          }
          const selectedOption = options.find((opt) => opt.value === selected);
          return selectedOption?.label || "";
        }}
      >
        <MenuItem disabled value="">
          {label}
        </MenuItem>
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
