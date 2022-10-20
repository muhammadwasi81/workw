import React from "react";
import CourseBox from "../UI/CourseBox";

function Courses() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
			<CourseBox />
			<CourseBox />
			<CourseBox />
			<CourseBox />
			<CourseBox />
			<CourseBox />
		</div>
	);
}

export default Courses;
