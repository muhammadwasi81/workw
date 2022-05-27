import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import "./warning.css";
import Reward from "./Reward";

const Index = () => {
	return (
		<Switch>
			<Route
				exact
				path={`${STRINGS.ROUTES.REWARDS.DEFAULT}`}
				component={Reward}
			/>
			<Route component={BrokenPage} />
		</Switch>
	);
};

export default Index;
