import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import todosRoutes from "./routes/todos.js";

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use("/todos", todosRoutes);

const CONNECTION_URL =
  "mongodb+srv://mertefe:mertefe123@cluster0.gdyo9.mongodb.net/<dbname>?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: false,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
