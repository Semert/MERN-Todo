import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  TextField,
  Backdrop,
  Fade,
  Modal,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import UpdateIcon from "@material-ui/icons/Update";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Aos from "aos";
import "aos/dist/aos.css";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, completedTodo, updateTodo } from "../../../actions/todos";

const Todo = ({ todo, handleId, id }) => {
  const classes = useStyles();
  const [data, setData] = useState({ message: "" });
  const [open, setOpen] = useState(false);
  const textField = useRef(null);

  const todos = useSelector((state) =>
    id ? state.todos.find((todo) => todo._id === id) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (todos) setData(todos);
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!textField.current.value.trim()) {
      return;
    }
    if (id) {
      dispatch(updateTodo(id, data));
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} data-aos="fade-up">
      <Accordion
        style={{
          margin: 10,
          borderBottom: todo.completed ? "4px solid green" : "4px solid blue",
        }}
      >
        <AccordionSummary
          expandIcon={
            <UpdateIcon
              style={{
                color: todo.completed ? "green" : "blue",
              }}
            />
          }
          className={classes.accordionSummary}
        >
          <FormControlLabel
            onClick={(event) => {
              event.stopPropagation();
              dispatch(completedTodo(todo._id));
            }}
            onFocus={(event) => event.stopPropagation()}
            control={
              <Checkbox style={{ color: todo.completed ? "green" : "blue" }} />
            }
            label={todo.message}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "grey" : "",
            }}
            checked={todo.completed ? true : false}
          />

          <Button
            className={classes.deleteIcon}
            size="small"
            color="secondary"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(deleteTodo(todo._id));
            }}
          >
            <DeleteIcon fontSize="small" />
          </Button>

          <Button
            className={classes.moreIcon}
            size="small"
            onClick={(event) => {
              handleId(todo._id);
              handleOpen();
              event.stopPropagation();
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography variant="caption" className={classes.txt}>
                  <EditIcon fontSize="small" className={classes.icon} /> EDIT
                </Typography>
                <TextField
                  inputRef={textField}
                  variant="outlined"
                  label="Desc"
                  value={data.message}
                  onChange={(event) =>
                    setData({ ...data, message: event.target.value })
                  }
                />
                <div>
                  <Button
                    className={classes.btn}
                    onClick={handleClose}
                    color="secondary"
                    variant="contained"
                  >
                    CANCEL
                  </Button>
                  <Button
                    className={classes.btn}
                    onClick={(event) => {
                      handleSubmit(event);
                      handleClose();
                    }}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    CHANGE
                  </Button>
                </div>
              </div>
            </Fade>
          </Modal>
        </AccordionSummary>

        <AccordionDetails>
          <Typography color="textSecondary">
            {moment(todo.createdAt).fromNow()}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Todo;
