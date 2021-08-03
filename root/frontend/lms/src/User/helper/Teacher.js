import { API } from "../../backend";
import { format } from "date-fns";
import { refreshAccess, getUser } from "../../Auth/helper/index";
export const TeacherClassroomInfo = () => {
	const data = {
		teacher_id: JSON.parse(localStorage.getItem("jwt")).user.user_id,
	};
	console.log(data);
	return fetch(`${API}/teacher/classroom/courses`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("jwt")).user.access
			}`,
		},
		body: JSON.stringify(data),
	})
		.then(async (res) => {
			if (res.status === 401) {
				await refreshAccess();
				console.log(res.status);
				window.location.reload(true);
			} else {
				return res.json();
			}
		})
		.catch((err) => console.log(err));
};
export const TeacherCourseAssignments = (group_course_id) => {
	return fetch(
		`${API}/classroom/group_course/${group_course_id}/assignments/`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("jwt")).user.access
				}`,
			},
		}
	)
		.then(async (res) => {
			if (res.status === 401) {
				await refreshAccess();
				console.log(res.status);
				window.location.reload(true);
			} else {
				return res.json();
			}
		})
		.catch((err) => console.log(err));
};

export const getGroupCourseDetails = (group_course_id) => {
	return fetch(`${API}/group_course_details/${group_course_id}/`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("jwt")).user.access
			}`,
		},
	})
		.then(async (res) => {
			if (res.status === 401) {
				await refreshAccess();
				console.log(res.status);
				window.location.reload(true);
			} else {
				console.log(res);
				return res.json();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const CreateAssignment = (group_course_id, user) => {
	let formData = new FormData();
	console.log("USER :", user);
	formData.append("f1", user.files);
	formData.append("title", user.title);
	formData.append("description", user.description);
	formData.append("visibility", user.visibility);
	formData.append("min_marks", user.minMarks);
	formData.append("max_marks", user.maxMarks);
	formData.append("post_date", format(user.postDate, "yyyy-LL-dd HH:mm:ss"));
	formData.append("due_date", format(user.dueDate, "yyyy-LL-dd HH:mm:ss"));
	formData.append("grp_course_id", group_course_id);
	console.log("FORMDATA :", formData);
	return fetch(`${API}/classroom/group/course/create_assignment/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("jwt")).user.access
			}`,
		},
		body: formData,
	})
		.then(async (res) => {
			if (res.status === 401) {
				await refreshAccess();
				console.log(res.status);
				window.location.reload(true);
			} else {
				return res.json();
			}
		})
		.catch((err) => console.log(err));
};

export const TeacherCourseRescources = (group_course_id) => {
	return fetch(
		`${API}/teacher/classroom/group_course/${group_course_id}/units`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("jwt")).user.access
				}`,
			},
		}
	)
		.then(async (res) => {
			if (res.status === 401) {
				await refreshAccess();
				console.log(res.status);
				window.location.reload(true);
			} else {
				return res.json();
			}
		})
		.catch((err) => console.log(err));
};

export const ViewSubmissions = (assignment_id) => {
	return fetch(
		`${API}/assignment/${assignment_id}/assignment_submitted_students`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("jwt")).user.access
				}`,
			},
		}
	)
		.then(async (res) => {
			if (res.status === 401) {
				await refreshAccess();
				window.location.reload(true);
			} else {
				return res.json();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
