import React, { Fragment } from "react";
import AddButton from "../../components/tasks/AddTask";
import Grid from "@material-ui/core/Grid";
import Task from "../../components/tasks/Task";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2.5),
  },
}));

function TodoPage() {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        justifyContent="space-between"
        className={classes.container}
      >
        <Grid item>
          <Typography variant="h5">In progress</Typography>
        </Grid>
        <Grid item>
          <AddButton text="new task" />
        </Grid>
      </Grid>
      <Task title="This is some text 1" label="Personal" date="Due 28 Nov" />
      <Task title="This is some text 2" label="Work" date="Due 12 Dec" />
    </Fragment>
  );
}

export default TodoPage;
