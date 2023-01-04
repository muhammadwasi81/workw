import React from "react";
import { Route, Routes } from "react-router-dom";
import DocumentComposers from "./composer";
import CreateCourse from "./view/courses/Creation";
// import CreateCourse from "./view/courses/Creation";
import MainDashboard from "./view/Dashboard/MainDashboard";
import CourseContent from "./view/Dashboard/Sections/Courses/CourseDetail/CourseContent";
import CoursesDetail from "./view/Dashboard/Sections/Courses/CourseDetail/CoursesDetail";
import EBookDetail from "./view/Dashboard/Sections/Ebooks/BookDetail/BookDetail";
import Summary from "./view/Dashboard/Summary";
import TeamDahsboard from "./view/Dashboard/TeamDahsboard";
import CreateEbook from "./view/ebook/Creation";
import CreateQuiz from "./view/quiz/Creation";
import QuizDetail from "./view/quiz/QuizDetails";

function ELearning() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainDashboard />} />
				<Route path="teamDashboard" element={<TeamDahsboard />} />
				<Route path="summary" element={<Summary />} />
				<Route path="courses/create" element={<CreateCourse />} />
				<Route path="ebook/create" element={<CreateEbook />} />
				<Route path="quiz/create" element={<CreateQuiz />} />
				<Route path="courses/:id" element={<CoursesDetail />} />
				<Route path="ebook/:id" element={<EBookDetail />} />
        <Route path="quiz/:id" element={<QuizDetail />} />
				<Route path="courses/learn/:id" element={<CourseContent />} />
				<Route path="*" element={<div>No page exist</div>} />
			</Routes>
			<DocumentComposers /> 
		</>
	);
}

export default ELearning;
