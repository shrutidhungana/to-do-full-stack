import { Button } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import type { ButtonProps } from "@mui/material";

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="outlined"
      color="secondary"
      startIcon={<Autorenew />}
      className="border-gray-400 text-gray-700 hover:bg-gray-100 transition-all"
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
