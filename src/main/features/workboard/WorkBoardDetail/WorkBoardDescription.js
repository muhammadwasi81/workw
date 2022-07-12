import React from "react";
import {
	AlignLeftOutlined,
	PaperClipOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { HiOutlineClipboardList } from "react-icons/hi";
// import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import DescriptionInput from "../UI/DescriptionInput";
import CommentComposer from "../../../sharedComponents/Comment/Composer";
import CheckDate from "../UI/CheckDate";

function WorkBoardDescription() {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center gap-2">
				<HiOutlineClipboardList className="text-xl text-gray-500" />
				<span className="font-bold text-base text-primary-color">
					Going live with server deployment
				</span>
			</div>
			<div className="flex flex-col ">
				<span className="text-gray-500 font-semibold">Due date</span>
				<CheckDate />
			</div>
			<div className="flex gap-2 w-full">
				<AlignLeftOutlined className="!text-gray-500 text-lg" />
				<div className="flex flex-col gap-2 w-full">
					<span className="text-black font-extrabold ">
						Description
					</span>
					<DescriptionInput />
				</div>
			</div>

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
