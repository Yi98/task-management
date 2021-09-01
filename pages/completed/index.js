import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TaskRow from "../../components/tasks/TaskRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2.5),
  },
  title: { paddingLeft: theme.spacing(1.5) },
  category: { paddingLeft: theme.spacing(1) },
  dueDate: { paddingLeft: theme.spacing(0.5) },
}));

export default function CompletedPage(props) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

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
      {tasks.length > 0 && (
        <Grid container>
          <Grid item xs={6} className={classes.title}>
            <Typography variant="subtitle2">Title</Typography>
          </Grid>
          <Grid item xs={3} className={classes.category}>
            <Typography variant="subtitle2">Category</Typography>
          </Grid>
          <Grid item xs={2} className={classes.dueDate}>
            <Typography variant="subtitle2">Due Date</Typography>
          </Grid>
          <Grid item xs={1} className={classes.completed}>
            <Typography variant="subtitle2">Archive</Typography>
          </Grid>
        </Grid>
      )}
      {tasks.map((task) => (
        <TaskRow
          key={task._id}
          title={task.title}
          category={task.category}
          dueDate={task.dueDate}
        />
      ))}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await dbConnect();
  
  const user = JSON.parse(
    JSON.stringify(
      await User.findById(session.user.id).populate({
        path: "tasks",
        populate: "category",
      })
    )
  );

  const tasks = user.tasks.filter((task) => {
    if (!context.query.category) {
      return task.completed == true;
    }

    return (
      task.completed == true && task.category._id == context.query.category
    );
  });

  return { props: { session, tasks: tasks } };
}
