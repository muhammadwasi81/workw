import React from "react";
import CourseCard from "../../Components/CourseCard";

function Courses() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
			<CourseCard />
			<CourseCard />
			<CourseCard />
			<CourseCard />
			<CourseCard />
			<CourseCard />
		</div>
	);
}

export default Courses;
