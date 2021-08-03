import { API } from "../../backend";
import { Redirect } from "react-router-dom";
export const signin = (user) => {
	return fetch(`${API}/user/login/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// export const signout = (next) => {
// 	if (typeof window !== "undefined") {
// 		localStorage.removeItem("jwt");
// 		next();
// 		return fetch(`${API}/signout`, {
// 			method: "GET",
// 		})
// 			.then((response) => console.log("singout success"))
// 			.catch((err) => console.log(err));
// 	}
// };

// Trial SignOut Function
export const signout = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
	}
};
export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify({ user: data }));
		next();
	}
};

export const isAutheticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

export const getUser = () => {
	return JSON.parse(localStorage.getItem("jwt"));
};

export const getUserRole = () => {
	if (JSON.parse(localStorage.getItem("jwt")).user.role === 0) {
		return "student";
	} else if (JSON.parse(localStorage.getItem("jwt")).user.role === 1) {
		return "teacher";
	}
};

export const getNewAccessToken = (refreshToken) => {
	return fetch(`${API}/refreshtoken/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refresh: refreshToken }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const refreshAccess = async () => {
	const { user } = getUser();
	const newUser = await getUser();

	const refreshToken = user.refresh;

	const newAccessToken = await getNewAccessToken(refreshToken).then(
		(response) => {
			return response;
		}
	);

	newUser.user.access = newAccessToken.access;
	console.log("UPDATED USER : ", newUser);
	localStorage.setItem("jwt", JSON.stringify(newUser));
};
