import React from "react";
import { Drawer, IconButton, Box, Typography, Divider } from "@mui/material";
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
  width = 420,
  children,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: width,
          bgcolor: "#F7F2F9",
          color: "#344054",
          borderTopLeftRadius: { xs: 0, sm: 16 },
          borderBottomLeftRadius: { xs: 0, sm: 16 },
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease-in-out, transform 0.3s ease-in-out",
        },
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 1, sm: 1.5 },
          }}
        >
          {title && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                color: "#101828",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </Typography>
          )}
          <IconButton
            onClick={onClose}
            aria-label="close drawer"
            sx={{
              color: "#98A2B3",
              "&:hover": {
                bgcolor: "#F0EBF4",
                color: "#667085",
                borderRadius: "8px",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" } }} />
          </IconButton>
        </Box>
        <Divider
          sx={{
            mb: { xs: 2, sm: 3 },
            borderBottomWidth: "2px",
            borderColor: "#D4B4E3",
          }}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D9C9E2",
            borderRadius: "10px",
            border: "2px solid transparent",
            backgroundClip: "content-box",
            "&:hover": {
              backgroundColor: "#B39EC9",
            },
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default ReusableDrawer;
