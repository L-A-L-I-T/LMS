import React, { useState, useEffect } from "react";
import ClassroomNavigator from "../../../Core/ui/Components/ClassroomNavigation";

import { TeacherClassroomInfo } from "../../helper/Teacher";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Base from "../../../Core/ui/Base";
import CourseCard from "../../../Core/ui/Components/CourseCard";
const useStyles = makeStyles((theme) => ({
	Greeting: {
		marginBottom: "20px",
	},
	navigation: {
		marginBottom: "40px",
	},
}));

export default function TeacherClassroom() {
	const classes = useStyles();
	const [courses, setCourses] = useState([]);
	const onLoad = async () => {
		await TeacherClassroomInfo()
			.then((data) => {
				console.log("Setting Courses ", data);
				setCourses(data);
			})
			.catch(console.log("signin request failed"));
	};

	useEffect(() => {
		onLoad();
	}, []);

	const noCourses = () => {
		return <Typography>No Courses</Typography>;
	};

	return (
		<Base>
			<div className={classes.Greeting}>
				<Typography variant="h4">Classroom</Typography>
			</div>
			<div className={classes.navigation}>
				<ClassroomNavigator />
			</div>
			{courses !== undefined && (
				<Grid container spacing={5} justifyContent="center" alignItems="center">
					{courses.map((course, index) => {
						return (
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<CourseCard
									group_course_id={course.group_course_id}
									group_name={course.group_id}
									course_name={course.course_id}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
			{courses === undefined && noCourses()}
		</Base>
	);
}
