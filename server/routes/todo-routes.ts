import express, { Router } from "express";
import { validateTodo } from "../validators/to-do-validator";
import {
  addTodo,
  listTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo-controller";
import {validateRequest} from "../middleware/validate-request"

const router: Router = express.Router();
router.post(
  "/add",
  validateTodo,
  validateRequest,
  addTodo as express.RequestHandler
);

router.get("/list", listTodos as express.RequestHandler);
router.put("/update/:id",validateTodo, validateRequest, updateTodo as express.RequestHandler);
router.delete("/delete/:id", deleteTodo as express.RequestHandler);

export default router;
