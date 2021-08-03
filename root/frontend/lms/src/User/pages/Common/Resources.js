import { Grid, Typography } from "@material-ui/core";
import React from "react";
import ResourceCard from "../../../Core/ui/Components/ResourceCard";

import Base from "../../../Core/ui/Base";
// import ResourceCard from "../../Core/ui/Components/ResourceCard";

export default function Resources() {
  return (
    <Base>
      <Typography variant="h4" color="inherit">
        Resources
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ResourceCard />
        </Grid>
        <Grid item xs={12}>
          <ResourceCard />
        </Grid>
        <Grid item xs={12}>
          <ResourceCard />
        </Grid>
        <Grid item xs={12}>
          <ResourceCard />
        </Grid>
        <Grid item xs={12}>
          <ResourceCard />
        </Grid>
      </Grid>
    </Base>
  );
}
