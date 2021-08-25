import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import Feedback from "../ui/feedback";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(7),
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Navbar />
        <SideDrawer />
        <main className={classes.content}>{props.children}</main>
      </div>
      <Feedback />
    </Fragment>
  );
};

export default Layout;
