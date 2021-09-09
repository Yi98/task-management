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
    margin: "3% 10%",
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(1.5),
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  activeMenu: {
    backgroundColor: theme.palette.background.dark,
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
  activeTitle: {
    fontWeight: "600",
  },
  activeIcon: {
    color: "#000",
    opacity: 0.7,
  },
  categoryName: {
    paddingLeft: theme.spacing(1),
  },
  categoryItem: {
    padding: "2% 8%",
  },
  addIcon: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  menuIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function SideDrawer(props) {
  const [isOpened, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const router = useRouter();
  const categoryCtx = useContext(CategoryContext);

  const fetcher = initializeFetcher();
  const { data, error } = useSWR(
    `/api/categories?pathname=${router.pathname}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
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

  function selectCategoryHandler(id) {
    let pathname = router.pathname;

    if (pathname != "/in-progress" && pathname != "/completed") {
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
                <ListItemIcon
                  className={`${
                    menu.redirectLink == router.pathname && classes.activeIcon
                  } ${classes.menuIcon}`}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.title}
                  classes={
                    menu.redirectLink == router.pathname && {
                      primary: classes.activeTitle,
                    }
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider className={classes.divider} />

        <List>
          {categoryCtx.categoryState.original &&
            categoryCtx.categoryState.original.map((category) => (
              <ListItem
                button
                key={category.name}
                onClick={selectCategoryHandler.bind(null, category._id)}
                className={classes.categoryItem}
              >
                <ListItemText
                  primary={category.name}
                  className={`${classes.categoryName}`}
                />
                <Avatar className={classes.avatar} style={{ backgroundColor: category.hexColor }}>{category.sum || 0}</Avatar>
              </ListItem>
            ))}
          <ListItem
            button
            key="add"
            onClick={handleClickOpen}
            className={classes.categoryItem}
          >
            <AddIcon className={classes.addIcon} />

            <ListItemText primary="New Category" />
          </ListItem>
          <AddCategoryForm isOpened={isOpened} closeHandler={handleClose} />
        </List>
      </div>
    </Drawer>
  );
}
