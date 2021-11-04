import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import { mainListItems, secondaryListItems } from "./Sidebar";
import clsx from "clsx";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  mobDrawer: {
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  webDrawer: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Appbar(props) {
  const { window } = props;
  const { auth, setSelected } = useAuth();
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={clsx(
              classes.menuButton,
              mobileOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Requests
          </Typography>
          <Tooltip title="Home">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={(e) => window.location.replace("/")}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        className={classes.mobDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(setSelected, setMobileOpen)}</List>
        <Divider />
        <List>{secondaryListItems(auth, setMobileOpen)}</List>{" "}
      </Drawer>
      <Drawer variant="permanent" className={classes.webDrawer} open={true}>
        <div className={classes.toolbarIcon}></div>
        <Divider />
        <List>{mainListItems(setSelected, setMobileOpen)}</List>
        <Divider />
        <List>{secondaryListItems(auth, setMobileOpen)}</List>
      </Drawer>
    </div>
  );
}
