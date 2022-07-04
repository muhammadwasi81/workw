import React from "react";
import { CloseOutlined } from "@ant-design/icons";

function EditButton({ handleSave, saveLabel, handleDelete, handleCancel }) {
	return (
		<div className="Edit-Buttons flex py-2 gap-2 items-center">
			<div
				tabIndex="0"
				className="Edit-Button cursor-pointer w-fit rounded-sm outline-none p-1 px-2  hover:opacity-90 !bg-[#0079bf] hover:!bg-[#026aa7] !text-white !border-none "
				onClick={handleSave}
			>
				{saveLabel}
			</div>
			{handleDelete && (
				<div
					tabIndex="0"
					className="Edit-Button  cursor-pointer w-fit rounded-sm outline-none p-1 px-2 hover:bg-opacity-70 text-white bg-red-500"
					onClick={handleDelete}
				>
					Delete
				</div>
			)}
			<div
				tabIndex="0"
				className="Edit-Button-Cancel flex items-center cursor-pointer opacity-80 outline-none hover:opacity-100"
				onClick={handleCancel}
			>
				<CloseOutlined className="!text-gray-500 hover:!text-gray-600 text-base font-bold" />
			</div>
		</div>
	);
}

export default EditButton;
