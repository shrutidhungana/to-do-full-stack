import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { PrimaryButton, SecondaryButton } from "../Buttons";

interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  question: string;
  additionalText?: string;
  onConfirm: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  onClose,
  title = "Are you sure?",
  question,
  additionalText,
  onConfirm,
  confirmText = "Confirm",
  onCancel,
  cancelText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="warning-dialog-title"
      aria-describedby="warning-dialog-description"
      PaperProps={{
        sx: {
          bgcolor: "#F7F2F9",
          borderRadius: "8px",
          p: 3,
          maxWidth: { xs: "calc(100% - 32px)", sm: "440px", md: "512px" },
          width: "100%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        },
        "& .MuiBackdrop-root": {
          bgcolor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="close modal"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#6B7280",
          "&:hover": {
            color: "#374151",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <WarningAmberOutlinedIcon
          sx={{ color: "#F59E0B", fontSize: "2rem", mr: 1.5 }}
        />
        <DialogTitle
          id="warning-dialog-title"
          sx={{
            p: 0,
            color: "#1F2937",
            fontWeight: 700,
            fontSize: { xs: "1.125rem", sm: "1.25rem", lg: "1.5rem" },
            lineHeight: 1.2,
          }}
        >
          {title}
        </DialogTitle>
      </Box>

      <DialogContent sx={{ p: 0, pb: 3 }}>
        <Typography
          id="warning-dialog-question"
          sx={{
            mb: additionalText ? 1.5 : 0,
            color: "#374151",
            fontSize: { xs: "0.875rem", sm: "1rem", lg: "1.125rem" },
            lineHeight: 1.5,
          }}
        >
          {question}
        </Typography>
        {additionalText && (
          <Typography
            id="warning-dialog-additional-text"
            sx={{
              color: "#667085",
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
              lineHeight: 1.4,
            }}
          >
            {additionalText}
          </Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          pt: 2,
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "flex-end", sm: "flex-end" },
          gap: 1.5,
          px: 0,
          pb: 0,
        }}
      >
        {onCancel && (
          <SecondaryButton
            onClick={onCancel}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            {cancelText}
          </SecondaryButton>
        )}
        <PrimaryButton
          onClick={onConfirm}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {confirmText}
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
