"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodo = void 0;
const express_validator_1 = require("express-validator");
exports.validateTodo = [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("shortDescription")
        .trim()
        .notEmpty()
        .withMessage("Short description is required"),
    (0, express_validator_1.body)("dateTime")
        .notEmpty()
        .withMessage("DateTime is required")
        .isISO8601()
        .withMessage("DateTime must be a valid ISO8601 date")
        .toDate(),
];
