import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Stop from './Stop';
import Power from './Power';
import Settings from './Settings';
import Status from '../Connections/Status';
import { getByLink } from '../Shared/components/Config/Navigation';

import { useConnectionStore, CONNECTION_STATUS } from '../Store/useConnectionStore';

export const Header = props => {

  const status = useConnectionStore(state => state.status);
  const host = useConnectionStore(state => state.host);
  const layoutId = useConnectionStore(state => state.layoutId);
  const dccApiStatus = useConnectionStore(state => state.dccApiStatus);
  const dccDeviceStatus = useConnectionStore(state => state.dccDeviceStatus);

  let location = useLocation();
  const navItem = getByLink(location.pathname);

  return (
    <>
      <AppBar position="sticky" className="">
        <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              disabled
            >
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            {navItem ? navItem.label : ''}
          </Typography>
          <Link to="/dcc">
            <Chip 
              label="DCC" 
              color="primary" 
              size="small"
              variant='outlined'
              sx={{ mr: 2 }}
            />
          </Link>
          <Link to="/settings">
            <Chip 
              label={`${host} * ${layoutId}`} 
              color="primary" 
              size="small"
              variant='outlined'
              sx={{ mr: 2 }}
            />
          </Link>
          <Stop />
          <Power />
          <Status />
          <Link to="/settings">
            <IconButton
                aria-label="settings"
              >
              <SettingsIcon />
            </IconButton>
          </Link>
          {/* <IconButton
              color="inherit"
              aria-label="menu"
            >
            <Badge badgeContent={100} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
        {/* <Box sx={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          fontSize: '.75rem'
        }}>
          <pre>
            {up.xs && (<>XSup-</>)}
            {up.sm && (<>SMup-</>)}
            {up.md && (<>MDup-</>)}
            {up.lg && (<>LGup-</>)}
            {up.xl && (<>XLup-</>)}
          </pre>
          <pre>
            {down.xs && (<>XSdown-</>)}
            {down.sm && (<>SMdown-</>)}
            {down.md && (<>MDdown-</>)}
            {down.lg && (<>LGdown-</>)}
            {down.xl && (<>XLdown-</>)}
          </pre>
        </Box> */}
      </AppBar>
    </>
  );

}

export default Header;