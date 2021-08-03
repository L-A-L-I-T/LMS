import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../Auth/helper/index";
import Base from "../../../Core/ui/Base";
import { getGroupDetails } from "../../helper/Student";
import { getGroupCourseDetails } from "../../helper/Teacher";
import ClassroomNavigator from "../../../Core/ui/Components/ClassroomNavigation";
import { useParams, useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, ButtonGroup, Grid } from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ListAltIcon from "@material-ui/icons/ListAlt";
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: "100%",
	},
	TabArea: {
		minHeight: "500px",
	},
	NavigationContainer: {
		marginBottom: "2rem",
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(5),
		right: theme.spacing(4),
	},
}));

export default function Course(props) {
	const { user } = getUser();
	const classes = useStyles();
	const location = useLocation();
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const { group_id, course_id, group_course_id, assignment_id } = useParams();
	const [navigationDetails, setNavigationDetails] = useState({
		groupName: "",
		courseName: "",
		assignmentName: "",
	});
	const [activeTab, setActiveTab] = useState(0);
	const handleNavigationDetails = () => {
		if (location.state) {
			setNavigationDetails({
				groupName: location.state.groupName,
				courseName: location.state.courseName,
				assignmentName: location.state.assignmentName,
			});
		} else {
			if (user.role === 0) {
				getGroupDetails(group_id)
					.then((data) => {
						setNavigationDetails(data.group_name);
					})
					.catch((error) => {
						console.log(Error);
					});
			} else if (user.role === 1) {
				getGroupCourseDetails(group_course_id).then((data) => {
					setNavigationDetails({
						...navigationDetails,
						courseName: data.course_id,
					});
					setNavigationDetails({
						...navigationDetails,
						groupName: data.group_id,
					});
				});
			}
		}
	};
	const handleTabChange = () => {
		if (
			(window.location.pathname ===
				`/student/classroom/group/${group_id}/course/${course_id}/assignment` ||
				window.location.pathname ===
					`/teacher/classroom/course/${group_course_id}/assignment`) &&
			activeTab !== 0
		) {
			setActiveTab(0);
		} else if (
			(window.location.pathname ===
				`/student/classroom/group/${group_id}/course/${course_id}/quiz` ||
				window.location.pathname ===
					`/teacher/classroom/course/${group_course_id}/quiz`) &&
			activeTab !== 1
		) {
			setActiveTab(1);
		} else if (
			(window.location.pathname ===
				`/student/classroom/group/${group_id}/course/${course_id}/resource` ||
				window.location.pathname ===
					`/teacher/classroom/course/${group_course_id}/resource`) &&
			activeTab !== 2
		) {
			setActiveTab(2);
		}
	};

	useEffect(() => {
		handleNavigationDetails();
		console.log("GRoup Name: ", navigationDetails.groupName);
		handleTabChange();
	}, []);

	return (
		<Base>
			<Grid container spacing={3} className={classes.NavigationContainer}>
				<Grid item lg={8} md={7}>
					<div className={classes.Greeting}>
						<Typography variant="h4">{navigationDetails.courseName}</Typography>
					</div>
					<div>
						<ClassroomNavigator
							group_name={navigationDetails.groupName}
							course_name={navigationDetails.courseName}
							group_id={group_id}
							course_id={course_id}
							group_course_id={group_course_id}
							assignment_id={assignment_id}
							assignmentName={navigationDetails.assignmentName}
						/>
					</div>
				</Grid>
				<Grid item lg={4} md={5}>
					<Grid item container direction="column" alignItems="flex-end">
						<Grid item lg={12}>
							<ButtonGroup
								variant="text"
								color="primary"
								aria-label="text primary button group"
							>
								<Button
									component={Link}
									to={
										user.role === 0
											? {
													pathname: `/student/classroom/group/${group_id}/course/${course_id}/resource`,
													state: {
														groupName: navigationDetails.groupName,
														courseName: navigationDetails.courseName,
													},
											  }
											: {
													pathname: `/teacher/classroom/course/${group_course_id}/resource`,
													state: {
														groupName: navigationDetails.groupName,
														courseName: navigationDetails.courseName,
													},
											  }
									}
									onClick={() => {
										setActiveTab(2);
									}}
									color={activeTab === 2 ? "primary" : "inherit"}
								>
									Resources
								</Button>
								<Button
									component={Link}
									to={
										user.role === 0
											? {
													pathname: `/student/classroom/group/${group_id}/course/${course_id}/assignment`,
													state: {
														groupName: navigationDetails.groupName,
														courseName: navigationDetails.courseName,
													},
											  }
											: {
													pathname: `/teacher/classroom/course/${group_course_id}/assignment`,
													state: {
														groupName: navigationDetails.groupName,
														courseName: navigationDetails.courseName,
													},
											  }
									}
									onClick={() => {
										setActiveTab(0);
									}}
									color={activeTab === 0 ? "primary" : "inherit"}
								>
									Assignments
								</Button>
								<Button
									component={Link}
									to={
										user.role === 0
											? {
													pathname: `/student/classroom/group/${group_id}/course/${course_id}/quiz`,
													state: {
														groupName: navigationDetails.groupName,
														courseName: navigationDetails.courseName,
													},
											  }
											: {
													pathname: `/teacher/classroom/course/${group_course_id}/quiz`,
													state: {
														groupName: navigationDetails.groupName,
														courseName: navigationDetails.courseName,
													},
											  }
									}
									onClick={() => {
										setActiveTab(1);
									}}
									color={activeTab === 1 ? "primary" : "inherit"}
								>
									Quizzes
								</Button>
							</ButtonGroup>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{props.children}
			{user.role === 1 && (
				<div className={classes.fab}>
					<SpeedDial
						ariaLabel="SpeedDial example"
						className={classes.speedDial}
						icon={<SpeedDialIcon />}
						onClose={handleClose}
						onOpen={handleOpen}
						open={open}
						direction="up"
					>
						<SpeedDialAction
							key="assignment"
							tooltipTitle="Add Resource"
							onClick={handleClose}
							icon={<LibraryBooksIcon />}
						/>
						<SpeedDialAction
							key="assignment"
							tooltipTitle="Add Assignment"
							onClick={handleClose}
							icon={<AssignmentIcon />}
							component={Link}
							to={{
								pathname: `/teacher/classroom/course/${group_course_id}/create_assignment`,
								state: {
									groupName: navigationDetails.groupName,
									courseName: navigationDetails.courseName,
								},
							}}
						>
							Assignment
						</SpeedDialAction>
						<SpeedDialAction
							key="assignment"
							tooltipTitle="Add Quiz"
							onClick={handleClose}
							icon={<ListAltIcon />}
						/>
					</SpeedDial>
				</div>
			)}
		</Base>
	);
}
