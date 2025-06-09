import express, { Router } from "express";
import { addTodo } from "../controllers/todo-controller";

const router: Router = express.Router();

router.post("/add", addTodo as express.RequestHandler);