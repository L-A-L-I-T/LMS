import React, { useState } from "react";
import "date-fns";
import { format } from "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import {
	Dialog,
	Divider,
	AppBar,
	Toolbar,
	Slider,
	IconButton,
	Typography,
	Button,
	Grid,
	Tooltip,
	TextField,
	Slide,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";

import AddIcon from "@material-ui/icons/Add";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";

import { TeacherCreateAssignment } from "../../../User/helper/Teacher";
import { useParams } from "react-router";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAssignment(props) {
	const useStyles = makeStyles((theme) => ({
		maxMarksfield: {
			width: "50px",
			marginLeft: "15px",
		},
		root: {
			width: 300,
		},
		formContainer: {
			margin: "auto",
			marginTop: "2%",
			width: "100%",
		},
		input: {
			display: "none",
		},
		toolbar: {
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			// padding: theme.spacing(2),
		},
		appBar: {
			position: "relative",
			background: `linear-gradient(to right,${theme.palette.primary.main} , ${theme.palette.primary.light})`,
		},
		createButton: {
			marginLeft: "auto",
		},
		attachIcon: {
			marginLeft: "auto",
		},
	}));
	const classes = useStyles();
	const { group_course_id } = useParams();
	const [files, setFiles] = useState();
	const [assignmentValues, setAssignmentValues] = useState({
		title: "",
		name: "",
		description: "",
		dueDate: format(new Date(), "yyyy-LL-dd HH:mm:ss"),
		postDate: format(new Date(), "yyyy-LL-dd HH:mm:ss"),
		maxMarks: 20,
		minMarks: 0,
		redirect : false
	});

	const { title, name, description, dueDate, maxMarks, minMarks, postDate } =
		assignmentValues;
	const handleCreate = () => {
		props.handleClose();
		TeacherCreateAssignment(group_course_id, {
			title,
			name,
			description,
			postDate,
			dueDate,
			maxMarks,
			minMarks,
			files,
		})
			.then((res) => {
				setAssignmentValues({
					title: "",
					name: "",
					description: "",
					dueDate: format(new Date(), "yyyy-LL-dd HH:mm:ss"),
					maxMarks: 20,
				});
				console.log(res);
				// window.location.reload(false);
				// <Redirect to={`teacher/classroom/course/${params.course_id}/assignment`}/>
			})
			.catch(console.log("Error while creating assignment "));
	};

	function valuetext(value) {
		return `${value}`;
	}

	const marks = [
		{
			value: 0,
			label: "0",
		},
		{
			value: 100,
			label: "100",
		},
	];

	const handleMarksChange = (event, newValue) => {
		setAssignmentValues({ ...assignmentValues, maxMarks: newValue });
	};
	const handleDateTimeChange = (date) => {
		setAssignmentValues({
			...assignmentValues,
			dueDate: format(date, "yyyy-LL-dd HH:mm:ss"),
		});
	};
	const handleValueChange = (name) => (event) => {
		setAssignmentValues({ ...assignmentValues, [name]: event.target.value });
	};
	const handleFileChange = (event) => {
		console.log(event.target.files[0]);
		setFiles(event.target.files[0]);
	};

	return (
		<div>
			<Dialog
				fullScreen
				open={props.open}
				onClose={props.handleClose}
				TransitionComponent={Transition}
			>
				<main className={classes.content}>
					<div className={classes.toolbar} />

					<AppBar w className={classes.appBar}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={props.handleCloseClick}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
							{/* <Typography variant="h6" className={classes.title}>
								Create New Assignment
							</Typography> */}
							<div className={classes.createButton}>
								<Button
									variant="outlined"
									color="default"
									onClick={handleCreate}
								>
									Create
								</Button>
							</div>
						</Toolbar>
					</AppBar>
					<form>
						<Grid container direction="row">
							<Grid item xl={3} lg={6} sm={8} xs={12}>
								<Grid
									container
									className={classes.formContainer}
									spacing={5}
									direction="column"
								>
									<Grid item>
										<TextField
											id="standard-basic"
											label="Name"
											fullWidth
											variant="outlined"
											onChange={handleValueChange("name")}
											value={name}
										/>
									</Grid>
									<Grid item>
										<TextField
											id="standard-basic"
											label="Title"
											fullWidth
											variant="outlined"
											onChange={handleValueChange("title")}
											value={title}
										/>
									</Grid>
									<Grid item>
										<TextField
											id="standard-multiline-static"
											label="Description"
											multiline
											rows={3}
											fullWidth
											variant="outlined"
											onChange={handleValueChange("description")}
											value={description}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xl={3} lg={6} sm={8} xs={12}>
								<Grid
									container
									className={classes.formContainer}
									spacing={3}
									direction="column"
									style={{ marginLeft: "3%" }}
								>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Grid item>
											<Grid item lg={6}>
												<KeyboardDatePicker
													margin="normal"
													id="date-picker-dialog"
													label="Set Due Date"
													format="dd/MM/yyyy"
													value={dueDate}
													onChange={handleDateTimeChange}
													KeyboardButtonProps={{
														"aria-label": "change date",
													}}
												/>
											</Grid>
										</Grid>

										<Grid item>
											<KeyboardTimePicker
												margin="normal"
												id="time-picker"
												label="Set Due Date Time"
												value={dueDate}
												onChange={handleDateTimeChange}
												KeyboardButtonProps={{
													"aria-label": "change time",
												}}
											/>
										</Grid>
									</MuiPickersUtilsProvider>
									<Grid item>
										<div className={classes.root}>
											<Toolbar disableGutters>
												<Typography id="discrete-slider-custom" gutterBottom>
													Maximum Marks :
												</Typography>
												<TextField
													className={classes.maxMarksfield}
													value={maxMarks}
													onChange={handleValueChange("maxMarks")}
												/>
											</Toolbar>
											<Slider
												getAriaValueText={valuetext}
												aria-labelledby="discrete-slider"
												valueLabelDisplay="auto"
												step={5}
												marks={marks}
												value={maxMarks}
												onChange={handleMarksChange}
											/>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Divider />
						<Grid Container>
							<Grid item xl={3} lg={6} sm={8} xs={12}>
								<Toolbar>
									<h3>Resources : </h3>
									<input
										accept="/*"
										className={classes.input}
										id="icon-button-file"
										type="file"
										name="file"
										onChange={handleFileChange}
									/>
									<Tooltip title="Attach Resources" placement="top">
										<label
											htmlFor="icon-button-file"
											className={classes.attachIcon}
										>
											<IconButton aria-label="Attach Files" component="span">
												<AddIcon />
											</IconButton>
											{files !== undefined && files.name}
										</label>
									</Tooltip>
								</Toolbar>
							</Grid>
						</Grid>
					</form>
					<p>{JSON.stringify(assignmentValues)}</p>
				</main>
			</Dialog>
			<Snackbar
				open={props.snackOpen}
				autoHideDuration={3000}
				onClose={props.handleSnackClose}
			>
				<Alert onClose={props.handleSnackClose} severity="success">
					Assignment Created Successfully!
				</Alert>
			</Snackbar>
		</div>
	);
}
