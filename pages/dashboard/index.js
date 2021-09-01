import { Grid, Typography } from "@material-ui/core";
import { Fragment } from "react";
import InfoCard from "../../components/dashboards/InfoCard";
import { getSession } from "next-auth/client";
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import moment from "moment";

export default function Dashboard(props) {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={4}>
          <InfoCard title="Due today" taskCount={props.dueCount.today} />
        </Grid>
        <Grid item xs={4}>
          <InfoCard title="Due tomorrow" taskCount={props.dueCount.tomorrow} />
        </Grid>
        <Grid item xs={4}>
          <InfoCard title="Due this week" taskCount={props.dueCount.thisWeek} />
        </Grid>
      </Grid>
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

  let user = await User.findById(session.user.id).populate({
    path: "tasks",
    populate: "category",
  });

  user = JSON.parse(JSON.stringify(user));

  const dueCount = { today: 0, tomorrow: 0, thisWeek: 0 };
  let tasks = user.tasks.filter((task) => task.completed == false);

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const isDueToday = moment(task.dueDate).isSame(new Date(), "day");
    if (isDueToday) {
      dueCount.today += 1;
      continue;
    }

    const isDueTomorrow = moment(task.dueDate).isSame(
      moment(new Date()).add(1, "days"),
      "day"
    );
    if (isDueTomorrow) {
      dueCount.tomorrow += 1;
      continue;
    }

    const isDueThisWeek = moment(task.dueDate).isSame(new Date(), "week");
    if (isDueThisWeek) {
      dueCount.thisWeek += 1;
      continue;
    }
  }

  return { props: { session, dueCount } };
}
