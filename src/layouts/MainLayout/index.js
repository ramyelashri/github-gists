import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const MainLayout = ({children}) => {
  return (
    <>
      <div className="Global__main-container">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              🔥 Github Gists App
            </Typography>
          </Toolbar>
        </AppBar>
        <main>{children}</main>
      </div>
    </>
  )
}

export default MainLayout;