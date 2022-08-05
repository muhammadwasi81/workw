import React, { useState } from "react";
import Card from "../../../UI/Card/Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CardHeader from "../../../UI/Card/CardHeader";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import CardButton from "../../../UI/Button/CardButton";
import SectionForm from "./SectionForm/SectionForm";
import List from "./SectionList/List";
import { jsonToFormData } from "../../../../../../utils/base";
import { useDispatch } from "react-redux";
import { addLeadManagerDetail } from "../../../store/actions";
import { v4 as id } from "uuid";
function Section(props) {
	const { section, index } = props;
	// const [sections, setSections] = useState([]);
	const [toggleForm, setToggleForm] = useState(false);
	const dispatch = useDispatch();
	const onFinish = values => {
		// console.log("values", values, section.id);
		let tempObj = {
			sectionId: section.id,
			image: {
				id: id(),
				file: null,
			},
			...values,
		};
		dispatch(addLeadManagerDetail(jsonToFormData(tempObj)));
		// console.log("jsonToFormData(tempObj)", jsonToFormData(tempObj));

		// setSections([...sections, values]);
	};

	const handleToggleForm = () => {
		setToggleForm(!toggleForm);
	};

	return (
		<Draggable draggableId={String(section.id)} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="h-fit"
				>
					<div>
						<Card
							style={{ background: section.colorCode }}
							className={`w-[330px] m-[10px] rounded`}
						>
							<CardHeader
								text={section.name}
								className={"text-white font-semibold"}
								// count={2}
								// icon={section.icon}
							/>
							<CardButton
								className={"text-gray-400"}
								icon={
									<PlusOutlined className="!text-gray-500" />
								}
								onClick={handleToggleForm}
							/>
							{toggleForm && (
								<SectionForm
									onFinish={onFinish}
									handleToggleForm={handleToggleForm}
								/>
							)}
							<Droppable droppableId={String(section.id)}>
								{(provided, _snapshot) => (
									<div ref={provided.innerRef}>
										{section.details.length > 0 && (
											<div className="bg-white p-2 rounded-sm flex flex-col gap-2">
												{section.details.map(
													(sectionList, index) => (
														<List
															sectionList={
																sectionList
															}
															color={
																section.colorCode
															}
															index={index}
															key={index}
														/>
													)
												)}
												{provided.placeholder}
											</div>
										)}
									</div>
								)}
							</Droppable>
						</Card>
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default Section;
