import React from "react";
import { useThemeUpdate, useThemeContext } from "../../CustomThemeContext";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	FormControlLabel,
	Switch,
} from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { signout } from "../../../Auth/helper/index";
// icons --->
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SchoolIcon from "@material-ui/icons/School";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EventIcon from "@material-ui/icons/Event";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
	activeItem: {
		color: theme.palette.primary.light,
	},
	logoutButton: {
		width: drawerWidth - 20,
	},
	darkModeSwitch: {
		marginTop: "10px",
		marginBottom: "10px",
	},
}));

function ListItems() {
	const classes = useStyles();
	const darkMode = useThemeContext();
	const toggleTheme = useThemeUpdate();
	const handleSignOut = () => {
		signout();
	};

	return (
		<div>
			<ListItem
				button
				key="Home"
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/dashboard"
				}
			>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItem>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/profile"
				}
			>
				<ListItemIcon>
					<AccountBoxIcon />
				</ListItemIcon>
				<ListItemText primary="Profile" />
			</ListItem>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/classroom"
				}
			>
				<ListItemIcon>
					<SchoolIcon />
				</ListItemIcon>
				<ListItemText primary="Classroom" />
			</ListItem>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/forums"
				}
			>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Forums" />
			</ListItem>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/resources"
				}
			>
				<ListItemIcon>
					<LibraryBooksIcon />
				</ListItemIcon>
				<ListItemText primary="Resources" />
			</ListItem>
			<Divider />
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/calendar"
				}
			>
				<ListItemIcon>
					<CalendarTodayIcon />
				</ListItemIcon>
				<ListItemText primary="Calendar" />
			</ListItem>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/events"
				}
			>
				<ListItemIcon>
					<EventIcon />
				</ListItemIcon>
				<ListItemText primary="Events" />
			</ListItem>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.activeItem}
				to={
					"/" +
					(JSON.parse(localStorage.getItem("jwt")).user.role === 0
						? "student"
						: "teacher") +
					"/attendance"
				}
			>
				<ListItemIcon>
					<EventAvailableIcon />
				</ListItemIcon>
				<ListItemText primary="Attendance" />
			</ListItem>
			<Divider />
			<div className={classes.darkModeSwitch}>
				<FormControlLabel
					value="start"
					control={<Switch color="primary" />}
					label="Dark Mode"
					labelPlacement="start"
					checked={darkMode}
					onChange={toggleTheme}
				/>
			</div>

			<Divider />
			<ListItem button component={Link} to="/" onClick={handleSignOut} >
				<ListItemIcon>
					<ExitToAppIcon />
				</ListItemIcon>
				<ListItemText primary="LogOut" />
			</ListItem>
		</div>
	);
}

export default ListItems;
