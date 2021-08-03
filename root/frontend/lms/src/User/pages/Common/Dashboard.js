import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Base from "../../../Core/ui/Base";
import { isAutheticated } from "../../../Auth/helper/index";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
	},
	Greeting: {
		marginBottom: "20px",
	},
	eventHeading: {
		textAlign: "center",
	},
}));

export default function Dashboard() {
	const {user} = isAutheticated();
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const [greet, setGreet] = useState();

	const getTime = () => {
		var myDate = new Date();
		var hrs = myDate.getHours();
		if (hrs < 12) {
			setGreet("Morning");
		} else if (hrs >= 12 && hrs <= 17) {
			setGreet("Afternoon");
		} else if (hrs >= 17 && hrs <= 24) {
			setGreet("Evening");
		}
	};

	useEffect(() => {
		getTime();
	}, []);

	return (
		<Base>
			<div className={classes.Greeting}>
				<Typography variant="h4">
					Good {greet}, {user.f_name}
				</Typography>
			</div>
			<Grid
				container
				direction={matches ? "column-reverse" : "row"}
				justify="center"
				spacing={3}
			>
				<Grid item lg={6} md={12} sm={12} xs={12}>
					<Paper>
						<div className={classes.eventHeading}>
							<Typography variant="h5">Events</Typography>
						</div>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="center"
							spacing={3}
						>
							<Grid item>
								<div>Event1</div>
							</Grid>
							<Grid item>
								<div>Event2</div>
							</Grid>
							<Grid item>
								<div>Event3</div>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item lg={6} md={12} sm={12} xs={12}>
					<Grid container direction={matches ? "row" : "column"} spacing={3}>
						<Grid item sm={12} xs={12} lg={12} md={6}>
							<Paper className={classes.paper}>
								<Typography variant="h6">Assignments</Typography>
							</Paper>
						</Grid>
						<Grid item sm={12} xs={12} lg={12} md={6}>
							<Paper className={classes.paper}>
								<Typography variant="h6">Quizzes</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Base>
	);
}
