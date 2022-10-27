import React from "react";
import CurriculumCollapseCard from "../../../../Detail/components/UIElements/CurrCollCard";
import DetailCollapse from "../../../../Detail/components/UIElements/DetailCollapse";

function CourseCurriculum() {
	const DUMMY_DATA = [
		{
			name: "Start the Program",
			details: [
				{
					title:
						"Introducing to course: Foundation of User Experience Design.",
					type: 1,
					duration: 20,
				},
				{
					title: "Specialists, generalists, and T-shaped designers.",
					type: 2,
					duration: 20,
				},
				{
					title: "Identify good user experience",
					type: 3,
					duration: 20,
				},
			],
		},
		{
			name: "Start the Program 123",
			details: [
				{
					title:
						"Introducing to course: Foundation of User Experience Design.",
					type: 1,
					duration: 20,
				},
				{
					title: "Specialists, generalists, and T-shaped designers.",
					type: 2,
					duration: 20,
				},
				{
					title: "Identify good user experience",
					type: 3,
					duration: 20,
				},
			],
		},
		{
			name: "Start the Program 23432",
			details: [
				{
					title:
						"Introducing to course: Foundation of User Experience Design.",
					type: 1,
					duration: 20,
				},
				{
					title: "Specialists, generalists, and T-shaped designers.",
					type: 2,
					duration: 20,
				},
				{
					title: "Identify good user experience",
					type: 3,
					duration: 20,
				},
			],
		},
	];
	return (
		<div>
			<DetailCollapse
				data={DUMMY_DATA}
				Component={CurriculumCollapseCard}
			/>
		</div>
	);
}

export default CourseCurriculum;
