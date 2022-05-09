import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import bell from "../../../../../content/svg/bell.svg";

import ic_folder from "../../../../../content/svg/folder.svg";
import ic_plaintext from "../../../../../content/svg/plain-text.svg";
import ic_board from "../../../../../content/svg/doc/board.svg";



const useStyles = makeStyles({
  list: {
    // width: 250,
    height:"200px",
    minHeight:"200px",
    maxHeight:"200px"
  },
  fullList: {
    width: 'auto',
    height:"200px",
    maxHeight:"200px"
  },
  iconStyle:{
   height:"20px",
   width:"20px",
  }
});

export default function TemporaryDrawer({createFile}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem button
      onClick={()=>createFile(1)}
      >
            <ListItemIcon>
                <img
                alt=""
                src={ic_folder}
                className={classes.iconStyle}
                />
            </ListItemIcon>
            <ListItemText primary={"New Folder"} />
          </ListItem>
          <ListItem button
           onClick={()=>createFile(2)} >
            <ListItemIcon>
                <img
                alt=""
                src={ic_plaintext}
                className={classes.iconStyle}
                />
            </ListItemIcon>
            <ListItemText primary={"Upload Document"} />
          </ListItem>
          <ListItem button 
           onClick={()=>createFile(5)}>
            <ListItemIcon>
                <img
                alt=""
                src={ic_board}
                className={classes.iconStyle}
                />
            </ListItemIcon>
            <ListItemText primary={"Add White Board"} />
          </ListItem>
          <ListItem button 
           onClick={()=>createFile(3)}>
            <ListItemIcon>
                <img
                alt=""
                src={ic_plaintext}
                className={classes.iconStyle}
                />
            </ListItemIcon>
            <ListItemText primary={"Add Document"} />
          </ListItem>
          <ListItem button 
          onClick={()=>createFile(4)}>
            <ListItemIcon>
                <img
                alt=""
                src={ic_plaintext}
                className={classes.iconStyle}
                />
            </ListItemIcon>
            <ListItemText primary={"Add Grid File"} />
          </ListItem>
      </List>

      
    </div>
  );


  return (
    <div >
     
        <React.Fragment >
         
        <div 
                className="addBtn"
                onClick={toggleDrawer("bottom", true)}

                >
                    <div>
                    +
                    </div>
                </div>

          <Drawer  className="h-34" anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
            {list("bottom")}
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}
