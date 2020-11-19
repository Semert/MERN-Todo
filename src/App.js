import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTodos } from "./actions/todos";
import Todos from "./components/Todos/Todos";
import Form from "./components/Form/Form";
import Navbar from "./components/AppBar/Navbar";

const App = () => {
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleId = (id) => {
    setId(id);
  };

  return (
    <>
      <Navbar />
      <Form />
      <Todos id={id} handleId={handleId} />
    </>
  );
};

export default App;
