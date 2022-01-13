import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import HomeIcon from "@material-ui/icons/Home";
import { useTranslation } from "react-i18next";

export default function SecondaryListItems(auth) {
  const { t } = useTranslation();
  return (
    <div>
      <ListSubheader inset>{t("user")}</ListSubheader>
      <Tooltip title="User profile">
        <Link to="/user" style={{ color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={t("userProfile")} />
          </ListItem>
        </Link>
      </Tooltip>
      <Tooltip title="Back to home">
        <Link to="/" style={{ color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("home")} />
          </ListItem>
        </Link>
      </Tooltip>
      <Tooltip title="Log Out">
        <ListItem button onClick={() => auth.signOut()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={t("logout")} />
        </ListItem>
      </Tooltip>
    </div>
  );
}
