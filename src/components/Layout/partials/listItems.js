import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
// import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LanguageIcon from '@material-ui/icons/Language';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Link, useHistory } from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/users">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link to="/countries">
      <ListItem button>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="Countries" />
      </ListItem>
    </Link>
    <Link to="/states">
      <ListItem button>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="States" />
      </ListItem>
    </Link>
    <Link to="/cargoes">
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Cargoes" />
      </ListItem>
    </Link>
    <Link to="/directions">
      <ListItem button>
        <ListItemIcon>
          <DirectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Directions" />
      </ListItem>
    </Link>
    {/* <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

export const SecondaryListItems = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    history.push('/');
  };
  return (
    <div>
      {/* <ListSubheader inset>Saved reports</ListSubheader> */}
      <ListItem button onClick={logoutHandler}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};
