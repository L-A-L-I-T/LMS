import React, { useState, useEffect } from "react";
import { getUser } from "../../../Auth/helper/index";
import { useParams, useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { ViewSubmissions } from "../../helper/Teacher";
import Course from "../Common/Course";
import NotFound from "../Common/NotFound";
import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
	noAssignments: {},
}));
const columns = [
	{ field: "prn", headerName: "PRN", width: 150, sortable: true },
	{
		field: "name",
		headerName: "Name",
		width: 200,
		editable: false,
	},
];
export default function TeacherViewSubmissions() {
	const classes = useStyles();
	const location = useLocation();
	const { user } = getUser();
	const [submissions, setSubmissions] = useState([]);
	const { assignment_id } = useParams();
	const [navigationDetails, setNaviagtionDetails] = useState({
		groupName: "",
		courseName: "",
	});

	const onLoad = async () => {
		await ViewSubmissions(assignment_id)
			.then((data) => {
				console.log("Setting Submissions", data);
				setSubmissions(data);
			})
			.catch(console.log("Settings Assignments Failed"));
	};
	const setNavigationDetails = () => {
		if (location.state) {
			setNaviagtionDetails({
				groupName: location.state.groupName,
				courseName: location.state.courseName,
			});
		}
		// } else {
		// 	getGroupDetails(group_id).then((data) => {
		// 		setNaviagtionDetails(data.group_name);
		// 	});
		// }
	};
	useEffect(() => {
		setNavigationDetails();
		onLoad();
		console.log("SUBMISSIONS : ", submissions);
	}, []);

	return (
		<Course>
			<h3>Submissions</h3>
			{submissions === undefined || submissions.length === 0 ? (
				<NotFound title="No Submissions Yet!" />
			) : (
				<div style={{ height: 400, width: "100%" }}>
					<DataGrid
						rows={submissions}
						columns={columns}
						getRowId={(row) => row.prn}
						pageSize={5}
						disableSelectionOnClick
					/>
				</div>
			)}
		</Course>
	);
}
