import React from "react";
import { Link } from "react-router-dom";
//importing components from material ui----------------------------->
import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Typography,
	Badge,
} from "@material-ui/core";

//importing Icons from material ui---------------------------->
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";

//importing styles from material-ui/styles ----------------------->
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	appBar: {
		background: `linear-gradient(to right,${theme.palette.primary.main} , ${theme.palette.primary.light})`,
		zIndex: theme.zIndex.modal + 1,
		boxShadow: "none",
	},
	rightItems: {
		marginLeft: "auto",
	},
	appLogo: {
		color: theme.palette.common.white,
	},
	logoButton: {
		"&:hover": {
			background: "none",
		},
	},
	menuButton: {
		marginRight: "1px",
		marginLeft: "-10px", //theme.spacing(2)
		padding: "0",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	customBadge: {
		backgroundColor: "white",
	},
}));

export default function Header(props) {
	const classes = useStyles();
	return (
		<AppBar className={classes.appBar}>
			<Toolbar>
				<IconButton
					color="black"
					aria-label="open drawer"
					edge="start"
					onClick={props.handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Button
					disableRipple
					className={classes.logoButton}
					component={Link}
					to={`/student/dashboard`}
				>
					<Typography variant="h5" className={classes.appLogo}>
						MITAOE
					</Typography>
				</Button>
				<div className={classes.rightItems}>
					<IconButton component={Link} to={`/student/settings`}>
						<SettingsIcon />
					</IconButton>
					<IconButton>
						<Badge
							badgeContent={4}
							color="secondary"
							classname={classes.customBadge}
						>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
}
