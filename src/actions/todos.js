import * as api from "../api";

export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = (todo) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(todo);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id, todo);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.deleteTodo(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const completedTodo = (id) => async (dispatch) => {
  try {
    const { data } = await api.completedTodo(id);

    dispatch({ type: "COMPLETED", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const filteredTodos = (option, text) => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();

    const filtered = data.filter((todo) =>
      todo.message.toLowerCase().includes(text.toLowerCase())
    );

    let optional = null;

    switch (option) {
      case "completed":
        optional = filtered.filter((todo) => todo.completed === true);
        break;
      case "uncompleted":
        optional = filtered.filter((todo) => todo.completed === false);
        break;
      case "all":
        optional = filtered;
        break;
      default:
        optional = filtered;
        break;
    }

    dispatch({ type: "FETCH_ALL", payload: optional });
  } catch (error) {
    console.log(error);
  }
};
