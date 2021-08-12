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

export const mainListItems = (
  <div>
    <ListSubheader inset>Requests</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <HourglassFullIcon />
      </ListItemIcon>
      <ListItemText primary="Pending" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DoneIcon />
      </ListItemIcon>
      <ListItemText primary="Completed" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>User</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="User Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);