import { body, ValidationChain } from "express-validator";


export const validateTodo: ValidationChain[] = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required"),

  body("dateTime")
    .notEmpty()
    .withMessage("DateTime is required")
    .isISO8601()
    .withMessage("DateTime must be a valid ISO8601 date")
    .toDate(),
];
