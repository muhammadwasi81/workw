import React from "react";
import { Collapse } from 'antd';
import CurriculumCollapseCard from "../../../../Detail/components/UIElements/CurrCollCard";
import DetailCollapse from "../../../../Detail/components/UIElements/DetailCollapse";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function CourseCurriculum({curriculums}) {
	let data = curriculums;

	const onChange = (key) => {
		// console.log(key);
	};
	return (
		<div className="CurriculumAccordion">
			<Collapse onChange={onChange}>
			{ data?.map((item, index) => {
				return <>
						<Panel header={item.name} key={index} className="CurriculumPanel">
							<Collapse defaultActiveKey="1">
								{item.topics && item.topics.map((topic, index) => {
									return <Panel className="CurriculumPanel" header={topic.name} key={index}>
											<p>{"Dummy Content"}</p>
										</Panel>
								})}
							</Collapse>
						</Panel>
						</>  
			})}
		</Collapse>
	</div>
	);
}

export default CourseCurriculum;
