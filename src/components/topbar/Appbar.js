import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
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
import CloseIcon from "@material-ui/icons/Close";
import SecondaryListItems from "./SecondaryListItems";
import MainListItems from "./MainListItems"
import clsx from "clsx";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@material-ui/icons/Language";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useTranslation } from "react-i18next";

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
    justifyContent: "flex-start",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  homeButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  langButton: {
    color: "white",
    "& span": {
      color: "white",
    },
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
  //make the color of the icon white
  links: {
      "& svg": {
        color: "white",
      }
  },
}));

export default function Appbar(props) {
  const { appBarTitle } = props;
  const { auth, setSelected } = useAuth();
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(
    `${i18n.language === "en" ? "ENGLISH" : "മലയാളം"}`
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLangVisible, setIsLangVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(max-width: 583px)").matches) {
      setIsLangVisible(false);
    } else {
      setIsLangVisible(true);
    }
  }, []);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleLang = (event) => {
    setLang(event.target.outerText);
    if (event.target.outerText === "ENGLISH") {
      i18n.changeLanguage("en");
    } else if (event.target.outerText === "മലയാളം") {
      i18n.changeLanguage("ml");
    }
    setAnchorEl(null);
  };

  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {path != "dashboard" && (
            <Tooltip title="Back to My Requests">
            <Link to="/dashboard" className={classes.links}>
              <IconButton edge="start" color="inherit">
                  <KeyboardBackspaceIcon fontSize="large" />
                  </IconButton>
                  </Link>
            </Tooltip>
          )}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {appBarTitle}
          </Typography>
          <Tooltip title="Toggle Language">
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<LanguageIcon />}
              color="inherit"
              className={classes.langButton}
            >
              {isLangVisible && lang}
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            //select option based on language selected in i18n
            selected={lang}
          >
            <MenuItem onClick={toggleLang} value="en">
              ENGLISH
            </MenuItem>
            <MenuItem onClick={toggleLang} value="ml">
              മലയാളം
            </MenuItem>
          </Menu>
          <Tooltip title="Home">
          <Link to="/" className={classes.links}>
            <IconButton className={classes.homeButton}>
                <HomeIcon />
                </IconButton>
                </Link>
          </Tooltip>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
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
        <List>{MainListItems(setSelected, setMobileOpen)}</List>
        <Divider />
        <List>{SecondaryListItems(auth, setMobileOpen)}</List>
      </Drawer>
      {path == "dashboard" && (
        <Drawer variant="permanent" className={classes.webDrawer} open={true}>
          <div className={classes.toolbarIcon}></div>
          <Divider />
          <List>{MainListItems(setSelected, setMobileOpen)}</List>
          <Divider />
          <List>{SecondaryListItems(auth, setMobileOpen)}</List>
        </Drawer>
      )}
    </div>
  );
}
