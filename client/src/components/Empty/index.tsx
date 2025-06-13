import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { PrimaryButton } from "../Buttons";

type EmptyProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void; // Callback instead of link
  variant?: "card" | "sheet" | "table" | "default";
};

const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  variant = "default",
}) => {
  const renderButton = () =>
    buttonText && (
      <PrimaryButton onClick={onButtonClick}>{buttonText}</PrimaryButton>
    );

  if (variant === "card") {
    return (
      <Card className="p-6 shadow-md border border-gray-200 rounded-lg">
        <CardContent className="text-center">
          <Typography variant="h6" className="text-black">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" className="text-gray-700 mt-2">
              {description}
            </Typography>
          )}
          {renderButton()}
        </CardContent>
      </Card>
    );
  }

  if (variant === "sheet") {
    return (
      <Dialog open fullWidth maxWidth="sm">
        <DialogTitle className="text-black">{title}</DialogTitle>
        <DialogContent className="text-center">
          {description && (
            <Typography variant="body2" className="text-gray-700">
              {description}
            </Typography>
          )}
          {renderButton()}
        </DialogContent>
      </Dialog>
    );
  }

  if (variant === "table") {
    return (
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-lg font-semibold text-black">
                {title}
              </th>
            </tr>
          </thead>
          <tbody>
            {description && (
              <tr>
                <td className="text-sm text-gray-700 py-2">{description}</td>
              </tr>
            )}
          </tbody>
        </table>
        {renderButton()}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-lg p-6 text-center">
      <div>
        <Typography variant="h6" className="text-black">
          {title}
              </Typography>
              
        {description && (
          <Typography variant="body2" className="text-gray-700 mt-2">
            {description}
          </Typography>
        )}
        {renderButton()}
      </div>
    </div>
  );
};

export default Empty;
