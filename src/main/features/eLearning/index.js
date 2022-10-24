import React from "react";
import { Route, Routes } from "react-router-dom";
import MainDashboard from "./view/Dashboard/MainDashboard";
import Summary from "./view/Dashboard/Summary";
import TeamDahsboard from "./view/Dashboard/TeamDahsboard";
import CoursesDetail from "./view/Detail/CourseDetail/CoursesDetail";

function ELearning() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainDashboard />} />
				<Route path="teamDashboard" element={<TeamDahsboard />} />
				<Route path="summary" element={<Summary />} />
				<Route path="courses/:id" element={<CoursesDetail />} />
				<Route path="*" element={<div>No page exist</div>} />
			</Routes>
		</>
	);
}

export default ELearning;
