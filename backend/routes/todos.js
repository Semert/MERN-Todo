import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  completedTodo,
} from "../controllers/todos.js";
const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/completed", completedTodo);

export default router;
