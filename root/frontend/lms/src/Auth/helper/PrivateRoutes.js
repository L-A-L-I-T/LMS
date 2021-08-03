import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

export const StudentRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAutheticated() && isAutheticated().user.role === 0 ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: `/teacher/dashboard`,
							state: { from: props.location },
						}}
					/>
				)
			}
		></Route>
	);
};

export const TeacherRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAutheticated() && isAutheticated().user.role === 1 ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/student/dashboard",
							state: { from: props.location },
						}}
					/>
				)
			}
		></Route>
	);
};
