import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import "./reward.css";
import Reward from "./Reward";

const Index = () => {
	return (
		<></>
		// <Routes>
		// 	<Route path={`${ROUTES.HR.REWARDS.DEFAULT}`} element={<Reward />} />
		// 	{/* <Route element={<BrokenPage />} /> */}
		// </Routes>
	);
};

export default Index;
