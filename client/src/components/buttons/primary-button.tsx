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
      className="bg-[linear-gradient(135deg,_#6C63FF,_#B44EFF)] hover:bg-[linear-gradient(135deg,_#5A4EE3,_#9E39E8)] text-white shadow-lg transition-transform active:scale-95 rounded-xl px-6 py-2"
      disableElevation
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
