import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import { getUser } from "../../../Auth/helper/index";
import {
	Card,
	CardContent,
	Typography,
	CardActionArea,
	Link as MaterialLink,
	Grid,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles({
	cardContainer: {
		minHeight: "50px",
	},
	details: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	submissions: {
		marginLeft: "auto",
	},
});

export default function AssignmentCard(props) {
	const { user } = getUser();
	console.log("DATE :", props.dueDate);
	const classes = useStyles();
	return (
		<Card className={classes.cardContainer}>
			<CardActionArea
				className={classes.cardContainer}
				component={Link}
				to={
					user.role === 0
						? {
								pathname: `/student/classroom/group/${props.group_id}/course/${props.course_id}/assignment/${props.assignment_id}`,
								state: {
									groupName: `${props.groupName}`,
									courseName: `${props.courseName}`,
									assignmentName: `${props.assignmentName}`,
								},
						  }
						: {
								pathname: `/teacher/classroom/course/${props.group_course_id}/assignment/${props.assignment_id}`,
								state: {
									groupName: `${props.groupName}`,
									courseName: `${props.courseName}`,
									assignmentName: `${props.assignmentName}`,
								},
						  }
				}
			>
				<CardContent>
					<Typography variant="h5" component="h2">
						{props.title}
					</Typography>
					<Typography
						className={classes.details}
						color="textSecondary"
						gutterBottom
					>
						{props.description}
					</Typography>
					<Grid container>
						<Typography
							className={classes.details}
							color="textSecondary"
							gutterBottom
						>
							{props.dueDate &&
								format(new Date(props.dueDate), "dd-LL-yyyy HH:mm:ss")}
						</Typography>
						{user.role === 1 && (
							<MaterialLink
								className={classes.submissions}
								component={Link}
								to={{
									pathname: `/teacher/classroom/course/${props.group_course_id}/assignment/${props.assignment_id}/viewSubmissions`,
									state: {
										groupName: `${props.groupName}`,
										courseName: `${props.courseName}`,
										assignmentName: `${props.assignmentName}`,
									},
								}}
							>
								View Submissions
							</MaterialLink>
						)}
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
