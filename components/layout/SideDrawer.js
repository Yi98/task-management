import React, { useRef } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import TimerIcon from "@material-ui/icons/Timer";
import { Avatar, Box, Divider, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCategoryForm from "../tasks/AddCategoryForm";

const drawerWidth = "17%";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  divider: {
    margin: "8%",
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(1.5),
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  addCategoryAvatar: {
    color: theme.palette.getContrastText("#EEE"),
    backgroundColor: "#EEE",
  },
  catergoryTitle: {
    paddingLeft: theme.spacing(2.5),
  },
  activeMenu: {
    backgroundColor: theme.palette.background.dark,
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
}));

export default function SideDrawer() {
  const classes = useStyles();
  const router = useRouter();

  const menus = [
    {
      id: 1,
      title: "My Tasks",
      redirectLink: "/",
      icon: <DashboardIcon />,
      selected: true,
    },
    {
      id: 2,
      title: "In Progress",
      redirectLink: "/in-progress",
      icon: <FormatListBulletedIcon />,
    },
    {
      id: 3,
      title: "Completed",
      redirectLink: "/completed",
      icon: <TimerIcon />,
    },
  ];

  const categories = [
    {
      id: 1,
      title: "All",
      icon: <SettingsIcon />,
    },
    {
      id: 2,
      title: "Personal",
      icon: <ExitToAppIcon />,
    },
    {
      id: 3,
      title: "Work",
      icon: <ExitToAppIcon />,
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  function openHandler(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function closeHandler(event) {
    setOpen(false);
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {menus.map((menu, index) => (
            <Link href={menu.redirectLink} key={menu.id} passHref={true}>
              <ListItem
                button
                key={menu.title}
                className={
                  menu.redirectLink == router.pathname && classes.activeMenu
                }
              >
                <Box pl={1}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                </Box>
                <ListItemText primary={menu.title} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2" className={classes.catergoryTitle}>
          Categories
        </Typography>
        <List>
          {categories.map((category, index) => (
            <ListItem button key={category.title}>
              <Box pl={1}>
                <Avatar className={classes.avatar}>1</Avatar>
              </Box>
              <ListItemText primary={category.title} />
            </ListItem>
          ))}
          <AddCategoryForm
            open={open}
            anchorEl={anchorEl}
            closeHandler={closeHandler}
          />

          <ListItem button key="add" onClick={openHandler}>
            <Box pl={1}>
              <Avatar
                className={`${classes.avatar} ${classes.addCategoryAvatar}`}
              >
                <AddIcon />
              </Avatar>
            </Box>
            <ListItemText primary="New Category" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
