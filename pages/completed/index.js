import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TaskRow from "../../components/tasks/TaskRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import Task from "../../models/Task";
import Category from "../../models/Category";

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
  let condition = { completed: true };

  if (context.query.category) {
    condition = { ...condition, category: context.query.category };
  }

  const tasks = JSON.parse(
    JSON.stringify(await Task.find(condition).populate("category"))
  );

  const categories = JSON.parse(JSON.stringify(await Category.find({})));

  return { props: { session, tasks, categories } };
}
