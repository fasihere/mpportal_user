import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import DoneIcon from '@material-ui/icons/Done';
import DraftsIcon from '@material-ui/icons/Drafts';
import Tooltip from '@material-ui/core/Tooltip'

export const mainListItems = (setSelected, setOpen) => (
  <div>
    <ListSubheader inset>Requests</ListSubheader>
    <Tooltip title="Pending Requests">
      <ListItem button onClick={() => {
        setSelected('Pending');
        setOpen(false)
        }}>
        <ListItemIcon>
          <HourglassFullIcon />
        </ListItemIcon>
        <ListItemText primary="Pending" />
      </ListItem>
    </Tooltip>
    <Tooltip title="Completed Requests">
      <ListItem button onClick={() => {
        setSelected('Completed');
        setOpen(false);
        }}>
        <ListItemIcon>
          <DoneIcon />
        </ListItemIcon>
        <ListItemText primary="Completed" />
      </ListItem>
    </Tooltip>
    <Tooltip title="Drafts">
    <ListItem button onClick={() => {
      setSelected('Draft');
      setOpen(false)
      }}>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
    </Tooltip>
  </div>
);

export const secondaryListItems = (auth) =>  (
  <div>
    <ListSubheader inset>User</ListSubheader>
    <Tooltip title="User profile">
      <ListItem button onClick={() => window.location.replace('/user/')}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="User Profile" />
      </ListItem>
    </Tooltip>
    <Tooltip title="Log Out">
    <ListItem button onClick={() => auth.signOut()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </Tooltip>
  </div>
);