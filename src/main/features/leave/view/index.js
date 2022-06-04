import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import "./leave.css";
import Reward from "./Leave";

const Index = () => {
	return (
		<Switch>
			<Route
				exact
				path={`${STRINGS.ROUTES.LEAVE.DEFAULT}`}
				component={Reward}
			/>
			<Route component={BrokenPage} />
		</Switch>
	);
};

export default Index;
