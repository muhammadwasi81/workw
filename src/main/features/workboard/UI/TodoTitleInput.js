import React, { useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { updateWorkBoardTodoTitle } from "../store/action";

let todoDefaultTitle = "";

function TodoTitleInput({ title, id, sectionId }) {
	todoDefaultTitle = title;
	const [todoTitle, setTodoTitle] = useState(title);
	const [showInput, setShowInput] = useState(false);
	const dispatch = useDispatch();
	const onEnter = e => {
		if (e.keyCode === 13) {
			if (todoTitle.trim().length > 0) {
				dispatch(
					updateWorkBoardTodoTitle({
						todoId: id,
						title: todoTitle,
						sectionId,
					})
				);
				todoDefaultTitle = todoTitle;
			} else {
				setTodoTitle(todoDefaultTitle);
			}
			setShowInput(false);
		}
	};
	return (
		<>
			{!showInput ? (
				<div
					className="font-bold text-base text-primary-color"
					onClick={() => {
						setShowInput(true);
					}}
				>
					{todoTitle}
				</div>
			) : (
				<div className="border border-[#0079bf] px-1 rounded-sm">
					<Input
						value={todoTitle}
						onChange={e => {
							setTodoTitle(e.target.value);
						}}
						autoFocus={true}
						onKeyDown={onEnter}
						className="!border-none !p-0 !font-bold !text-base !text-primary-color"
					/>
				</div>
			)}
		</>
	);
}

export default TodoTitleInput;
