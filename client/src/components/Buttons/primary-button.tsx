import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import type { ButtonProps } from "@mui/material";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="contained"
      disableElevation
      sx={{
        bgcolor: "#8B5CF6", 
        color: "#FFFFFF",
        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        transition: "all 0.2s ease-in-out",
        borderRadius: "8px",
        px: 3,
        py: 1,
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 600,
        "&:hover": {
          bgcolor: "#7C3AED", 
          boxShadow: "0 6px 16px rgba(139, 92, 246, 0.4)",
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "scale(0.98)",
          boxShadow: "0 2px 8px rgba(139, 92, 246, 0.2)",
        },
        "&.Mui-disabled": {
          bgcolor: "#E0E0E0",
          color: "#A0A0A0",
          boxShadow: "none",
          transform: "none",
        },
      }}
      endIcon={<ArrowForward />}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
