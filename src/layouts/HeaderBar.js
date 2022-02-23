import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../redux/slices";
import { Badge } from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import AvatarMenu from "../components/common/AvatarMenu";
import ModalProfileAdmin from "../components/common/ModalProfileAdmin";
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));

export const HeaderBar = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const { isSideBarCollapsed } = useSelector((state) => state.control);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <AppBar
      position="fixed"
      className={`${clsx(classes.appBar, {
        [classes.appBarShift]: isSideBarCollapsed,
      })} app-admin__app-bar`}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSideBar())}
          className={`${clsx(classes.menuButton)} btn--menu`}
        >
          <MenuIcon />
        </IconButton>
        <div
          style={{ marginLeft: isSideBarCollapsed ? "auto" : "unset" }}
          className="flex"
        >
          {/* <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <Notifications color="action" />
            </Badge>
          </IconButton> */}
          <AvatarMenu openModalProfile={() => setOpenProfile(true)} />
        </div>
      </Toolbar>
      {openProfile && (
        <ModalProfileAdmin
          isModalVisible={true}
          close={() => setOpenProfile(false)}
        />
      )}
    </AppBar>
  );
};
