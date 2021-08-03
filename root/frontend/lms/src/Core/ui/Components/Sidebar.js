import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItems from "./SidebarItems";
import { isAutheticated } from "../../../Auth/helper/index";
//importing components from material ui--------------------------->
import {
	SwipeableDrawer,
	Hidden,
	List,
	CssBaseline,
	Avatar,
	Typography,
	Divider,
} from "@material-ui/core";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	avatarDiv: {
		display: "flex",
		justifyContent: "center",
		"& > *": {
			margin: theme.spacing(3),
		},
	},
	avatar: {
		width: theme.spacing(8),
		height: theme.spacing(8),
		backgroundColor: theme.palette.primary.main,
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	name: {
		display: "flex",
		justifyContent: "center",
		marginTop: "-10px",
		marginBottom: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function Sidebar(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const { user } = isAutheticated();

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<div className={classes.root}>
			<CssBaseline />
			<nav className={classes.drawer}>
				<Hidden smUp implementation="css">
					<SwipeableDrawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={props.isOpen}
						onOpen={props.handleDrawerToggle}
						onClose={props.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<div>
							<div className={classes.toolbar} />
							<div className={classes.avatarDiv}>
								<Avatar className={classes.avatar}>{user.f_name[0]}</Avatar>
							</div>
							<div className={classes.name}>
								<Typography variant="h6">
									{user.f_name} {user.l_name}
								</Typography>
							</div>
							<Divider />
							<List onClick={() => props.closeDrawer}>
								<ListItems />
							</List>
						</div>
					</SwipeableDrawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<SwipeableDrawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						<div>
							<div className={classes.toolbar} />
							<div className={classes.avatarDiv}>
								<Avatar className={classes.avatar}>{user.f_name[0]}</Avatar>
							</div>
							<div className={classes.name}>
								<Typography variant="h6">
									{user.f_name} {user.l_name}
								</Typography>
							</div>
							<Divider />
							<List>
								<ListItems />
							</List>
						</div>
					</SwipeableDrawer>
				</Hidden>
			</nav>
		</div>
	);
}
