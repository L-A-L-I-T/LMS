import React from "react";
import { getUserRole, getUser } from "../../../Auth/helper/index";
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
		minHeight: "50px",
	},
	details: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function CourseCard(props) {
	const classes = useStyles();
	const { user } = getUser();
	const userRole = getUserRole();
	return (
		<Card className={classes.cardContainer}>
			<CardActionArea
				className={classes.cardContainer}
				component={Link}
				to={
					user.role === 0
						? {
								pathname: `/student/classroom/group/${props.group_id}/course/${props.course_id}/resource`,
								state: {
									groupName: props.group_name,
									courseName: props.course_name,
								},
						  }
						: {
								pathname: `/teacher/classroom/course/${props.group_course_id}/resource`,
								state: {
									GroupCourseId: props.group_course_id,
									groupName: props.group_name,
									courseName: props.course_name,
								},
						  }
				}
			>
				<CardContent>
					<Typography variant="h5" component="h2">
						{props.course_name}
					</Typography>
					<Typography
						className={classes.details}
						color="textSecondary"
						gutterBottom
					>
						{props.group_name}
						{props.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
