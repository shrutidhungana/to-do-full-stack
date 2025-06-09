import express, { Router } from "express";
import { addTodo, listTodos, updateTodo } from "../controllers/todo-controller";

const router: Router = express.Router();

router.post("/add", addTodo as express.RequestHandler);
router.get("/list", listTodos as express.RequestHandler);
router.put("/update/:id", updateTodo as express.RequestHandler);

export default router;