import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model("TodoModel", todoSchema);

export default TodoModel;
