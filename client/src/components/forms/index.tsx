import React from "react";
import { Input } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import SelectDropdown from "../select"
import {SecondaryButton, PrimaryButton} from "../buttons";
import { type FormControl as FormControlType } from "../../types"; // assumed custom

type FormProps<T extends Record<string, unknown>> = {
  formControls: (FormControlType & {
    name: string;
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
            className="w-full p-2 border rounded-md resize-y min-h-[80px]"
            value={String(value || "")}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
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
    <form onSubmit={onSubmit} className="space-y-4">
      {formControls?.map((control) => (
        <div key={control.name} className="flex flex-col gap-1">
          <label htmlFor={control.name} className="font-medium text-gray-700">
            {control.label}
          </label>
          {renderInputField(control)}
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        {secondaryAction && secondaryButtonText && (
          <SecondaryButton type="button" onClick={secondaryAction}>
            {secondaryButtonText}
          </SecondaryButton>
        )}
        <PrimaryButton type="submit" disabled={isBtnDisabled}>
          {buttonText}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default CommonForm;
