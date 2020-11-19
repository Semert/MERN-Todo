import React, { useState, forwardRef, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createTodo } from "../../actions/todos";
import useStyles from "./styles";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Form = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const textField = useRef(null);
  const [data, setData] = useState({ message: "" });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!textField.current.value.trim()) {
      setError("Please fill the field!");
      return;
    }

    dispatch(createTodo(data));
    setData({ message: "" });
    setOpen(false);
    setError("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
        className={classes.addBtn}
      >
        ADD TODO
      </Button>

      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle variant="overline">TODO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What's to be done? You’re guaranteed to save time and achieve great
            things.
          </DialogContentText>
          <TextField
            name="message"
            variant="outlined"
            inputRef={textField}
            label="Desc"
            fullWidth
            onChange={(event) =>
              setData({ ...data, message: event.target.value })
            }
          />
          <p className={classes.dialogParagraph}> {error && error}</p>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            className={classes.cancelBtn}
            variant="contained"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleSubmit}
            className={classes.addTodoBtn}
            variant="contained"
            type="submit"
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Form;
