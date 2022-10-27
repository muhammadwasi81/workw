import React from "react";
import { ContBody, TabbableContainer } from "../../../../../layout/GridStyle";
import DetailHeader from "../../Detail/DetailHeader";

function DetailLayout(props) {
	return (
		<TabbableContainer>
			<DetailHeader props={props} />
			<ContBody className="!block">{props.children}</ContBody>
		</TabbableContainer>
	);
}

export default DetailLayout;
