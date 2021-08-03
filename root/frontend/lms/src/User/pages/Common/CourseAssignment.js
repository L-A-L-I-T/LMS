import React, { useState, useEffect } from "react";
import { getUser } from "../../../Auth/helper/index";
import { useParams, useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { StudentCourseAssignments } from "../../helper/Student";
import { TeacherCourseAssignments } from "../../helper/Teacher";
import Course from "../Common/Course";
import AssignmentCard from "../../../Core/ui/Components/AssignmentCard";
import NotFound from "./NotFound";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	noAssignments: {},
}));
export default function CourseAssignment() {
	const classes = useStyles();
	const location = useLocation();
	// const [open, setOpen] = useState(false);

	const { user } = getUser();
	const { group_id, course_id, group_course_id } = useParams();
	const [navigationDetails, setNaviagtionDetails] = useState({
		groupName: "",
		courseName: "",
	});
	const [assignments, setAssignments] = useState([]);
	const onLoad = async () => {
		if (user.role === 0) {
			await StudentCourseAssignments(group_id, course_id)
				.then((data) => {
					setAssignments(data);
				})
				.catch(console.log("Settings Assignments Failed"));
		} else if (user.role === 1) {
			await TeacherCourseAssignments(group_course_id)
				.then((data) => {
					setAssignments(data);
				})
				.catch(console.log("Settings Assignments Failed"));
		}
	};
	const setNavigationDetails = () => {
		if (location.state) {
			setNaviagtionDetails({
				groupName: location.state.groupName,
				courseName: location.state.courseName,
			});
		}
		// } else {
		// 	getGroupDetails(group_id).then((data) => {
		// 		setNaviagtionDetails(data.group_name);
		// 	});
		// }
	};
	useEffect(() => {
		setNavigationDetails();
		onLoad();
	}, []);

	return (
		<Course>
			<h3>Assignments</h3>
			{assignments !== undefined && (
				<Grid container spacing={5} justifyContent="center" alignItems="center">
					{assignments.map((course, index) => {
						return (
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<AssignmentCard
									title={course.title}
									description={course.description}
									dueDate={course.due_date}
									course_id={course_id}
									courseName={navigationDetails.courseName}
									groupName={navigationDetails.groupName}
									assignmentName={course.title}
									group_id={group_id}
									group_course_id={group_course_id}
									assignment_id={course.assignment_id}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
			{(assignments === undefined || assignments.length === 0) && (
				<NotFound title="No Assignments" />
			)}
		</Course>
	);
}
