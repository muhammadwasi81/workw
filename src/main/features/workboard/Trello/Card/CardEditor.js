import { Input } from "antd";
import React, { useState } from "react";
import EditButton from "../../UI/EditButton";

function CardEditor(props) {
	const [text, setText] = useState(props.text || "");

	const { onSave, onCancel, onDelete, adding } = props;
	const handleChangeText = event => {
		setText(event.target.value);
	};
	const onEnter = e => {
		if (e.keyCode === 13) {
			e.preventDefault();
			props.onSave(text);
		}
	};
	return (
		<div className="Edit-Card min-h-[50px] pl-[8px] pr-[15px]">
			<div className="Card">
				<Input
					autoFocus
					className="Edit-Card-Textarea w-full border-none outline-none text-base"
					placeholder="Enter the text for this card..."
					value={text}
					onChange={handleChangeText}
					onKeyDown={onEnter}
				/>
			</div>
			<EditButton
				handleSave={() => onSave(text)}
				saveLabel={adding ? "Add card" : "Save"}
				handleDelete={onDelete}
				handleCancel={onCancel}
			/>
		</div>
	);
}

export default CardEditor;
