import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import DocumentComposers from "./composer";
import CreateArticle from "./view/Articles/Creation";
import CreateCourse from "./view/courses/Creation";
import MainDashboard from "./view/Dashboard/MainDashboard";
import ArticleDetail from "./view/Dashboard/Sections/Articles/Detail";
import CourseContent from "./view/Dashboard/Sections/Courses/CourseDetail/CourseContent";
import CoursesDetail from "./view/Dashboard/Sections/Courses/CourseDetail/CoursesDetail";
import EBookDetail from "./view/Dashboard/Sections/Ebooks/BookDetail/BookDetail";
import TedTalkDetail from "./view/Dashboard/Sections/TedTalks/Detail";
import VideoDetail from "./view/Dashboard/Sections/Videos/Detail";
import Summary from "./view/Dashboard/Summary";
import TeamDahsboard from "./view/Dashboard/TeamDahsboard";
import CreateEbook from "./view/ebook/Creation";
import CreateQuiz from "./view/quiz/Creation";
import QuizDetail from "./view/quiz/QuizDetails";
import CreateTedTalk from "./view/TedTalks/Creation";
import CreateVideo from "./view/Videos/Creation";

function ELearning() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainDashboard />} />
				<Route path={ROUTES.ELearning.TEAM_DASHBOARD} element={<TeamDahsboard />} />
				<Route path={ROUTES.ELearning.TEAM_SUMMARY} element={<Summary />} />
				<Route path="courses/create" element={<CreateCourse />} />
				<Route path="ebook/create" element={<CreateEbook />} />
				<Route path="tedtalk/create" element={<CreateTedTalk />} />
				<Route path="quiz/create" element={<CreateQuiz />} />
				<Route path="article/create" element={<CreateArticle />} />
				<Route path="video/create" element={<CreateVideo />} />
				<Route path="courses/:id" element={<CoursesDetail />} />
				<Route path="ebook/:id" element={<EBookDetail />} />
				<Route path="tedtalk/:id" element={<TedTalkDetail />} />
				<Route path="article/:id" element={<ArticleDetail />} />
				<Route path="video/:id" element={<VideoDetail />} />
				<Route path="quiz/:id" element={<QuizDetail />} />
				<Route path="courses/learn/:id" element={<CourseContent />} />
				<Route path="*" element={<div>No page exist</div>} />
			</Routes>
			<DocumentComposers />
		</>
	);
}

export default ELearning;
