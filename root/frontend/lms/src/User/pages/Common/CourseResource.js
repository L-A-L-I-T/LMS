import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { getUser } from "../../../Auth/helper/index";
import { StudentCourseResources } from "../../helper/Student";
import { TeacherCourseRescources } from "../../helper/Teacher";
import NotFound from "./NotFound";
import Course from "../Common/Course";
import UnitCard from "../../../Core/ui/Components/UnitCard";
import { Grid } from "@material-ui/core";

export default function CourseResource() {
	const { user } = getUser();
	const { group_id, course_id, group_course_id } = useParams();
	const [units, setUnits] = useState();
	const onLoad = async () => {
		if (user.role === 0) {
			await StudentCourseResources(group_id, course_id)
				.then((data) => {
					setUnits(data);
				})
				.catch(console.log("Settings Units Failed"));
		} else if (user.role === 1) {
			await TeacherCourseRescources(group_course_id)
				.then((data) => {
					setUnits(data);
				})
				.catch(console.log("Settings Units Failed"));
		}
	};
	useEffect(() => {
		onLoad();
	}, []);
	return (
		<Course>
			<h3>Resources</h3>
			{units !== undefined && (
				<Grid container spacing={5} justifyContent="center" alignItems="center">
					{units.map((course, index) => {
						return (
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<UnitCard
									title={course.name}
									description={course.desc}
									dueDate={course.due_date}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
			{(units === undefined || units.length === 0) && (
				<NotFound title="No Resources" />
			)}
		</Course>
	);
}
