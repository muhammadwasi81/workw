import React from "react";
import { Route, Routes } from "react-router-dom";
import MainDashboard from "./view/Dashboard/MainDashboard";
import CourseContent from "./view/Dashboard/Sections/Courses/CourseDetail/CourseContent";
import CoursesDetail from "./view/Dashboard/Sections/Courses/CourseDetail/CoursesDetail";
import Summary from "./view/Dashboard/Summary";
import TeamDahsboard from "./view/Dashboard/TeamDahsboard";

function ELearning() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainDashboard />} />
				<Route path="teamDashboard" element={<TeamDahsboard />} />
				<Route path="summary" element={<Summary />} />
				<Route path="courses/:id" element={<CoursesDetail />} />
				<Route path="courses/learn/:id" element={<CourseContent />} />
				<Route path="*" element={<div>No page exist</div>} />
			</Routes>
		</>
	);
}

export default ELearning;
