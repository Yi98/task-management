import React, { Fragment } from "react";
import AddButton from "../../components/tasks/AddTaskBtn";
import Grid from "@material-ui/core/Grid";
import Task from "../../components/tasks/Task";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2.5),
  },
}));

export default function CompletedPage() {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        justifyContent="space-between"
        className={classes.container}
      >
        <Box mb={0.5}>
          <Grid item>
            <Typography variant="h5">Completed</Typography>
          </Grid>
        </Box>
      </Grid>
      <Task title="This is some text 1" label="Personal" date="Due 28 Nov" />
      <Task title="This is some text 2" label="Work" date="Due 12 Dec" />
    </Fragment>
  );
}
