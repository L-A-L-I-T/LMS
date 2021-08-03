import { API } from "../../backend";
import { refreshAccess } from "../../Auth/helper/index";

export const AssignmentInfo = (assignment_id) => {
	return fetch(`${API}/assignment/${assignment_id}/`, {
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
				return res.json();
			}
		})
		.catch((err) => console.log(err));
};
