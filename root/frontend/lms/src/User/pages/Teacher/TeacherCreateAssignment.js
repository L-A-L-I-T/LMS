import React, { useState } from "react";
import { useParams, useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import Base from "../../../Core/ui/Base";
import { CreateAssignment } from "../../helper/Teacher";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Divider,
	Toolbar,
	Slider,
	IconButton,
	Typography,
	Button,
	Tooltip,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";

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
	addResource: {
		marginLeft: "auto",
	},
	formControl: {
		width: "200px",
	},
}));

export default function TeacherCreateAssignment() {
	const location = useLocation();
	const classes = useStyles();
	const { group_course_id } = useParams();
	const [files, setFiles] = useState();
	const [assignmentValues, setAssignmentValues] = useState({
		title: "",
		name: "",
		description: "",
		dueDate: new Date(),
		postDate: new Date(),
		maxMarks: 20,
		minMarks: 0,
		visibility: "Submitable",
		redirect: false,
	});
	const performRedirect = () => {
		if (redirect) {
			return (
				<Redirect
					to={{
						pathname: `/teacher/classroom/course/${group_course_id}/assignment`,
						state: {
							groupName: location.state.groupName,
							courseName: location.state.courseName,
						},
					}}
				/>
			);
		}
	};
	const {
		title,
		name,
		description,
		dueDate,
		maxMarks,
		minMarks,
		visibility,
		postDate,
		redirect,
	} = assignmentValues;
	const handleCreate = () => {
		CreateAssignment(group_course_id, {
			title,
			name,
			description,
			postDate,
			dueDate,
			maxMarks,
			minMarks,
			files,
			visibility,
		})
			.then((res) => {
				setAssignmentValues({
					title: "",
					name: "",
					description: "",
					postDate: new Date(),
					dueDate: new Date(),
					maxMarks: 20,
					visibility: "Submitable",
					redirect: true,
				});
				console.log(res);
				performRedirect();
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
	const handleDueDateTimeChange = (date) => {
		setAssignmentValues({
			...assignmentValues,
			dueDate: date,
		});
	};
	const handlePostDateTimeChange = (date) => {
		setAssignmentValues({
			...assignmentValues,
			postDate: date,
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
		<Base>
			<form>
				<Grid container direction="row">
					<Grid item container>
						<Typography variant="h5">Create Assignment</Typography>
					</Grid>
					<Grid item xl={3} lg={8} md={6} sm={12} xs={12}>
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
					<Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
						<Grid
							container
							className={classes.formContainer}
							spacing={3}
							direction="column"
							style={{ marginLeft: "3%" }}
						>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid item>
									<Grid item>
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											label="Set Due Date"
											format="dd/MM/yyyy"
											value={dueDate}
											onChange={handleDueDateTimeChange}
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
										onChange={handleDueDateTimeChange}
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
				<Grid container spacing={3} direction="column">
					<Grid item lg={12}>
						<Toolbar>
							<h3>Resources : {files !== undefined && files.name}</h3>
							<div className={classes.addResource}>
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
									</label>
								</Tooltip>
							</div>
						</Toolbar>
					</Grid>
					<Grid item container>
						<Grid item lg={9} container>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid item lg={4}>
									<Toolbar>
										<FormControl
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel id="demo-simple-select-outlined-label">
												Visibility
											</InputLabel>
											<Select
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={visibility}
												onChange={handleValueChange("visibility")}
												label="Visibility"
											>
												<MenuItem value="Hidden">Hidden</MenuItem>
												<MenuItem value="Visible">Visible</MenuItem>
												<MenuItem value="Submitable">Submittable</MenuItem>
											</Select>
										</FormControl>
									</Toolbar>
								</Grid>
								{visibility !== "submittable" && (
									<>
										<Grid item lg={4}>
											<KeyboardDatePicker
												margin="normal"
												id="date-picker-dialog"
												label="Set Post Date"
												format="dd/MM/yyyy"
												value={postDate}
												onChange={handlePostDateTimeChange}
												KeyboardButtonProps={{
													"aria-label": "change date",
												}}
											/>
										</Grid>
										<Grid item lg={4}>
											<KeyboardTimePicker
												margin="normal"
												id="time-picker"
												label="Set Post Date Time"
												value={postDate}
												onChange={handlePostDateTimeChange}
												KeyboardButtonProps={{
													"aria-label": "change time",
												}}
											/>
										</Grid>
									</>
								)}
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item lg={3}>
							<Toolbar>
								<div className={classes.createButton}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleCreate}
									>
										Create
									</Button>
								</div>
							</Toolbar>
						</Grid>
					</Grid>
				</Grid>
			</form>
			{performRedirect()}
		</Base>
	);
}
