import React from "react";
import { Skeleton, Box } from "@mui/material";

type SkeletonPlaceholderProps = {
  variant?: "text" | "rectangular" | "circular";
  width?: number | string;
  height?: number | string;
  count?: number; // number of skeleton lines/blocks to show
  style?: React.CSSProperties;
  className?: string;
};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
  variant = "rectangular",
  width = "100%",
  height = 40,
  count = 1,
  style,
  className,
}) => {
  return (
    <Box className={`flex flex-col gap-3 ${className}`} style={style}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          width={width}
          height={height}
          animation="wave"
        />
      ))}
    </Box>
  );
};

export default SkeletonPlaceholder;
