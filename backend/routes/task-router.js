import express from "express";

const taskRouter = express.Router();
import {
  deleteTask,
  getTask,
  getTasks,
  newTask,
  updateTask,
} from "../controller/task-controller.js";
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/new-task", newTask);
taskRouter.post("/update-task", updateTask);
taskRouter.post("/delete-task", deleteTask);

export default taskRouter;
