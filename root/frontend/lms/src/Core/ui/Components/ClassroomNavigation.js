import React from "react";
import { getUser } from "../../../Auth/helper/index";
import { Typography, Breadcrumbs } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

export default function ClassroomNavigator(props) {
	const userRole = getUser().user.role;

	return (
		<Breadcrumbs aria-label="breadcrumb">
			{userRole === 0 && (
				<Link color="inherit" component={RouterLink} to="/student/classroom">
					Groups
				</Link>
			)}
			{userRole === 1 && (
				<Link color="inherit" component={RouterLink} to="/teacher/classroom">
					Courses
				</Link>
			)}
			{userRole === 0
				? props.group_name && (
						<Link
							color="inherit"
							component={RouterLink}
							to={`/student/classroom/group/${props.group_id}/course`}
						>
							{props.group_name}
						</Link>
				  )
				: props.group_name && <Typography>{props.group_name}</Typography>}
			{userRole === 0
				? props.course_name && (
						<Link
							component={RouterLink}
							to={{
								pathname: `/student/classroom/group/${props.group_id}/course/${props.course_id}/resource`,
								state: {
									groupName: `${props.group_name}`,
									courseName: `${props.course_name}`,
								},
							}}
							color="inherit"
						>
							{props.course_name}
						</Link>
				  )
				: props.course_name && (
						<Link
							component={RouterLink}
							color="inherit"
							to={{
								pathname: `/teacher/classroom/course/${props.group_course_id}/resource`,
								state: {
									groupName: `${props.group_name}`,
									courseName: `${props.course_name}`,
								},
							}}
						>
							{props.course_name}
						</Link>
				  )}
			{userRole === 0
				? props.assignmentName && (
						<Link
							component={RouterLink}
							to={{
								pathname: `/student/classroom/group/${props.group_id}/course/${props.course_id}/assignment/${props.assignment_id}`,
								state: {
									groupName: `${props.group_name}`,
									courseName: `${props.course_name}`,
									assignmentName: `${props.assignmentName}`,
								},
							}}
						>
							{props.assignmentName}
						</Link>
				  )
				: props.assignmentName && (
						<Link
							component={RouterLink}
							to={{
								pathname: `/teacher/classroom/course/${props.group_course_id}/assignment`,
								state: {
									groupName: `${props.group_name}`,
									courseName: `${props.course_name}`,
									assignmentName: `${props.assignmentName}`,
								},
							}}
						>
							{props.assignmentName}
						</Link>
				  )}
		</Breadcrumbs>
	);
}
