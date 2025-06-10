import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import type { ButtonProps } from "@mui/material";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      endIcon={<ArrowForward />}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg transition-transform active:scale-95"
      disableElevation
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
