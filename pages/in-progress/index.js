import React, { Fragment, useState, useEffect } from "react";
import AddTaskButton from "../../components/tasks/AddTaskBtn";
import Grid from "@material-ui/core/Grid";
import TaskRow from "../../components/tasks/TaskRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from "../../lib/auth";
import dbConnect from "../../lib/dbConnect";
import Task from "../../models/Task";
import Category from "../../models/Category";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2.5),
  },
}));

export default function TodoPage(props) {
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  function updateTasksHandler(newTask) {
    setTasks((prevState) => [...prevState, newTask]);
  }
  
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
          <AddTaskButton
            text="new task"
            updateTasks={updateTasksHandler}
            categories={categories}
          />
        </Grid>
      </Grid>
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
  await dbConnect();
  const session = await isAuthenticated(context.req);
  const tasks = JSON.parse(
    JSON.stringify(await Task.find({ completed: false }))
  );
  const categories = JSON.parse(JSON.stringify(await Category.find({})));

  return { props: { session, tasks, categories } };
}
