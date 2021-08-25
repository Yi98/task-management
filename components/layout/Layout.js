import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import Feedback from "../ui/Feedback";
import FeedbackContext from "../../store/feedbackContext";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const feedbackCtx = useContext(FeedbackContext);
  const activeFeedback = feedbackCtx.feedback;

  const isIndexPage = router.pathname === "/" ? true : false;

  return (
    <Fragment>
      {!isIndexPage && (
        <Fragment>
          <div className={classes.root}>
            <Navbar />
            <SideDrawer />
            <main className={classes.content}>{props.children}</main>
          </div>
          {activeFeedback && <Feedback message={activeFeedback.message} />}
        </Fragment>
      )}

      {isIndexPage && <Fragment>{props.children}</Fragment>}
    </Fragment>
  );
};

export default Layout;
