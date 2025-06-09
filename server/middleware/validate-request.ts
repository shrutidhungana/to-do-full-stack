// middleware/validateRequest.ts
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      status: 422,
      message: "Validation failed",
      success: false,
      data: errors.array(),
    });
    return;
  }
  next();
};
