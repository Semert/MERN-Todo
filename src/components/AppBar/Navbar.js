import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Popover,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/Select";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import { BootstrapInput } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { filteredTodos } from "../../actions/todos";

const Navbar = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const searchFocus = useRef(null);
  const [filteredValues, setFilteredValues] = useState({
    search: "",
    option: "all",
  });

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
          >
            <PlaylistAddCheckIcon />
          </IconButton>

          <div
            className={classes.search}
            onClick={() => searchFocus.current.focus()}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(event) => {
                setFilteredValues({
                  ...filteredValues,
                  search: event.target.value,
                });
                dispatch(
                  filteredTodos(filteredValues.option, event.target.value)
                );
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              inputRef={searchFocus}
            />
          </div>
          <div className={classes.inputDiv}>
            <InputLabel className={classes.inputLabel}>Filter</InputLabel>
            <NativeSelect
              className={classes.nativeSelect}
              onChange={(event) => {
                setFilteredValues({
                  ...filteredValues,
                  option: event.target.value,
                });
                dispatch(
                  filteredTodos(event.target.value, filteredValues.search)
                );
              }}
              label="All"
              value={filteredValues.option}
              input={<BootstrapInput />}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"uncompleted"}>Uncompleted</MenuItem>
            </NativeSelect>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div>
              <IconButton onClick={handleClick} color="primary">
                <Badge badgeContent={todos.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.typography}>
                  Total number of Todos
                </Typography>
              </Popover>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="secondary">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={todos.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Todos</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
