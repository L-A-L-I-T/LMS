import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import FileCopySharpIcon from "@material-ui/icons/FileCopySharp";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  detail: {
    fontSize: 14,
    color: "textsecondary",
  },
  resource: {
    padding: "8px",
  },
});
const ResourceCard = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Heading for Resource</Typography>
        <Typography classname={classes.detail} color="textSecondary">
          Details of Resource : Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Quibusdam facere necessitatibus excepturi cum vel
          corporis voluptatum ratione, ut iste dolorem similique laudantium
          error magni asperiores laboriosam maiores distinctio quo quos.
        </Typography>
        <Divider />
        <div className={classes.resource}>
          <Grid container>
            <Grid item xs={2} sm={2} lg={1} style={{ paddingLeft: "15px" }}>
              <FileCopySharpIcon />
            </Grid>
            <Grid item xs={8} sm={8} lg={10}>
              <Typography>Resorce Info</Typography>
            </Grid>
            <Grid item xs={2} sm={2} sm={1}>
              <CardActions>
                <Button style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  <ArrowDownwardIcon />
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
