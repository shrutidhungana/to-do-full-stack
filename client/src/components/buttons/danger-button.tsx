import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { ButtonProps } from "@mui/material";

const DangerButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="contained"
      color="error"
      startIcon={<Delete />}
      className="bg-red-600 hover:bg-red-700 shadow-md transition-transform active:scale-95"
      disableElevation
    >
      {props.children}
    </Button>
  );
};

export default DangerButton;
