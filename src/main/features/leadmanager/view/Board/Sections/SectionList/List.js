import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { getLeadManagerDetailById } from "../../../../store/actions";

function List(props) {
	const { sectionList, color, index, handleSectionDetailModal } = props;
	const dispatch = useDispatch();
	return (
		<Draggable draggableId={sectionList.id} index={index}>
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
						onClick={() => {
							handleSectionDetailModal();
							dispatch(getLeadManagerDetailById(sectionList.id));
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
