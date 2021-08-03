import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import { StudentRoute, TeacherRoute } from "./Auth/helper/PrivateRoutes";
import { CustomThemeContext } from "./Core/CustomThemeContext";
import MessagePopup from "./Core/ui/Components/MessagePopup";
//?importing Common Pages ------------------------------------------->
import Login from "./User/pages/Common/Login";
import Dashboard from "./User/pages/Common/Dashboard";
import Profile from "./User/pages/Common/Profile";
import GroupCourses from "./User/pages/Common/GroupCourses";
import CourseAssignment from "./User/pages/Common/CourseAssignment";

import CourseQuiz from "./User/pages/Common/CourseQuiz";
import CourseResource from "./User/pages/Common/CourseResource";
import Forums from "./User/pages/Common/Forums";
import Resources from "./User/pages/Common/Resources";
import Calendar from "./User/pages/Common/Calendar";
import Events from "./User/pages/Common/Events";
import Attendance from "./User/pages/Common/Attendance";
import Settings from "./User/pages/Common/Settings";
import PageNotFound from "./User/pages/Common/PageNotFound";

//?importing Student Pages----------------------------------------------->
import StudentClassroom from "./User/pages/Student/StudentClassroom";
import AssignmentPage from "./User/pages/Student/AssignmentPage";
//?importing Teacher Pages ---------------------------------------------->
import TeacherClassroom from "./User/pages/Teacher/TeacherClassroom";
import TeacherCreateAssignment from "./User/pages/Teacher/TeacherCreateAssignment";
import TeacherViewSubmissions from "./User/pages/Teacher/TeacherViewSubmissions";

const Routes = () => {
	const [popup, setPopup] = useState({
		open: false,
		severity: "",
		message: "",
	});
	return (
		<CustomThemeContext>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route path="/" exact strict component={Login}></Route>
					{/* Student Specific Routes--------------------------------------------------------> */}
					<StudentRoute
						path="/student/dashboard"
						exact
						strict
						component={Dashboard}
					></StudentRoute>
					<StudentRoute
						path="/student/profile"
						exact
						strict
						component={Profile}
					></StudentRoute>
					<StudentRoute
						path="/student/classroom"
						exact
						strict
						component={StudentClassroom}
					></StudentRoute>
					<StudentRoute
						path="/student/classroom/group/:group_id/course"
						exact
						strict
						component={GroupCourses}
					></StudentRoute>
					<StudentRoute
						path="/student/classroom/group/:group_id/course/:course_id/assignment"
						exact
						strict
						component={CourseAssignment}
					></StudentRoute>
					<StudentRoute
						path="/student/classroom/group/:group_id/course/:course_id/assignment/:assignment_id"
						exact
						strict
						component={AssignmentPage}
					></StudentRoute>

					<StudentRoute
						path="/student/classroom/group/:group_id/course/:course_id/quiz"
						exact
						strict
						component={CourseQuiz}
					></StudentRoute>
					<StudentRoute
						path="/student/classroom/group/:group_id/course/:course_id/resource"
						exact
						strict
						component={CourseResource}
					></StudentRoute>
					<StudentRoute
						path="/student/forums"
						exact
						strict
						component={Forums}
					></StudentRoute>
					<StudentRoute
						path="/student/resources"
						exact
						strict
						component={Resources}
					></StudentRoute>
					<StudentRoute
						path="/student/calendar"
						exact
						strict
						component={Calendar}
					></StudentRoute>
					<StudentRoute
						path="/student/events"
						exact
						strict
						component={Events}
					></StudentRoute>
					<StudentRoute
						path="/student/attendance"
						exact
						strict
						component={Attendance}
					></StudentRoute>
					<StudentRoute
						path="/student/settings"
						exact
						strict
						component={Settings}
					></StudentRoute>

					{/* Teacher Specific Routes--------------------------------------------------------> */}
					<TeacherRoute
						path="/teacher/dashboard"
						exact
						strict
						component={Dashboard}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/profile"
						exact
						strict
						component={Profile}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom"
						exact
						strict
						component={TeacherClassroom}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom/course/:group_course_id/resource"
						exact
						strict
						component={CourseResource}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom/course/:group_course_id/assignment"
						exact
						strict
						component={CourseAssignment}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom/course/:group_course_id/assignment/:assignment_id"
						exact
						strict
						component={AssignmentPage}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom/course/:group_course_id/assignment/:assignment_id/viewSubmissions"
						exact
						strict
						component={TeacherViewSubmissions}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom/course/:group_course_id/create_assignment"
						exact
						strict
						component={TeacherCreateAssignment}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/classroom/course/:group_course_id/quiz"
						exact
						strict
						component={CourseQuiz}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/forums"
						exact
						strict
						component={Forums}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/resources"
						exact
						strict
						component={Resources}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/calendar"
						exact
						strict
						component={Calendar}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/events"
						exact
						strict
						component={Events}
					></TeacherRoute>
					<TeacherRoute
						path="/teacher/attendance"
						exact
						strict
						component={Attendance}
					></TeacherRoute>
					<Route to="*" component={PageNotFound}></Route>
				</Switch>
			</BrowserRouter>
		</CustomThemeContext>
	);
};

export default Routes;
