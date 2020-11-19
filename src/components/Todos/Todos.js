import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container, Typography } from "@material-ui/core";
import useStyles from "./styles";
import Todo from "./Todo/Todo";

const Todos = ({ handleId, id }) => {
  const classes = useStyles();
  const todos = useSelector((state) => state.todos);

  return !todos.length ? (
    <Container maxWidth="md" className={classes.noResultContainer}>
      <Typography variant="overline">There is no result</Typography>
    </Container>
  ) : (
    <Container maxWidth="md" className={classes.hasResultContainer}>
      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} handleId={handleId} id={id} />
        ))}
      </Grid>
    </Container>
  );
};

export default Todos;
