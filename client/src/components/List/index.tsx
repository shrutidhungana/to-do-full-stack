// GenericListItem.tsx
import React from "react";
import { IconButton, Tooltip, Typography, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface ListItemData {
  id: string | number;
  name: string;
  description?: string;
  dateTime?: string;
  status?: "done" | "upcoming";
}

interface GenericListItemProps {
  item: ListItemData;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  className?: string; // For any additional styling from parent
}

const GenericListItem: React.FC<GenericListItemProps> = ({
  item,
  onEdit,
  onDelete,
  className = "",
}) => {
  return (
    // This div represents an individual row within the list container.
    // Its background is subtle white opacity to let the main Box gradient show through.
    <div
      className={`
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        bg-white bg-opacity-30 hover:bg-opacity-50
        transition-all duration-200 ease-in-out
        p-4 rounded-lg mb-2
        ${className}
      `}
    >
      <div className="flex-1 space-y-1">
        {/* Item Name: Use a strong, dark color for maximum visibility */}
        <Typography
          variant="h6"
          className="text-gray-900 font-bold tracking-wide" // Changed to dark text
        >
          {item.name}
        </Typography>

        {item.description && (
          // Description: Darker, subtle color for readability
          <Typography variant="body2" className="text-gray-700 italic">
            {item.description}
          </Typography>
        )}
        {item.dateTime && (
          // Date/Time: Darker, distinct color, maybe a dark purple or blue
          <Typography
            variant="caption"
            className="text-purple-800 font-mono block text-sm"
          >
            {new Date(item.dateTime).toLocaleString()}
          </Typography>
        )}
        {item.status && (
          <span
            className={`inline-block px-2 py-0.5 mt-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-md
              ${
                item.status === "done"
                  ? "bg-green-600 text-white" // Green on white is fine
                  : "bg-purple-600 text-white" // Purple badge on the light background
              }
            `}
          >
            {item.status === "done" ? "Done" : "Upcoming"}
          </span>
        )}
      </div>

      <div className="flex mt-3 sm:mt-0 sm:ml-4 space-x-2">
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => onEdit?.(item.id)}
            // Edit Icon: Dark color, maybe a dark blue or black, for contrast
            className="text-blue-700 hover:text-blue-900"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => onDelete?.(item.id)}
            // Delete Icon: Dark color, maybe a dark red or black, for contrast
            className="text-red-700 hover:text-red-900"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default GenericListItem;
