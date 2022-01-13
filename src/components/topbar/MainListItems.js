import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DoneIcon from "@material-ui/icons/Done";
import DraftsIcon from "@material-ui/icons/Drafts";
import Tooltip from "@material-ui/core/Tooltip";
import HomeIcon from "@material-ui/icons/Home";
import { useTranslation } from "react-i18next";

export default function MainListItems (setSelected, setOpen) {
  const { t } = useTranslation();
  return (
    <div>
      <ListSubheader inset>{t("requestStatus")}</ListSubheader>
      <Tooltip title="Pending Requests">
        <ListItem
          button
          onClick={() => {
            setSelected("Pending");
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <HourglassFullIcon />
          </ListItemIcon>
          <ListItemText primary={t("Pending")} />
        </ListItem>
      </Tooltip>
      <Tooltip title="Completed Requests">
        <ListItem
          button
          onClick={() => {
            setSelected("Completed");
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary={t("Completed")} />
        </ListItem>
      </Tooltip>
      <Tooltip title="Drafts">
        <ListItem
          button
          onClick={() => {
            setSelected("Draft");
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={t("Drafts")} />
        </ListItem>
      </Tooltip>
    </div>
  );
};

