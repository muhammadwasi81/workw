import React from "react";
import WorkBoardCover from "../../../../content/png/workboard_cover_image.jpeg";
import { ImFolderUpload } from "react-icons/im";
import { CloseOutlined } from "@ant-design/icons";

function WBDCoverImage() {
	return (
		<div className="relative ">
			<CloseOutlined className="!text-primary-color !font-bold bg-neutral-100 rounded-full p-[5px] text-right mr-auto max-w-fit absolute top-5 right-5 cursor-pointer text-xl" />
			<img
				src={WorkBoardCover}
				alt=""
				className="rounded-xl h-[300px] w-full object-cover"
			/>
			<div className="!text-primary-color font-bold bg-neutral-100 rounded-lg p-[5px] text-right mr-auto max-w-fit absolute bottom-3 right-5 cursor-pointer text-base flex gap-3 items-center px-3">
				<ImFolderUpload className="!text-primary-color !font-bold  cursor-pointer text-3xl" />
				<span>Upload Cover Photo</span>
			</div>
		</div>
	);
}

export default WBDCoverImage;
