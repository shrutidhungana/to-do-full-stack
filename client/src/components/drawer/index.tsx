import React from "react";
import { Drawer, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ReusableDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string; 
  width?: number | string;
  children: React.ReactNode; 
}

const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  open,
  onClose,
  title,
  width = 400,
  children,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: width, p: 2, display: "flex", flexDirection: "column" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {title && (
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        )}
        <IconButton onClick={onClose} aria-label="close drawer">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>{children}</Box>
    </Drawer>
  );
};

export default ReusableDrawer;
