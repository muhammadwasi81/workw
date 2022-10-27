import React from "react";
import { ContBody, TabbableContainer } from "../../../../../layout/GridStyle";
import Header from "../../Header/Header";

function DashboardLayout(props) {
	return (
		<TabbableContainer>
			<Header />
			<ContBody className="!block">{props.children}</ContBody>
		</TabbableContainer>
	);
}

export default DashboardLayout;
