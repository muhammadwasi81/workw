import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import "./loan.css";
import Loan from "./loan";

const Index = () => {
	return (
		<Switch>
			<Route
				exact
				path={`${STRINGS.ROUTES.LOAN.DEFAULT}`}
				component={Loan}
			/>
			<Route component={BrokenPage} />
		</Switch>
	);
};

export default Index;
