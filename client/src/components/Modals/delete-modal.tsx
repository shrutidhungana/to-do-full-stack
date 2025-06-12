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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

import { DangerButton, SecondaryButton } from "../Buttons";

interface DeleteModalProps {
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

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  title = "Delete item?",
  question,
  additionalText,
  onConfirm,
  confirmText = "Delete",
  onCancel,
  cancelText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      PaperProps={{
        sx: {
          bgcolor: "#F7F2F9", // light red background
          borderRadius: "8px",
          p: 3,
          maxWidth: { xs: "calc(100% - 32px)", sm: "440px", md: "512px" },
          width: "100%",
          boxShadow: "0 4px 12px rgba(255, 0, 0, 0.15)",
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
          bgcolor: "rgba(255, 0, 0, 0.15)", // subtle red tint overlay
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
          color: "#B91C1C", // dark red
          "&:hover": {
            color: "#7F1D1D",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <DeleteOutlineIcon
          sx={{ color: "#B91C1C", fontSize: "2rem", mr: 1.5 }}
          aria-hidden="true"
        />
        <DialogTitle
          id="delete-dialog-title"
          sx={{
            p: 0,
            color: "#7F1D1D",
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
          id="delete-dialog-question"
          sx={{
            mb: additionalText ? 1.5 : 0,
            color: "#7F1D1D",
            fontSize: { xs: "0.875rem", sm: "1rem", lg: "1.125rem" },
            lineHeight: 1.5,
          }}
        >
          {question}
        </Typography>
        {additionalText && (
          <Typography
            id="delete-dialog-additional-text"
            sx={{
              color: "#9CA3AF", // gray for secondary text
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
          borderTop: "1px solid #FCA5A5", // light red border
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
        <DangerButton
          onClick={onConfirm}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {confirmText}
        </DangerButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
