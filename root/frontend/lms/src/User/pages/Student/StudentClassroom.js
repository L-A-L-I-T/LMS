import React, { useState, useEffect } from "react";
import ClassroomNavigator from "../../../Core/ui/Components/ClassroomNavigation";

import { classroomInfo } from "../../helper/Student";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Base from "../../../Core/ui/Base";
import ClassroomCard from "../../../Core/ui/Components/ClassroomCard";
const useStyles = makeStyles((theme) => ({
	Greeting: {
		marginBottom: "20px",
	},
	noGroups: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	navigation: {
		marginBottom: "40px",
	},
}));

export default function Classroom() {
	const classes = useStyles();
	const [groups, setGroups] = useState([]);
	const onLoad = async () => {
		await classroomInfo()
			.then((data) => {
				console.log("Setting Courses ", data);
				setGroups(data);
			})
			.catch(console.log("signin request failed"));
	};

	useEffect(() => {
		onLoad();
		console.log("Groups : ", groups);
	}, []);

	const NoGroups = () => {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				spacing={5}
				style={{ height: "70vh" }}
			>
				<Grid item lg={12} style={{ textAlign: "center" }}>
					<Typography>No Enrollments</Typography>
				</Grid>
			</Grid>
		);
	};

	return (
		<Base>
			<div className={classes.Greeting}>
				<Typography variant="h4">Classroom</Typography>
			</div>
			<div className={classes.navigation}>
				<ClassroomNavigator />
			</div>

			{groups !== undefined && (
				<Grid container spacing={5} justifyContent="center" alignItems="center">
					{groups &&
						groups.map((group, index) => {
							return (
								<Grid item>
									<ClassroomCard
										group_id={group.group_id}
										group_name={group.group_name}
										no_of_students={group.no_of_students}
									/>
								</Grid>
							);
						})}
				</Grid>
			)}
			{groups === undefined && NoGroups()}
		</Base>
	);
}
