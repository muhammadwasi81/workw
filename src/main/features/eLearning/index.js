import React from "react";
import { Route, Routes } from "react-router-dom";
import DocumentComposers from "./composer";
import CreateCourse from "./view/courses/Creation";
import MainDashboard from "./view/Dashboard/MainDashboard";
import CourseContent from "./view/Dashboard/Sections/Courses/CourseDetail/CourseContent";
import CoursesDetail from "./view/Dashboard/Sections/Courses/CourseDetail/CoursesDetail";
import Summary from "./view/Dashboard/Summary";
import TeamDahsboard from "./view/Dashboard/TeamDahsboard";
import CreateEbook from "./view/ebook/Creation";

function ELearning() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainDashboard />} />
				<Route path="teamDashboard" element={<TeamDahsboard />} />
				<Route path="summary" element={<Summary />} />
				<Route path="courses/create" element={<CreateCourse />} />
				<Route path="ebook/create" element={<CreateEbook />} />
				<Route path="courses/:id" element={<CoursesDetail />} />
				<Route path="courses/learn/:id" element={<CourseContent />} />
				<Route path="*" element={<div>No page exist</div>} />
			</Routes>
			<DocumentComposers /> 
		</>
	);
}

export default ELearning;
