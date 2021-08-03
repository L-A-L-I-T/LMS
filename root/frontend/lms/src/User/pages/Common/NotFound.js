import React from "react";

import Base from "../../../Core/ui/Base";
import { Grid } from "@material-ui/core";
export default function NotFound(props) {
	return (
		<Base>
			<Grid
				container
				style={{ minHeight: "35vh" }}
				justifyContent="center"
				alignItems="center"
			>
				<Grid item lg={8} style={{ textAlign: "center" }}>
					<h1>{props.title}</h1>
				</Grid>
			</Grid>
		</Base>
	);
}
