import { Request, Response } from "express";
import Todo, { ITodo } from "../modals/Todo";

 const addTodo = async (req: Request, res: Response): Promise<void| Response> => {
   try {
     const { name, shortDescription, dateTime } = req.body;

     // Server-side validation
     if (!name || !shortDescription || !dateTime) {
       return res.status(400).json({
         status: 400,
         message: "All fields are required",
         success: false,
         data: null,
       });
     }

     if (isNaN(Date.parse(dateTime))) {
       return res.status(400).json({
         status: 400,
         message: "Invalid dateTime format",
         success: false,
         data: null,
       });
     }

     // Check for duplicate: same name and dateTime
     const existingTodo = await Todo.findOne({
       name: name.trim(),
       dateTime: new Date(dateTime),
     });

     if (existingTodo) {
       return res.status(409).json({
         status: 409,
         message: "Duplicate todo item exists with the same name and date/time",
         success: false,
         data: null,
       });
     }

     const todoData: Partial<ITodo> = {
       name: name.trim(),
       shortDescription: shortDescription.trim(),
       dateTime: new Date(dateTime),
       done: false,
     };

     const todo = new Todo(todoData);
     const savedTodo = await todo.save();

     return res.status(201).json({
       status: 201,
       message: "Todo added successfully",
       success: true,
       data: savedTodo,
     });
   } catch (error) {
     console.error("Error adding todo:", error);
     return res.status(500).json({
       status: 500,
       message: "Cannot add todo",
       success: false,
       data: null,
     });
   }
 };

 const listTodos = async (req: Request, res: Response): Promise<void> => {
   try {
     const { filter } = req.query;

     let todos;

     if (filter === "done") {
       todos = await Todo.find({ done: true }).sort({ dateTime: 1 });
     } else if (filter === "upcoming") {
       todos = await Todo.find({
         done: false,
         dateTime: { $gte: new Date() },
       }).sort({ dateTime: 1 });
     } else {
       todos = await Todo.find().sort({ dateTime: 1 });
     }

     res.status(200).json({
       status: 200,
       message: "Todos fetched successfully",
       success: true,
       data: todos,
     });
   } catch (error) {
     console.error("Error fetching todos:", error);
     res.status(500).json({
       status: 500,
       message: "Cannot fetch todos",
       success: false,
       data: null,
     });
   }
 };


export { addTodo, listTodos };