import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AlignLeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateWorkBoardTodoDesc } from "../store/action";

let defultDescription = "";
function DescriptionInput({ todoData }) {
	const { id = "" } = todoData;
	const [showDesc, setShowDesc] = useState(false);
	const [desc, setDesc] = useState("");

	useEffect(() => {
		if (todoData) {
			setDesc(todoData.description);
			defultDescription = todoData.description;
		}
	}, [todoData]);

	const inputRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (showDesc) {
			inputRef.current.focus({
				cursor: "end",
			});
		}
	}, [showDesc]);

	const handleDescription = type => {
		if (type === "update") {
			defultDescription = desc;
			dispatch(
				updateWorkBoardTodoDesc({ todoId: id, description: desc })
			);
		}

		if (type === "cancel") {
			setDesc(defultDescription);
		}

		setShowDesc(!showDesc);
	};

	return (
		<>
			<div className="flex gap-2">
				<AlignLeftOutlined className="!text-gray-500 text-lg" />

				<div className="flex flex-col gap-1">
					<div className="flex gap-2">
						<span className="text-black font-extrabold">
							Description
						</span>
						<div>
							{desc.length > 0 && !showDesc && (
								<div
									className="p-[3px] px-2 bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
									onClick={handleDescription}
								>
									Edit
								</div>
							)}
						</div>
					</div>
					<div className="">
						{desc.length > 0 && !showDesc && (
							<span
								onClick={handleDescription}
								className="cursor-pointer"
							>
								{desc}
							</span>
						)}
					</div>
				</div>
			</div>

			{!showDesc ? (
				desc.length === 0 && (
					<div
						className="bg-neutral-100 rounded-sm w-full p-2 h-20 cursor-pointer hover:bg-neutral-200 text-gray-500"
						onClick={handleDescription}
					>
						Add more detailed description...
					</div>
				)
			) : (
				<div className="flex flex-col gap-2">
					<div className="bg-neutral-100 rounded-sm w-full">
						<TextArea
							className="!outline-none !bg-transparent !p-2 !rounded-sm  placeholder:!text-gray-500 placeholder:!font-bold resize-none"
							placeholder="Add more detailed description..."
							rows={4}
							ref={inputRef}
							id={"description"}
							value={desc}
							onChange={e => {
								setDesc(e.target.value);
							}}
						/>
					</div>
					<div className="flex gap-2">
						<Button
							className="ThemeBtn"
							onClick={() => {
								handleDescription("update");
							}}
						>
							Save
						</Button>
						<Button
							type="text"
							className=""
							onClick={() => {
								handleDescription("cancel");
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

export default DescriptionInput;
