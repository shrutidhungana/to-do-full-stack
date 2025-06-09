import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import todoRoutes from "./routes/todo-routes";

dotenv.config();

const uri: string = process.env.MONGO_URI ?? "";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.error("MongoDB connection error:", err));

const app: express.Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
