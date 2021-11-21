import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Icon } from "../../components/Button";
import { Link } from "react-router-dom";

import './index.css';

export default function MenuDropDown({ ...props }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Icon
        icon={props.icon}
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {props.buttons.map((items, index) => (
          <Link 
            key={index} 
            to={items.link}
            className="menu-dropdown-link"
            >
            <MenuItem onClick={handleClose}>{items.nome}</MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  )
}