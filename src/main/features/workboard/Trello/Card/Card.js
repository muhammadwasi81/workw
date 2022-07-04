import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { changeListCardText, deleteListCard } from "../../store/slice";
import CardEditor from "./CardEditor";
import "./card.css";
import { EditOutlined } from "@ant-design/icons";

function Card(props) {
	const [hover, setHover] = useState(false);
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState("");
	const { listId, cardId, index } = props;
	const cardData = useSelector(state => state.trelloSlice[cardId]);
	// console.log("card data", cardData);
	const dispatch = useDispatch();

	const startHover = () => {
		setHover(true);
	};
	const endHover = () => {
		setHover(false);
	};

	const startEditing = () => {
		setHover(false);
		setEditing(true);
		setText(props.card.text);
	};

	const endEditing = () => {
		setHover(false);
		setEditing(false);
	};

	const editCard = async text => {
		endEditing();
		dispatch(changeListCardText({ cardId: cardData._id, cardText: text }));
	};

	const deleteCard = async () => {
		if (window.confirm("Are you sure to delete this card?")) {
			dispatch(deleteListCard({ cardId: cardData._id, listId }));
		}
	};
	if (!editing) {
		return (
			<Draggable draggableId={cardData._id} index={index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="Card flex items-center relative cusrosr-pointer bg-white m-[5px] p-[5px] rounded-sm border border-[rgba(0, 0, 0, 0.12)] shadow-sm text-sm break-words m-h[18px]"
						onMouseEnter={startHover}
						onMouseLeave={endHover}
					>
						{hover && (
							<div className="Card-Icons absolute  right-[5px] flex flex-row justify-end">
								<div
									className="Card-Icon flex items-center cursor-pointer w-[24px] h-[24px] justify-center rounded-sm m-[1px] hover:bg-neutral-200 opacity-90 "
									onClick={startEditing}
								>
									<EditOutlined />
								</div>
							</div>
						)}

						{cardData.text}
					</div>
				)}
			</Draggable>
		);
	}

	return (
		<CardEditor
			text={cardData.text}
			onSave={editCard}
			onDelete={deleteCard}
			onCancel={endEditing}
		/>
	);
}

export default Card;
