import { Box, Grid, Typography } from "@material-ui/core";
import { Fragment } from "react";
import InfoCard from "../../components/dashboards/InfoCard";

function Dashboard(props) {
  return (
    <Fragment>
      <Box mb={2}>
        <Typography variant="h4">Hello, Ng</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <InfoCard title="Today tasks" />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Dashboard;
