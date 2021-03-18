import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './style.scss';

export default function TopBar() {

  return (
    <div className="TopBar">
      <h1 className="TopBar__title">
        🔥 Github Gists App
      </h1>
      <div>
        <Toolbar>
          <InputBase
            placeholder="Search…"
            inputProps={{'aria-label': 'search'}}
          />
          <SearchIcon/>
        </Toolbar>
      </div>
    </div>
  );
}