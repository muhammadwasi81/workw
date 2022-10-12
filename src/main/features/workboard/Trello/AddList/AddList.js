import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { addList } from "../../store/slice";
import { v4 as id } from "uuid";
import ListEditor from "./ListEditor";
import { addWorkBoardSection } from "../../store/action";

function AddList({ toggleAddingList, sectionId, labels = {} }) {
	const [title, setTitle] = useState("");
	const dispatch = useDispatch();

	const handleChangeTitle = e => {
		setTitle(e.target.value);
	};

	const createList = async () => {
		toggleAddingList();
		if (title.trim().length !== 0) {
			dispatch(addList({ id: id(), title, color: "" }));
			dispatch(
				addWorkBoardSection({ workBoardId: sectionId, name: title })
			);
		}
	};

	return (
		<div className="bg-[#ebecf0] h-fit p-1 rounded-sm !w-[264px] mx-2 ">
			<ListEditor
				title={title}
				handleChangeTitle={handleChangeTitle}
				onClickOutside={toggleAddingList}
				saveList={createList}
				labels={labels}
			/>
			<div className="flex items-center p-1 gap-4">
				<Button
					className="!bg-[#0079bf] hover:!bg-[#026aa7] !text-white !border-none !rounded-sm "
					onClick={createList}
				>
					{labels.addTodo}
				</Button>
				<CloseOutlined
					onClick={toggleAddingList}
					className="!text-gray-500 hover:!text-gray-600 text-base font-bold"
				/>
			</div>
		</div>
	);
}

export default AddList;
