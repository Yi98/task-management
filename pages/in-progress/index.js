import React, { Fragment, useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  function addTaskHandler(newTask) {
    setTasks((prevState) => [...prevState, newTask]);
  }

  function removeTasksHandler(completedTask) {
    setTasks((prevState) => {
      return prevState.filter((task) => task._id !== completedTask._id);
    });
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
            addTask={addTaskHandler}
            categories={props.categories}
          />
        </Grid>
      </Grid>
      {tasks.map((task) => (
        <TaskRow
          key={task._id}
          taskId={task._id}
          title={task.title}
          category={task.category}
          dueDate={task.dueDate}
          removeTask={removeTasksHandler}
        />
      ))}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const session = await isAuthenticated(context.req);
  let condition = { completed: false };

  if (context.query.category) {
    condition = { ...condition, category: context.query.category };
  }

  const tasks = JSON.parse(
    JSON.stringify(await Task.find(condition).populate("category"))
  );
  const categories = JSON.parse(JSON.stringify(await Category.find({})));

  return {
    props: {
      session,
      tasks,
      categories,
    },
  };
}
