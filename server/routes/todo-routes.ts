import express, { Router } from "express";
import { addTodo, listTodos } from "../controllers/todo-controller";

const router: Router = express.Router();

router.post("/add", addTodo as express.RequestHandler);
router.get("/list", listTodos as express.RequestHandler);

export default router;