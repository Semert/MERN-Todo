import mongoose from "mongoose";
import TodoModel from "../models/TodoModel.js";

export const getTodos = async (req, res) => {
  try {
    const allTodos = await TodoModel.find();

    res.status(200).json(allTodos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addTodo = async (req, res) => {
  const todo = req.body;

  const newTodo = new TodoModel(todo);

  try {
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No results");

  const updateTodo = await TodoModel.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true }
  );

  res.json(updateTodo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Not exist a todo with id: ${id}`);

  await TodoModel.findByIdAndRemove(id);

  res.json({ message: "Todo deleted successfully." });
};

export const completedTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Not exist a todo with id: ${id}`);

  const todo = await TodoModel.findById(id);
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    id,
    { completed: !todo.completed },
    { new: true }
  );
  res.json(updatedTodo);
};
