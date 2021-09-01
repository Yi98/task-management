import { Grid, Typography } from "@material-ui/core";
import { Fragment } from "react";
import InfoCard from "../../components/dashboards/InfoCard";
import { getSession } from "next-auth/client";

export default function Dashboard(props) {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={4}>
          <InfoCard title="Today tasks" />
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

  return { props: { session } };
}
