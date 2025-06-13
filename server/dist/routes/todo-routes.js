"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const to_do_validator_1 = require("../validators/to-do-validator");
const todo_controller_1 = require("../controllers/todo-controller");
const validate_request_1 = require("../middleware/validate-request");
const router = express_1.default.Router();
router.post("/add", to_do_validator_1.validateTodo, validate_request_1.validateRequest, todo_controller_1.addTodo);
router.get("/list", todo_controller_1.listTodos);
router.put("/update/:id", to_do_validator_1.validateTodo, validate_request_1.validateRequest, todo_controller_1.updateTodo);
router.delete("/delete/:id", todo_controller_1.deleteTodo);
exports.default = router;
