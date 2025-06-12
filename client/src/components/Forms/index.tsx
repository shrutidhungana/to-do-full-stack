import React from "react";
import { Input, Box, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import SelectDropdown from "../Select";
import { SecondaryButton, PrimaryButton } from "../Buttons";
import { type FormControl as FormControlType } from "../../types";

type FormProps<T extends Record<string, unknown>> = {
  formControls: (FormControlType & {
    name: string;
    label?: string;
    placeholder?: string;
    componentType: "input" | "select" | "textarea";
    type?: string;
    id?: string;
    options?: { label: string; value: string }[];
  })[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  secondaryAction?: () => void;
  secondaryButtonText?: string;
  isBtnDisabled?: boolean;
};

const CommonForm = <T extends Record<string, unknown>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  secondaryAction,
  secondaryButtonText,
  isBtnDisabled,
}: FormProps<T>) => {
  const renderInputField = (control: FormProps<T>["formControls"][0]) => {
    const value = formData[control.name] ?? "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            type={control.type || "text"}
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            fullWidth
            value={value}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "0.95rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              border: "1px solid #E2E8F0",
              "&:hover": {
                borderColor: "#CBD5E1",
              },
              "&.Mui-focused": {
                borderColor: "#8B5CF6",
                boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.2)",
              },
            }}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

      case "textarea":
        return (
          <TextareaAutosize
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={String(value || "")}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              resize: "vertical",
              minHeight: "100px",
              fontSize: "0.95rem",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              fontFamily: "inherit",
              color: "#344054",
            }}
          />
        );

      case "select":
        return (
          <SelectDropdown
            label={control.placeholder || control.name}
            value={String(value || "")}
            options={control.options || []}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 0,
      }}
    >
      {formControls?.map((control) => (
        <Box
          key={control.name}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          {control.label && (
            <Typography
              component="label"
              htmlFor={control.name}
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#344054",
              }}
            >
              {control.label}
            </Typography>
          )}
          {renderInputField(control)}
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          pt: 3,
          borderTop: "1px solid #E5E7EB",
          mt: "auto",
        }}
      >
        {secondaryAction && secondaryButtonText && (
          <SecondaryButton type="button" onClick={secondaryAction}>
            {secondaryButtonText}
          </SecondaryButton>
        )}
        <PrimaryButton type="submit" disabled={isBtnDisabled}>
          {buttonText}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default CommonForm;
