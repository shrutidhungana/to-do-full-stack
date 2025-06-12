import { Request, Response } from "express";
import Todo, { ITodo } from "../modals/Todo";

const addTodo = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
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

    // Determine if done based on dateTime (past => done: true, future => done: false)
    const todoDate = new Date(dateTime);
    const done = todoDate.getTime() < new Date().getTime();

    const todoData: Partial<ITodo> = {
      name: name.trim(),
      shortDescription: shortDescription.trim(),
      dateTime: todoDate,
      done,
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
    const filter = req.query.filter as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    let query = {};

    if (filter === "done") {
      query = { done: true };
    } else if (filter === "upcoming") {
      query = { done: false };
    } else if (filter === "all" || !filter) {
      query = {};
    }

    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments(query);

    res.status(200).json({
      status: 200,
      message: "Todos fetched successfully",
      success: true,
      data: {
        todos,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
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

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, shortDescription, dateTime } = req.body;

    if (!name || !shortDescription || !dateTime) {
      res.status(400).json({
        status: 400,
        message: "All fields (name, shortDescription, dateTime) are required",
        success: false,
        data: null,
      });
      return;
    }

    const existing = await Todo.findOne({ name, _id: { $ne: id } });
    if (existing) {
      res.status(409).json({
        status: 409,
        message: "Todo with the same name already exists",
        success: false,
        data: null,
      });
      return;
    }

    // Determine if done based on dateTime (past => done: true, future => done: false)
    const todoDate = new Date(dateTime);
    const done = todoDate.getTime() < new Date().getTime();

    const updated = await Todo.findByIdAndUpdate(
      id,
      { name, shortDescription, dateTime: todoDate, done },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({
        status: 404,
        message: "Todo not found",
        success: false,
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: "Todo updated successfully",
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      status: 500,
      message: "Cannot update todo",
      success: false,
      data: null,
    });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({
        status: 404,
        message: "Todo not found",
        success: false,
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: "Todo deleted successfully",
      success: true,
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      status: 500,
      message: "Cannot delete todo",
      success: false,
      data: null,
    });
  }
};

export { addTodo, listTodos, updateTodo, deleteTodo };
