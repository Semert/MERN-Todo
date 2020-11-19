import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    marginTop: 20,
  },
  addBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    fontWeight: "bold",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  cancelBtn: {
    backgroundColor: "rgba(0, 126, 255, 0.24)",
    fontWeight: " bold",
  },
  addTodoBtn: {
    backgroundColor: "rgb(9 187 60 / 20%)",
    marginRight: 15,
    fontWeight: "bold",
    width: "16%",
  },
  dialogParagraph: {
    color: "red",
  },
}));
