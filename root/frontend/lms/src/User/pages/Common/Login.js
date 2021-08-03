import React, { useState } from "react";
import { signin, authenticate, isAutheticated } from "../../../Auth/helper/index";
import { Redirect } from "react-router-dom";
import {
	Paper,
	Typography,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Button,
	LinearProgress,
	Snackbar,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit">ProjectCCP</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(7),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: " 80px 60px",
		borderRadius: "10px",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	forgot: {
		margin: theme.spacing(3, 0, 2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	Logo: {
		margin: theme.spacing(5),
	},
	formContainer: {
		marginTop: theme.spacing(3),
	},
}));

export default function Login() {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false,
	});
	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAutheticated();
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			onSubmit();
		}
	};
	const [snackOpen, setSnackOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackOpen(false);
	};
	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const performRedirect = () => {
		if (didRedirect) {
			console.log(user);
			if (user && user.role === 1) {
				return <Redirect to="/teacher/dashboard" />;
			} else if (user && user.role === 0) {
				return <Redirect to="/student/dashboard" />;
			}
		}
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.detail) {
					setValues({ ...values, error: data.detail, loading: false });
					setSnackOpen(true);
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch((error) => <div>Error</div>);
	};
	const loadingMessage = () => {
		return (
			loading && (
				<Grid container justify="center" alignItems="center">
					<Grid Item lg={12}>
						<LinearProgress />
					</Grid>
				</Grid>
			)
		);
	};
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}
	const errorMessage = () => {
		return (
			error && (
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "bottom" }}
					open={snackOpen}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="error">
						{error}
					</Alert>
				</Snackbar>
			)
		);
	};
	return (
		<React.Fragment>
			{errorMessage()}
			{loadingMessage()}

			<div className={classes.Logo}>
				<Typography component="h1" variant="h4">
					MITAOE
				</Typography>
			</div>
			<Grid container justify="center" alignItems="center">
				<Grid item lg={4} md={6} sm={8} xs={10}>
					<Paper className={classes.paper} elevation={3}>
						<Typography component="h1" variant="h5">
							Login Here
						</Typography>
						<form className={classes.formContainer}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={handleChange("email")}
								autoFocus
								onKeyPress={handleKeyPress}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={handleChange("password")}
								autoComplete="current-password"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												edge="end"
											>
												{showPassword ? (
													<VisibilityIcon />
												) : (
													<VisibilityOffIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>

							<Grid container direction="row">
								<Grid item lg={6} sm={6} md={6} xs={6}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										onClick={onSubmit}
									>
										Log In
									</Button>
								</Grid>
								<Grid
									item
									lg={6}
									sm={6}
									md={6}
									xs={6}
									className={classes.forgot}
								>
									<Link variant="body2">Forgot password?</Link>
								</Grid>
							</Grid>
						</form>
					</Paper>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Grid>
			</Grid>
			{/* <p>{JSON.stringify(values)}</p> */}
			{performRedirect()}
		</React.Fragment>
	);
}
