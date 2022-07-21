import React from "react";
import {
	AlignLeftOutlined,
	EyeOutlined,
	PaperClipOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { HiOutlineClipboardList } from "react-icons/hi";
// import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import DescriptionInput from "../UI/DescriptionInput";
import CommentComposer from "../../../sharedComponents/Comment/Composer";
import CheckDate from "../UI/CheckDate";
import TodoTitleInput from "../UI/TodoTitleInput";

function WorkBoardDescription({ dueDate, cardId, todoData }) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<HiOutlineClipboardList className="text-xl text-gray-500" />
				<div className="flex flex-col gap-1 w-full">
					<TodoTitleInput
						title={todoData && todoData.title}
						id={todoData && todoData.id}
						sectionId={todoData && todoData.sectionId}
					/>

					<span className="text-gray-500 flex items-center gap-2">
						in section{" "}
						<span className="underline cursor-pointer hover:text-gray-600">
							{todoData && todoData.workBoardSection}
						</span>
						<EyeOutlined className="" />
					</span>
				</div>
			</div>
			{dueDate && dueDate.length > 0 && (
				<div className="flex flex-col ">
					<span className="text-gray-500 font-semibold">
						Due date
					</span>
					<CheckDate todoData={todoData} />
				</div>
			)}
			{/* <div className="flex gap-2 w-full">
				<AlignLeftOutlined className="!text-gray-500 text-lg" />
				<div className="flex flex-col gap-2 w-full"></div>
			</div> */}
			<DescriptionInput todoData={todoData} />

			<div className="flex gap-2 w-full">
				<PaperClipOutlined className="!text-gray-500 text-lg" />
				<div className="flex flex-col gap-2 w-full">
					<span className="text-black font-extrabold ">
						Attachments
					</span>
					{/* <div className="bg-neutral-100 rounded-xl w-full "></div> */}
					{/* <SingleUpload position="left" multiple={true} /> */}
				</div>
			</div>
			<div className="flex gap-5 flex-col w-full">
				<div className="flex gap-2 items-center">
					<UnorderedListOutlined className="!text-gray-500 text-lg" />
					<span className="text-black font-extrabold ">Activity</span>
				</div>
				<CommentComposer isAttachment={false} />
			</div>
		</div>
	);
}

export default WorkBoardDescription;
