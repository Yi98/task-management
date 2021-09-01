import React, { Fragment, useState, useEffect, useContext } from "react";
import AddTaskButton from "../../components/tasks/AddTaskBtn";
import Grid from "@material-ui/core/Grid";
import TaskRow from "../../components/tasks/TaskRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import emptyPic from "../../public/empty.svg";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2.5),
  },
  title: { paddingLeft: theme.spacing(1.5) },
  category: { paddingLeft: theme.spacing(1) },
  dueDate: { paddingLeft: theme.spacing(0.5) },
  completed: { paddingLeft: theme.spacing(7.5) },
  illustrationIContainer: {
    marginTop: "13%",
    marginRight: "7%",
    textAlign: "center",
  },
  empty: {
    paddingLeft: "2%",
  },
}));

export default function TodoPage(props) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  function addTaskHandler(addedTask) {
    setTasks((prevState) => [...prevState, addedTask]);
  }

  function removeTasksHandler(removedTask) {
    setTasks((prevState) => {
      return prevState.filter((task) => task._id !== removedTask._id);
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
          <AddTaskButton text="new task" addTask={addTaskHandler} />
        </Grid>
      </Grid>

      {tasks.length == 0 && (
        <div className={classes.illustrationIContainer}>
          <Image
            src={emptyPic}
            alt="Illustration"
            width={250}
            height={250}
            className={classes.illustration}
          />
          <Typography variant="h6" className={classes.empty}>
            No tasks in progress
          </Typography>
        </div>
      )}

      {tasks.length > 0 && (
        <Grid container>
          <Grid item xs={6} className={classes.title}>
            <Typography variant="subtitle2">Title</Typography>
          </Grid>
          <Grid item xs={3} className={classes.category}>
            <Typography variant="subtitle2">Category</Typography>
          </Grid>
          <Grid item xs={1} className={classes.dueDate}>
            <Typography variant="subtitle2">Due Date</Typography>
          </Grid>
          <Grid item xs={2} className={classes.completed}>
            <Typography variant="subtitle2">Mark as completed</Typography>
          </Grid>
        </Grid>
      )}
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
      return task.completed == false;
    }

    return (
      task.completed == false && task.category._id == context.query.category
    );
  });

  return {
    props: {
      session,
      tasks,
    },
  };
}
