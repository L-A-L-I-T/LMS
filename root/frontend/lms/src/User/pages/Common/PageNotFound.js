import React from "react";

import Base from "../../../Core/ui/Base";
import { Grid } from "@material-ui/core";
export default function PageNotFound() {
	return (
		<Base>
			<Grid
				container
				style={{ minHeight: "75vh" }}
				justifyContent="center"
				alignItems="center"
			>
				<Grid item lg={11} style={{textAlign: "center"}}>
					<h1>Error 404 Page not Found </h1>
				</Grid>
			</Grid>
		</Base>
	);
}
