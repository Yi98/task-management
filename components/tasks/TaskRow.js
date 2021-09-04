import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Chip, Grid, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import FeedbackContext from "../../store/feedback-context";
import CategoryContext from "../../store/category-context";
import TaskDetails from "../../components/tasks/TaskDetails";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(0.3),
      width: "100%",
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      padding: "1% 0 1% 10px",
    },
  },
  checkbox: {
    marginTop: theme.spacing(-1),
  },
  topContainer: {
    marginTop: theme.spacing(0.5),
  },
  paperRow: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.background.whiteDark,
    },
  },
}));

export default function TaskRow(props) {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);
  const feedbackCtx = useContext(FeedbackContext);
  const categoryCtx = useContext(CategoryContext);
  const [selectedTask, setSelectedTask] = useState({});
  const router = useRouter();

  const checkTaskHandler = async (event) => {
    event.stopPropagation();
    setChecked(event.target.checked);

    let response;
    if (router.pathname == "/in-progress") {
      response = await axios.patch(`/api/tasks/${event.target.value}`, {
        completed: true,
      });
    } else if (router.pathname == "/completed") {
      response = await axios.delete(`/api/tasks/${event.target.value}`);
    }

    router.replace(router.asPath);

    feedbackCtx.showFeedback({ message: response.data.message });
  };

  const selectTaskHandler = (task) => (event) => {
    setSelectedTask(task);
    categoryCtx.dispatchCategory({
      type: "SELECT_ACTIVE",
      val: task.category._id.toString(),
    });
    openDetailHandler();
  };

  const [isDetailOpened, setDetailOpened] = useState(false);

  const openDetailHandler = () => {
    setDetailOpened(true);
  };

  const closeDetailHandler = () => {
    setDetailOpened(false);
  };

  return (
    <div className={classes.root}>
      <Paper
        elevation={1}
        className={router.pathname == "/in-progress" && classes.paperRow}
        onClick={
          router.pathname == "/in-progress" ? selectTaskHandler(props) : null
        }
      >
        <Grid container className={classes.topContainer}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{props.title}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.topContainer}>
            <Chip label={props.category.name} color="primary" size="small" />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">{props.dueDate}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.checkbox}>
            <Checkbox
              value={props.taskId}
              onClick={checkTaskHandler}
              color="primary"
              inputProps={{ "aria-label": "checkbox" }}
            />
          </Grid>
        </Grid>
      </Paper>

      <TaskDetails
        isOpened={isDetailOpened}
        closeHandler={closeDetailHandler}
        task={selectedTask}
        removeTask={props.removeTask}
      />
    </div>
  );
}
