import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	Typography,
	CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles({
	cardContainer: {
		minWidth: "300px",
		minHeight: "250px",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
	},
	details: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function ClassroomCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.cardContainer}>
			<CardActionArea
				className={classes.cardContainer}
				component={Link}
				to={{
					pathname: `/student/classroom/group/${props.group_id}/course`,
					state: {
						groupName: `${props.group_name}`,
					},
				}}
			>
				<CardContent>
					<Typography variant="h5" component="h2">
						{props.group_name}
					</Typography>
					<Typography
						className={classes.details}
						color="textSecondary"
						gutterBottom
					>
						Total Students : {props.no_of_students}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
