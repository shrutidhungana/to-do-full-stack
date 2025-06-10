import React from "react";
import type { ReactNode } from "react";
import { Card, CardContent, CardActions, Typography } from "@mui/material";

interface GenericCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  dateTime?: string; // ISO string
  actionSlot?: ReactNode; // Buttons or icons
  className?: string;
  gradientClass?: string; // Tailwind gradient classes (e.g. "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500")
}

const GenericCard: React.FC<GenericCardProps> = ({
  title,
  subtitle,
  description,
  dateTime,
  actionSlot,
  className,
  gradientClass = "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500",
}) => {
  return (
    <Card
      className={`text-white shadow-lg rounded-lg overflow-hidden ${gradientClass} ${className}`}
      elevation={6}
    >
      <CardContent>
        <Typography variant="h6" component="h2" className="font-bold mb-1">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" className="opacity-80 mb-2">
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" className="opacity-90 mb-3">
            {description}
          </Typography>
        )}
        {dateTime && (
          <Typography variant="caption" className="opacity-70">
            {new Date(dateTime).toLocaleString()}
          </Typography>
        )}
      </CardContent>
      {actionSlot && (
        <CardActions className="bg-black bg-opacity-20">
          {actionSlot}
        </CardActions>
      )}
    </Card>
  );
};

export default GenericCard;
