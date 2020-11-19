import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "8px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
  btn: { margin: 20, width: 100 },
  txt: {
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
  },
  icon: { marginRight: 5 },
  accordionSummary: {
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    marginLeft: "auto",
  },
  moreIcon: {
    color: "black",
  },
  dialogParagraph: {
    color: "red",
  },
}));
