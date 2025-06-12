import { Button } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import type { ButtonProps } from "@mui/material";

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        borderColor: "#D1D5DB",
        color: "#4B5563",
        transition: "all 0.2s ease-in-out",
        borderRadius: "8px",
        px: 3,
        py: 1,
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "#F3F4F6",
          borderColor: "#9CA3AF",
          color: "#1F2937",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
        "&.Mui-disabled": {
          borderColor: "#E0E0E0",
          color: "#A0A0A0",
        },
      }}
      startIcon={<Autorenew />}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
