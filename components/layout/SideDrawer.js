import React, { useContext, useEffect, useState } from "react";
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
import { Avatar, Box, Divider, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddCategoryForm from "../categories/AddCategoryForm";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import useSWR from "swr";
import { initializeFetcher } from "../../lib/swr";
import CategoryContext from "../../store/category-context";

const drawerWidth = "17%";
const drawerMinWidth = "250px";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    minWidth: drawerMinWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    minWidth: drawerMinWidth,
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
    fontSize: theme.spacing(1.5),
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
  },
  addCategoryAvatar: {
    color: theme.palette.getContrastText("#EEE"),
    backgroundColor: "#EEE",
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  catergoryTitle: {
    paddingLeft: theme.spacing(2.5),
    fontSize: "1rem",
  },
  activeMenu: {
    backgroundColor: theme.palette.background.dark,
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
  categoryName: {
    paddingLeft: theme.spacing(1),
  },
  categoryMenu: {
    height: "65%",
    overflowY: "auto",
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const router = useRouter();
  const categoryCtx = useContext(CategoryContext);

  const fetcher = initializeFetcher();
  const { data, error } = useSWR(
    `/api/categories?pathname=${router.pathname}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      categoryCtx.dispatchCategory({
        type: "INPUT",
        val: data.categories,
      });
    }
  }, [data]);

  const menus = [
    {
      id: 1,
      title: "Dashboard",
      redirectLink: "/dashboard",
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
      icon: <CheckCircleOutlineIcon />,
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

  function selectCategoryHandler(id) {
    let pathname = router.pathname;

    if (pathname != "/in-progress" || pathname != "completed") {
      pathname = "/in-progress";
    }

    const url = id ? `${pathname}?category=${id}` : `${pathname}`;
    router.replace(url);
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

        <List className={classes.categoryMenu}>
          <ListItem button key="add" onClick={openHandler}>
            <Avatar
              className={`${classes.avatar} ${classes.addCategoryAvatar}`}
            >
              <AddIcon />
            </Avatar>
            <ListItemText primary="New Category" />
          </ListItem>
          {categoryCtx.categoryState.original.map((category) => (
            <ListItem
              button
              key={category.name}
              onClick={selectCategoryHandler.bind(null, category._id)}
            >
              <ListItemText
                primary={category.name}
                className={classes.categoryName}
              />
              <Avatar className={classes.avatar}>{category.sum || 0}</Avatar>
            </ListItem>
          ))}
          <AddCategoryForm
            open={open}
            anchorEl={anchorEl}
            closeHandler={closeHandler}
          />
        </List>
      </div>
    </Drawer>
  );
}
