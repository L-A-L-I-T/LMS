import React, { useState, useEffect } from "react";
import ClassroomNavigator from "../../../Core/ui/Components/ClassroomNavigation";
import { useParams, useLocation } from "react-router";
import { GroupInfo, getGroupDetails } from "../../helper/Student";

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

export default function Course() {
	const classes = useStyles();
	const location = useLocation(); 
	const { group_id } = useParams();
	const [groupName, setGroupName] = useState();
	const [courses, setCourses] = useState([]);
	const onLoad = async() => {
		await GroupInfo(group_id)
			.then((data) => {
				setCourses(data);
			})
			.catch(console.log("signin request failed"));
	};
	const setGroup = () => {
		if (location.state) {
			setGroupName(location.state.groupName);
		} else {
			getGroupDetails(group_id).then((data) => {
				setGroupName(data.group_name);
			});
		}
	};

	useEffect(() => {
		onLoad();
		setGroup();
	}, []);

	const noCourses = () => {
		return <Typography>No Courses</Typography>;
	};

	return (
		<Base>
			<div className={classes.Greeting}>
				<Typography variant="h4">{groupName}</Typography>
			</div>
			<div className={classes.navigation}>
				<ClassroomNavigator group_name={groupName} group_id={group_id} />
			</div>
			{courses && (
				<Grid container spacing={5} justifyContent="center" alignItems="center">
					{courses.map((course, index) => {
						return (
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<CourseCard
									group_id={group_id}
									group_name={groupName}
									course_id={course.course_id}
									course_name={course.course_name}
									description={course.course_desc}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
			{courses.length === 0 && noCourses()}
		</Base>
	);
}
