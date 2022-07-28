import React from "react";
import { Draggable } from "react-beautiful-dnd";

function List(props) {
	const { sectionList, color, index } = props;

	return (
		<Draggable draggableId={sectionList.name} index={index}>
			{(provided, _snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div
						className={` rounded-[5px] !border p-5 cursor-pointer bg-white my-2`}
						style={{
							border: `${color} solid`,
							boxShadow: ` 0 0 20px -8px ${color}`,
						}}
					>
						{sectionList.name}
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default List;
