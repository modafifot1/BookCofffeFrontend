import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {
  AccountBox,
  Timeline,
  MenuBook,
  LocalBar,
  Description,
  LibraryBooks,
} from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Logo from "../assets/Logo.png";
import { routers } from "../utils";
import { useHistory } from "react-router";

const {
  EMPLOYEE_MANAMENT,
  STATISTIC_MANAGEMENT,
  USER_MANAGEMENT,
  BANDR_BOOK_MANAGEMENT,
  BOOK_MANAGEMENT,
  ORDER_MANAGEMENT,
  PRODUCT_MANAGEMENT,
} = routers;

const drawerWidth = 280;

const categories = [
  {
    id: 0,
    name: "Quản lý nhân viên",
    url: EMPLOYEE_MANAMENT,
    icon: AccountBox,
  },
  {
    id: 1,
    name: "Quản lý doanh thu",
    url: STATISTIC_MANAGEMENT,
    icon: Timeline,
  },
  {
    id: 2,
    name: "Quản lý khách hàng",
    url: USER_MANAGEMENT,
    icon: AccountBox,
  },
  {
    id: 3,
    name: "Quản lý sản phẩm",
    url: PRODUCT_MANAGEMENT,
    icon: LocalBar,
  },
  {
    id: 4,
    name: "Quản lý đơn hàng",
    url: ORDER_MANAGEMENT,
    icon: Description,
  },
  {
    id: 5,
    name: "Quản lý sách",
    url: BOOK_MANAGEMENT,
    icon: MenuBook,
  },
  {
    id: 6,
    name: "Quản lý mượn trả sách",
    url: BANDR_BOOK_MANAGEMENT,
    icon: LibraryBooks,
  },
];

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export const SideBar = () => {
  const classes = useStyles();
  const { isSideBarCollapsed } = useSelector((state) => state.control);
  const history = useHistory();
  const onCategoryClick = (url) => {
    console.log(url);
    history.push(url);
  };
  return (
    <Drawer
      variant="permanent"
      className={`${clsx(classes.drawer, {
        [classes.drawerOpen]: isSideBarCollapsed,
        [classes.drawerClose]: !isSideBarCollapsed,
      })} sidebar-container`}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isSideBarCollapsed,
          [classes.drawerClose]: !isSideBarCollapsed,
        }),
      }}
    >
      <div className="header-sidebar">
        <img src={Logo} alt="Logo" />
      </div>
      <List>
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <ListItem
              button
              key={category.id}
              onClick={() => onCategoryClick(category.url)}
              className={`list--icon ${
                window.location.pathname.includes(category.url) &&
                category.url !== ""
                  ? "active"
                  : ""
              }`}
            >
              <ListItemIcon>
                <Icon></Icon>
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
