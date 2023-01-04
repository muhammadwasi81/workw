import React from "react";

function CourseAbout({content}) {
	return (
		<div>
			<h3 className="font-bold text-base">Description</h3>
			<p className="text-[#757D86]">
				{content}
			</p>
		</div>
	);
}

export default CourseAbout;
